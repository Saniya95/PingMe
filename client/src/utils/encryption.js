// Encryption utilities for PingMe app
// Simulates encryption/decryption with random alphanumeric strings

const ENCRYPT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*!?';

/**
 * Generate a random encrypted string
 * @param {number} length - Length of encrypted string  
 * @returns {string} - Random encrypted string
 */
export function generateEncryptedString(length = 8) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ENCRYPT_CHARS.charAt(Math.floor(Math.random() * ENCRYPT_CHARS.length));
  }
  return result;
}

/**
 * Generate encrypted phone number format
 * @returns {string} - Encrypted phone number like "9xA#21K@88"
 */
export function generateEncryptedPhone() {
  const prefixes = ['9x', '7#', '8@', '6$', '5%'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const middle = generateEncryptedString(4);
  const suffix = Math.floor(Math.random() * 99).toString().padStart(2, '0');
  return prefix + middle + suffix;
}

/**
 * Generate encrypted message
 * @param {number} length - Length of encrypted message
 * @returns {string} - Encrypted message like "A9#x2L_77Q"
 */
export function generateEncryptedMessage(length = 12) {
  return generateEncryptedString(length);
}

/**
 * Create a simple hash for consistent encryption mapping
 * @param {string} text - Original text to hash
 * @returns {string} - Simple hash
 */
function simpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString();
}

/**
 * Get consistent encrypted version of a text
 * @param {string} originalText - Original text
 * @returns {string} - Consistent encrypted version
 */
export function getConsistentEncryption(originalText) {
  const hash = simpleHash(originalText);
  const seed = parseInt(hash.slice(0, 6), 10);
  
  // Use seed for consistent random generation
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  let encrypted = '';
  const targetLength = Math.max(8, Math.min(originalText.length, 15));
  
  for (let i = 0; i < targetLength; i++) {
    const randomIndex = Math.floor(seededRandom(seed + i) * ENCRYPT_CHARS.length);
    encrypted += ENCRYPT_CHARS[randomIndex];
  }
  
  return encrypted;
}

/**
 * Sample contact data with real names/numbers
 */
export const SAMPLE_CONTACTS = [
  { id: 1, realName: 'John Doe', realPhone: '+91 9876543210', encrypted: null },
  { id: 2, realName: 'Sarah Wilson', realPhone: '+44 7123456789', encrypted: null },
  { id: 3, realName: 'Mike Chen', realPhone: '+1 555-0123', encrypted: null },
  { id: 4, realName: 'Emily Johnson', realPhone: '+91 8765432109', encrypted: null },
  { id: 5, realName: 'Alex Brown', realPhone: '+44 7987654321', encrypted: null },
];

// Initialize encrypted versions
SAMPLE_CONTACTS.forEach(contact => {
  contact.encrypted = getConsistentEncryption(contact.realPhone);
});

/**
 * AI types for multi-AI support
 */
export const AI_TYPES = {
  pingme:     { id: 'ai', name: 'PingMe AI',   emoji: '🤖', gradient: 'linear-gradient(135deg, #A3F0FF, #C4ABFF)' },
  gemini:     { id: 'ai', name: 'Gemini',       emoji: '✨', gradient: 'linear-gradient(135deg, #FFD6A5, #FFB7C5)' },
  chatgpt:    { id: 'ai', name: 'ChatGPT',      emoji: '🤖', gradient: 'linear-gradient(135deg, #10a37f, #1a7f64)', isChatGPT: true },
  copilot:    { id: 'ai', name: 'Copilot',      emoji: '🚀', gradient: 'linear-gradient(135deg, #A3F0C4, #9AE6FF)' },
};

/**
 * Sample messages for different contacts
 */
export const SAMPLE_MESSAGES = {
  1: [
    { id: 1, text: 'Hey! How are you doing?', sender: 'contact', ts: new Date(Date.now() - 3600000) },
    { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'user', ts: new Date(Date.now() - 3500000) },
    { id: 3, text: 'Great! Want to meet up later?', sender: 'contact', ts: new Date(Date.now() - 3400000) },
    { id: 4, text: 'Sure, what time works for you?', sender: 'user', ts: new Date(Date.now() - 3300000) },
  ],
  2: [
    { id: 5, text: 'Did you finish the project report?', sender: 'contact', ts: new Date(Date.now() - 7200000) },
    { id: 6, text: 'Yes, I sent it to you yesterday', sender: 'user', ts: new Date(Date.now() - 7100000) },
    { id: 7, text: 'Perfect! Thanks for the quick turnaround', sender: 'contact', ts: new Date(Date.now() - 7000000) },
  ],
  3: [
    { id: 8, text: 'The meeting is rescheduled to 3 PM', sender: 'contact', ts: new Date(Date.now() - 1800000) },
    { id: 9, text: 'Got it, I\'ll update my calendar', sender: 'user', ts: new Date(Date.now() - 1700000) },
  ],
  4: [
    { id: 10, text: 'Happy birthday! 🎉', sender: 'contact', ts: new Date(Date.now() - 86400000) },
    { id: 11, text: 'Thank you so much! 😊', sender: 'user', ts: new Date(Date.now() - 86300000) },
  ],
  5: [
    { id: 12, text: 'Can you help me with the code review?', sender: 'contact', ts: new Date(Date.now() - 900000) },
    { id: 13, text: 'Of course! Send me the PR link', sender: 'user', ts: new Date(Date.now() - 800000) },
  ]
};

// Add encrypted versions to messages
Object.keys(SAMPLE_MESSAGES).forEach(contactId => {
  SAMPLE_MESSAGES[contactId].forEach(message => {
    message.encrypted = getConsistentEncryption(message.text);
  });
});

/**
 * AI Chat responses - basic keyword-based logic
 */
export const AI_RESPONSES = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Hey! I'm PingMe AI, ready to chat!"
  ],
  help: [
    "I can help you with basic questions and have simple conversations!",
    "I'm here to assist with general queries and friendly chat.",
    "Ask me anything and I'll do my best to help!"
  ],
  default: [
    "That's interesting! Tell me more.",
    "I understand. What else would you like to know?",
    "Thanks for sharing that with me!",
    "How can I help you further?"
  ],
  goodbye: [
    "Goodbye! Have a great day!",
    "See you later! Take care!",
    "Bye! Feel free to chat anytime!"
  ]
};

export const AI_CONTACT = {
  id: 'ai',
  realName: 'PingMe AI',
  realPhone: 'AI Assistant',
  encrypted: 'Py#gM3_AI'
};