// Test file for language detection utilities
import { detectLanguage, getLocalizedResponse, shouldRespondInLanguage } from './languageUtils';

console.log('Testing Language Detection Utilities...');

// Test 1: English detection
console.log('English Detection:');
console.log('  "Hello world" ->', detectLanguage('Hello world'));
console.log('  "What are your skills?" ->', detectLanguage('What are your skills?'));

// Test 2: Urdu script detection
console.log('\nUrdu Script Detection:');
console.log('  "ہیلو دنیا" ->', detectLanguage('ہیلو دنیا'));
console.log('  "آپ کیسے ہیں؟" ->', detectLanguage('آپ کیسے ہیں؟'));

// Test 3: Hindi script detection
console.log('\nHindi Script Detection:');
console.log('  "नमस्ते दुनिया" ->', detectLanguage('नमस्ते दुनिया'));
console.log('  "आप कैसे हैं?" ->', detectLanguage('आप कैसे हैं?'));

// Test 4: Roman Urdu/Hindi detection
console.log('\nRoman Urdu/Hindi Detection:');
console.log('  "aap kaise hain" ->', detectLanguage('aap kaise hain'));
console.log('  "main theek hun shukriya" ->', detectLanguage('main theek hun shukriya'));
console.log('  "kya aap mujhe bata sakte hain" ->', detectLanguage('kya aap mujhe bata sakte hain'));

// Test 5: Mixed language detection
console.log('\nMixed Language Detection:');
console.log('  "Hello kaise ho" ->', detectLanguage('Hello kaise ho'));
console.log('  "Hi آپ کیسے ہیں" ->', detectLanguage('Hi آپ کیسے ہیں'));

// Test 6: Localized responses
console.log('\nLocalized Responses:');
console.log('  English unrelated ->', getLocalizedResponse('unrelatedQuery', 'en'));
console.log('  Urdu unrelated ->', getLocalizedResponse('unrelatedQuery', 'ur'));
console.log('  Hindi unrelated ->', getLocalizedResponse('unrelatedQuery', 'hi'));

// Test 7: Language consistency
console.log('\nLanguage Consistency:');
const testConversation = [
  { text: 'ہیلو' },
  { text: 'آپ کیسے ہیں؟' },
  { text: 'میں ٹھیک ہوں' }
];
console.log('  Urdu conversation ->', shouldRespondInLanguage(testConversation, 'en'));

const englishConversation = [
  { text: 'Hello' },
  { text: 'How are you?' },
  { text: 'I am fine' }
];
console.log('  English conversation ->', shouldRespondInLanguage(englishConversation, 'en'));

console.log('\nLanguage Detection Tests Completed!');