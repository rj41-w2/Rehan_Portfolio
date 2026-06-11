// Chat utility functions for managing conversation context and persistence

export const loadChatHistory = (defaultMessage = "") => {
  try {
    const savedChat = localStorage.getItem('portfolio_chat_history');
    if (savedChat) {
      const parsed = JSON.parse(savedChat);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load chat history:', e);
  }
  return defaultMessage ? [{ role: 'assistant', text: defaultMessage }] : [];
};

export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save chat history:', e);
  }
};

export const clearChatHistory = (defaultMessage = "") => {
  localStorage.removeItem('portfolio_chat_history');
  return defaultMessage ? [{ role: 'assistant', text: defaultMessage }] : [];
};

export const manageContextWindow = (messages, maxMessages = 20) => {
  if (messages.length <= maxMessages) return messages;
  const firstMessage = messages[0];
  const recentMessages = messages.slice(-(maxMessages - 1));
  return [firstMessage, ...recentMessages];
};

export const shouldCacheResponse = (response) => {
  const noCachePatterns = [
    'QUOTA_EXHAUSTED', 'RATE_LIMIT_EXCEEDED',
    'API_ERROR', 'NETWORK_ERROR', 'CONNECTION_ERROR',
    'API_KEY_MISSING', 'Error:', '⚠️'
  ];
  return !noCachePatterns.some(pattern => response.includes(pattern));
};

// --- Question Normalization & Caching ---

const TYPO_MAP = {
  'informatoin': 'information', 'infomation': 'information',
  'adress': 'address', 'adres': 'address',
  'contat': 'contact', 'conatct': 'contact', 'contect': 'contact',
  'rehan\'s': 'rehan', 'rehans': 'rehan',
  'linkd': 'linkedin', 'linkel': 'linkedin', 'linkdin': 'linkedin',
  'profiel': 'profile', 'profil': 'profile',
  'abt': 'about', 'abou': 'about',
  'skil': 'skills', 'skillls': 'skills',
  'projct': 'projects', 'projet': 'projects', 'proejct': 'projects',
  'massage': 'message', 'messege': 'message',
  'plz': 'please', 'pls': 'please',
  'thx': 'thanks', 'thanx': 'thanks',
  'ur': 'your', 'u': 'you',
  'dont': 'do not', 'wont': 'will not', 'cant': 'can not',
  'gimme': 'give me', 'gve': 'give',
  'sent': 'send', 'snd': 'send',
  'telephone': 'phone', 'cel': 'cell',
};

const STOP_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been',
  'i','me','my','we','our','you','your','yours',
  'he','she','it','they','them','their',
  'this','that','these','those',
  'in','on','at','to','for','of','with','by','from','about',
  'and','or','but','if','because','so',
  'please','can','could','would','should','will','may','might',
  'do','does','did','has','have','had',
  'get','give','send','show','tell','want','like',
  'some','any','all','just','really','very',
  'up','down','out','off','over','under','again','further',
  'then','once','here','there',
  'not','no','nor',
  'ok','okay','hi','hello','hey','thanks','thank',
]);

export function normalizeQuestion(question) {
  let q = question.toLowerCase().trim();
  for (const [typo, fix] of Object.entries(TYPO_MAP)) {
    q = q.replace(new RegExp('\\b' + typo + '\\b', 'gi'), fix);
  }
  q = q.replace(/[^\w\s]/g, ' ');
  const cleaned = q.split(/\s+/).filter(w => w.length > 1).sort().join(' ');
  const meaningful = cleaned.split(/\s+/).filter(w => !STOP_WORDS.has(w)).sort().join(' ');
  return meaningful || cleaned;
}

const CACHE_KEY = 'portfolio_qa_cache';

function getQuestionCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveQuestionCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    localStorage.removeItem(CACHE_KEY);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {}
  }
}

function rawKey(question) {
  return question.toLowerCase().trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getCachedResponse(question) {
  const cache = getQuestionCache();
  const key = normalizeQuestion(question);
  const raw = rawKey(question);
  return cache[key] || (raw !== key ? cache[raw] : null) || null;
}

export function setCachedResponse(question, response) {
  if (!shouldCacheResponse(response)) return;
  const key = normalizeQuestion(question);
  if (!key) return;
  const cache = getQuestionCache();
  cache[key] = response;
  const entries = Object.keys(cache).length;
  if (entries > 200) {
    const keys = Object.keys(cache).slice(0, entries - 150);
    for (const k of keys) delete cache[k];
  }
  saveQuestionCache(cache);
}

export function clearResponseCache() {
  localStorage.removeItem(CACHE_KEY);
}