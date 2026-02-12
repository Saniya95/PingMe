import React from 'react';
import { useChatState } from '../hooks/useChatState.js';
import MessageBubble from './MessageBubble.jsx';

/**
 * ChatWindow \u2014 Right panel that displays chat messages
 *
 * Uses the centralized useChatState hook for all logic.
 * Renders MessageBubble for each message (reusable, mode-aware).
 *
 * AI chat:      Always readable, hover actions (copy/delete/regenerate).
 * Private chat: Both sides encrypted, \u22ee menu on ALL bubbles, 5-click decrypt.
 */
export default function ChatWindow({ selectedContact, isAI, decryptedContacts, aiInfo }) {
  const {
    messages,
    inputText,
    setInputText,
    isTypingAI,
    bottomRef,
    copyToast,
    isAIChat,
    isPrivateChat,
    isEncrypted,
    decryptClickCount,
    handleMenuClick,
    handleSend,
    getDisplayText,
    handleCopy,
    handleDelete,
    handleRegenerate,
  } = useChatState(selectedContact, isAI);

  /* \u2500\u2500 Empty state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  if (!selectedContact) {
    return (
      <section className="pm-chat">
        <div className="pm-chat-empty">
          <div className="pm-empty-icon">\uD83D\uDCAC</div>
          <h3>Welcome to PingMe</h3>
          <p>Select a contact to start messaging</p>
        </div>
      </section>
    );
  }

  /* \u2500\u2500 Header display name \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  const headerName = isAI
    ? (aiInfo?.name || 'PingMe AI')
    : decryptedContacts?.has(selectedContact.id)
      ? selectedContact.realName
      : selectedContact.encrypted;

  /* \u2500\u2500 Suggested prompts (AI chat only, when few messages) \u2500\u2500 */
  const suggestedPrompts = [
    'Who won the world XYZ?',
    'Explain quantum computing in simple terms',
    'Got any creative writing tips?',
    'Prid restful kep code',
    'How do I make a pizza?',
  ];

  /* \u2500\u2500 Form submit \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <section className="pm-chat">
      {/* \u2500\u2500 Chat header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <div className="pm-chat-head">
        <button className="pm-back-btn" aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* AI avatar emoji in header */}
        {isAI && aiInfo && (
          <div className="pm-head-circle pm-head-circle--ai" style={{ background: aiInfo.gradient }}>
            <span className="pm-head-emoji">{aiInfo.emoji}</span>
          </div>
        )}
        {!isAI && <div className="pm-head-circle" />}

        <div className="pm-chat-head-info">
          <h3 className="pm-chat-head-name">{headerName}</h3>
          {isAI && <span className="pm-chat-head-status">Online \u2022 AI Assistant</span>}
        </div>

        <div className="pm-chat-head-actions">
          <button className="pm-head-icon" aria-label="Save">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* \u2500\u2500 Messages area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <div className="pm-messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isAIChat={isAIChat}
            isPrivateChat={isPrivateChat}
            displayText={getDisplayText(msg)}
            isDecrypted={!isEncrypted(msg.id)}
            clickCount={decryptClickCount(msg.id)}
            onMenuClick={handleMenuClick}
            onCopy={handleCopy}
            onDelete={handleDelete}
            onRegenerate={handleRegenerate}
          />
        ))}

        {/* AI typing indicator */}
        {isTypingAI && (
          <div className="pm-msg-row pm-msg--left">
            <div className="pm-bubble pm-bubble--other pm-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* \u2500\u2500 Suggested prompts (AI only, when few messages) \u2500\u2500 */}
      {isAIChat && messages.length <= 2 && (
        <div className="pm-suggestions">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              className="pm-suggestion-chip"
              onClick={() => setInputText(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* \u2500\u2500 Input bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <form className="pm-input-bar" onSubmit={onSubmit}>
        <input
          type="text"
          className="pm-input"
          placeholder="Type a message\u2026"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          maxLength={500}
        />
        <button type="button" className="pm-input-icon" aria-label="Attach">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 0118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="submit"
          className={`pm-send-btn ${inputText.trim() ? 'pm-send--active' : ''}`}
          disabled={!inputText.trim()}
          aria-label="Send"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>

      {/* \u2500\u2500 Copy toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      {copyToast && <div className="pm-copy-toast">Copied to clipboard!</div>}
    </section>
  );
}
