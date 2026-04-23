// Language detection and response formatting utilities

// Detect language from text
const detectLanguage = (text) => {
  if (!text || typeof text !== 'string') return 'en';

  const trimmedText = text.trim();

  // Urdu detection (Arabic script with Urdu-specific characters)
  const urduRegex = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

  // Hindi detection (Devanagari script)
  const hindiRegex = /[ऀ-ॿ]/;

  // Common Urdu/Hindi words in Roman script (chatting style)
  const romanUrduHindiWords = [
    'hai', 'ho', 'hain', 'hun', 'main', 'tum', 'aap', 'ka', 'ki', 'ke',
    'ne', 'ko', 'se', 'par', 'mein', 'kyun', 'kya', 'kahan', 'kaise',
    'kitna', 'kab', 'acha', 'theek', 'sahi', 'galti', 'shukriya', 'meherbani',
    'ji', 'han', 'nahi', 'na', 'haan', 'zaroor', 'bilkul', 'shayad', 'maybe',
    'plz', 'please', 'thx', 'thanks', 'ok', 'okay', 'accha', 'wah', 'wow',
    'bro', 'bhai', 'dost', 'yaar', 'janab', 'sahab', 'madam', 'sir'
  ];

  const words = trimmedText.toLowerCase().split(/\s+/);
  const romanWordCount = words.filter(word => romanUrduHindiWords.includes(word)).length;

  // If text contains Urdu script
  if (urduRegex.test(trimmedText)) {
    return 'ur';
  }

  // If text contains significant Roman Urdu/Hindi words
  if (romanWordCount >= 2 && romanWordCount / words.length > 0.3) {
    return 'ur';
  }

  // Default to English
  return 'en';
};

// Language-specific response templates
const languageTemplates = {
  en: {
    unrelatedQuery: "I am specifically designed to assist with information about Rehan's portfolio and professional background. I cannot answer general queries, but I would love to tell you about Rehan's latest AI projects!",
    permissionPrompt: "Rehan has [details] related to your query. Should I tell you more about these?",
    quotaExhausted: "I'm sorry, but our AI's daily conversation quota has been reached. Please come back tomorrow or contact Rehan directly via the links below.",
    connectionError: "⚠️ Ollama is not connected locally.",
    generalError: "⚠️ An unexpected error occurred."
  },
  ur: {
    unrelatedQuery: "میں صرف ریحان جمیل وٹو (Rehan Jamil Wattoo) کے پورٹ فولیو اور پیشہ ورانہ پس منظر کے بارے میں معلومات فراہم کرنے کے لیے بنایا گیا ہوں۔ میں عام سوالات کے جواب نہیں دے سکتا، لیکن میں آپ کو ریحان کے جدید ترین AI پراجیکٹس کے بارے میں ضرور بتا سکتا ہوں!",
    permissionPrompt: "ریحان جمیل کے پاس آپ کے سوال سے متعلق [details] موجود ہیں۔ کیا میں آپ کو ان کے بارے میں مزید بتاؤں؟",
    quotaExhausted: "معذرت، ہمارے AI کی روزانہ گفتگو کی حد پوری ہو گئی ہے۔ براہ کرم کل دوبارہ آئیں یا نیچے دیے گئے لنکس کے ذریعے براہ راست ریحان جمیل سے رابطہ کریں۔",
    connectionError: "⚠️ مقامی طور پر Ollama کنیکٹ نہیں ہے۔",
    generalError: "⚠️ ایک غیر متوقع خرابی پیش آگئی ہے۔"
  }
};

// Get appropriate response based on detected language (Always English now)
const getLocalizedResponse = (responseType, detectedLanguage) => {
  return languageTemplates.en[responseType];
};

// Check if response should be in specific language (Always return 'en')
const shouldRespondInLanguage = (conversationHistory, currentLanguage) => {
  return 'en';
};

// Self-test function
const runLanguageTests = () => {
  console.log('Running Language Detection Tests...');

  const tests = [
    { input: 'Hello world', expected: 'en', description: 'English text' },
    { input: 'ہیلو دنیا', expected: 'ur', description: 'Urdu script' },
    { input: 'नमस्ते दुनिया', expected: 'hi', description: 'Hindi script' },
    { input: 'aap kaise hain', expected: 'ur', description: 'Roman Urdu' },
    { input: 'main theek hun', expected: 'ur', description: 'Common Urdu phrases' },
    { input: 'kya haal hai', expected: 'ur', description: 'Roman Urdu greeting' }
  ];

  tests.forEach(test => {
    const result = detectLanguage(test.input);
    const status = result === test.expected ? '✓ PASS' : '✗ FAIL';
    console.log(`${status}: ${test.description} - Expected: ${test.expected}, Got: ${result}`);
  });

  console.log('Tests completed!');
};

export {
  detectLanguage,
  getLocalizedResponse,
  shouldRespondInLanguage,
  languageTemplates,
  runLanguageTests
};