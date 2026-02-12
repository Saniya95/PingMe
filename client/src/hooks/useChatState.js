import { useState, useRef, useEffect, useCallback } from 'react';
import { SAMPLE_MESSAGES, AI_RESPONSES, getConsistentEncryption } from '../utils/encryption.js';

/**
 * useChatState — Centralized state management for PingMe chat
 *
 * Provides:
 *   isAIChat / isPrivateChat    — chat mode flags
 *   isEncrypted(msgId)          — per-message encryption status
 *   decryptClickCount(msgId)    — per-message click progress (0-5)
 *   messages, inputText, isTypingAI
 *   handleMenuClick, handleSend, getDisplayText
 *   handleCopy, handleDelete, handleRegenerate — AI-specific actions
 */
export function useChatState(selectedContact, isAI) {
  const [messages, setMessages] = useState([]);
  const [msgClickCounts, setMsgClickCounts] = useState({});
  const [decryptedMsgs, setDecryptedMsgs] = useState(new Set());
  const [inputText, setInputText] = useState('');
  const [isTypingAI, setIsTypingAI] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const bottomRef = useRef(null);

  /* ── Derived flags ──────────────────────────────────────── */
  const isAIChat = Boolean(isAI);
  const isPrivateChat = !isAIChat;

  /* ── Per-message helpers ────────────────────────────────── */
  const isEncrypted = useCallback(
    (msgId) => isPrivateChat && !decryptedMsgs.has(msgId),
    [isPrivateChat, decryptedMsgs],
  );

  const decryptClickCount = useCallback(
    (msgId) => msgClickCounts[msgId] || 0,
    [msgClickCounts],
  );

  /* ── Load messages on contact change ────────────────────── */
  useEffect(() => {
    if (isAI) {
      setMessages([
        {
          id: 'ai-welcome',
          text: 'Welcome back!\nHow can I assist you today?',
          sender: 'ai',
          ts: new Date(Date.now() - 1000),
        },
      ]);
    } else if (selectedContact && SAMPLE_MESSAGES[selectedContact.id]) {
      // Deep-copy so mutations don\u2019t leak into the static data
      setMessages(SAMPLE_MESSAGES[selectedContact.id].map((m) => ({ ...m })));
    } else {
      setMessages([]);
    }
    setDecryptedMsgs(new Set());
    setMsgClickCounts({});
    setInputText('');
  }, [selectedContact, isAI]);

  /* ── Auto-scroll ────────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingAI]);

  /* ── AI reply logic (keyword-based) ─────────────────────── */
  const getAIReply = (text) => {
    const t = text.toLowerCase();
    if (/hello|hi |hey/.test(t))
      return AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)];
    if (/help|what can you/.test(t))
      return AI_RESPONSES.help[Math.floor(Math.random() * AI_RESPONSES.help.length)];
    if (/bye|goodbye|see you/.test(t))
      return AI_RESPONSES.goodbye[Math.floor(Math.random() * AI_RESPONSES.goodbye.length)];
    if (/quantum/.test(t))
      return 'Quantum computing harnesses superposition & entanglement to process information beyond classical limits.';
    if (/creative writing|writing tips/.test(t))
      return 'Tips: 1) Show, don\u2019t tell  2) Read widely  3) Write daily  4) Edit ruthlessly  5) Find your voice!';
    if (/pizza/.test(t))
      return 'Great pizza: quality dough, fresh sauce, real mozzarella, don\u2019t overload toppings, max oven heat!';
    if (/world xyz/.test(t))
      return "I\u2019m not sure about XYZ events, but I\u2019d love to chat about history \u2014 ask away!";
    if (/code|restful|api/.test(t))
      return 'For a RESTful API: use clear resource nouns, HTTP methods (GET/POST/PUT/DELETE), status codes & JSON.';
    return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
  };

  /* ── 5-click decrypt handler (private chats) ───────────── */
  const handleMenuClick = useCallback(
    (msg) => {
      if (isAIChat) return;
      const cur = msgClickCounts[msg.id] || 0;
      const next = cur + 1;
      setMsgClickCounts((p) => ({ ...p, [msg.id]: next }));

      if (next >= 5) {
        setDecryptedMsgs((p) => new Set([...p, msg.id]));
        setMsgClickCounts((p) => ({ ...p, [msg.id]: 0 }));
      }
    },
    [isAIChat, msgClickCounts],
  );

  /* ── Send message ───────────────────────────────────────── */
  const handleSend = useCallback(
    (text) => {
      const trimmed = (text || '').trim();
      if (!trimmed) return;

      const userMsg = {
        id: `u-${Date.now()}`,
        text: trimmed,
        ...(isAIChat ? {} : { encrypted: getConsistentEncryption(trimmed) }),
        sender: 'user',
        ts: new Date(),
      };
      setMessages((p) => [...p, userMsg]);
      setInputText('');

      if (isAIChat) {
        setIsTypingAI(true);
        const delay = 800 + Math.random() * 1200;
        setTimeout(() => {
          const reply = getAIReply(trimmed);
          setMessages((p) => [
            ...p,
            { id: `ai-${Date.now()}`, text: reply, sender: 'ai', ts: new Date() },
          ]);
          setIsTypingAI(false);
        }, delay);
      }
    },
    [isAIChat],
  );

  /* ── Display text (encryption-aware) ────────────────────── */
  const getDisplayText = useCallback(
    (msg) => {
      if (isAIChat) return msg.text; // AI: always readable
      if (decryptedMsgs.has(msg.id)) return msg.text; // decrypted
      return msg.encrypted || msg.text; // encrypted
    },
    [isAIChat, decryptedMsgs],
  );

  /* ── AI chat actions ────────────────────────────────────── */
  const handleCopy = useCallback((text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 1800);
    }).catch(() => {});
  }, []);

  const handleDelete = useCallback((msgId) => {
    setMessages((p) => p.filter((m) => m.id !== msgId));
  }, []);

  const handleRegenerate = useCallback((msgId) => {
    // Remove old AI message, then generate a new one
    setMessages((prev) => {
      const filtered = prev.filter((m) => m.id !== msgId);
      return filtered;
    });
    setIsTypingAI(true);
    setTimeout(() => {
      setMessages((prev) => {
        // Find the last user message to base the reply on
        let userText = '';
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].sender === 'user') {
            userText = prev[i].text;
            break;
          }
        }
        const reply = getAIReply(userText);
        return [
          ...prev,
          { id: `ai-${Date.now()}`, text: reply, sender: 'ai', ts: new Date() },
        ];
      });
      setIsTypingAI(false);
    }, 800 + Math.random() * 800);
  }, []);

  return {
    // State
    messages,
    inputText,
    setInputText,
    isTypingAI,
    bottomRef,
    copyToast,
    // Flags
    isAIChat,
    isPrivateChat,
    // Per-message helpers
    isEncrypted,
    decryptClickCount,
    // Handlers
    handleMenuClick,
    handleSend,
    getDisplayText,
    handleCopy,
    handleDelete,
    handleRegenerate,
  };
}
