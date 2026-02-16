import React from 'react';
import { useChatState } from '../hooks/useChatState.js';
import MessageBubble from './MessageBubble.jsx';

/**
 * ChatGPT logo SVG component (OpenAI swirl icon)
 */
function ChatGPTIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012l-8.052-4.651a7.504 7.504 0 0 1-2.744-10.239Zm26.965 6.27-9.722-5.614 3.365-1.945a.122.122 0 0 1 .114-.012l8.052 4.651a7.497 7.497 0 0 1-1.158 13.528V21.228a1.29 1.29 0 0 0-.651-1.339Zm3.35-5.049a7.573 7.573 0 0 0-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V17.827Z" fill="#10a37f"/>
    </svg>
  );
}

/**
 * ChatWindow — Right panel that displays chat messages
 *
 * Supports two rendering modes:
 *  - Default PingMe mode (glassmorphism pastel)
 *  - ChatGPT mode (dark theme, ChatGPT-style UI) when isChatGPTMode=true
 */
export default function ChatWindow({ selectedContact, isAI, decryptedContacts, aiInfo, isChatGPTMode = false }) {
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

  /* Form submit */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(inputText);
  };

  /* =========================================================
     ChatGPT MODE — dark theme replica
     ========================================================= */
  if (isChatGPTMode) {
    return (
      <section className="gpt-main">
        {/* Header */}
        <div className="gpt-header">
          <div className="gpt-model-select">
            <ChatGPTIcon size={20} />
            <span className="gpt-model-name">ChatGPT 4</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div className="gpt-header-actions">
            <button className="gpt-share-btn" aria-label="Share">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="gpt-messages">
          {messages.length === 0 && (
            <div className="gpt-welcome">
              <ChatGPTIcon size={40} />
              <h2 className="gpt-welcome-title">How can I help you today?</h2>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`gpt-msg-row ${isUser ? 'gpt-msg--user' : 'gpt-msg--ai'}`}>
                <div className="gpt-msg-container">
                  {!isUser && (
                    <div className="gpt-msg-avatar">
                      <ChatGPTIcon size={20} />
                    </div>
                  )}
                  <div className={`gpt-msg-bubble ${isUser ? 'gpt-bubble--user' : 'gpt-bubble--ai'}`}>
                    <div className="gpt-msg-text">
                      {getDisplayText(msg).split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI hover actions */}
                {!isUser && (
                  <div className="gpt-msg-actions">
                    <button className="gpt-action-btn" onClick={() => handleCopy(msg.text)} aria-label="Copy" title="Copy">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    </button>
                    <button className="gpt-action-btn" onClick={() => handleRegenerate(msg.id)} aria-label="Regenerate" title="Regenerate">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 4v6h6M23 20v-6h-6" />
                        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
                      </svg>
                    </button>
                    <button className="gpt-action-btn gpt-action-btn--danger" onClick={() => handleDelete(msg.id)} aria-label="Delete" title="Delete">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTypingAI && (
            <div className="gpt-msg-row gpt-msg--ai">
              <div className="gpt-msg-container">
                <div className="gpt-msg-avatar">
                  <ChatGPTIcon size={20} />
                </div>
                <div className="gpt-bubble--ai gpt-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="gpt-input-wrapper">
          <form className="gpt-input-bar" onSubmit={onSubmit}>
            <input
              type="text"
              className="gpt-input"
              placeholder="Send a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={500}
            />
            <button
              type="submit"
              className={`gpt-send-btn ${inputText.trim() ? 'gpt-send--active' : ''}`}
              disabled={!inputText.trim()}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <p className="gpt-disclaimer">ChatGPT can make mistakes. Check important info.</p>
        </div>

        {/* Copy toast */}
        {copyToast && <div className="gpt-copy-toast">Copied to clipboard!</div>}
      </section>
    );
  }

  /* =========================================================
     Default PingMe MODE
     ========================================================= */

  /* Empty state */
  if (!selectedContact) {
    return (
      <section className="pm-chat">
        <div className="pm-chat-empty">
          <div className="pm-empty-icon">💬</div>
          <h3>Welcome to PingMe</h3>
          <p>Select a contact to start messaging</p>
        </div>
      </section>
    );
  }

  /* Header display name */
  const headerName = isAI
    ? (aiInfo?.name || 'PingMe AI')
    : decryptedContacts?.has(selectedContact.id)
      ? selectedContact.realName
      : selectedContact.encrypted;

  /* Suggested prompts (AI chat only, when few messages) */
  const suggestedPrompts = [
    'Who won the world XYZ?',
    'Explain quantum computing in simple terms',
    'Got any creative writing tips?',
    'Prid restful kep code',
    'How do I make a pizza?',
  ];

  return (
    <section className="pm-chat">
      {/* Chat header */}
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
          {isAI && <span className="pm-chat-head-status">Online • AI Assistant</span>}
        </div>

        <div className="pm-chat-head-actions">
          <button className="pm-head-icon" aria-label="Save">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
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

      {/* Suggested prompts (AI only, when few messages) */}
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

      {/* Input bar */}
      <form className="pm-input-bar" onSubmit={onSubmit}>
        <input
          type="text"
          className="pm-input"
          placeholder="Type a message…"
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

      {/* Copy toast */}
      {copyToast && <div className="pm-copy-toast">Copied to clipboard!</div>}
    </section>
  );
}
