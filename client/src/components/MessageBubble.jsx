import React from 'react';

/**
 * MessageBubble — Reusable message bubble for PingMe chat
 *
 * Props:
 *   message        — { id, text, sender, ts, encrypted? }
 *   isAIChat       — Boolean, true if this is an AI conversation
 *   isPrivateChat  — Boolean, true if this is a private conversation
 *   displayText    — The text to render (encrypted or decrypted)
 *   isDecrypted    — Boolean, has this specific message been unlocked?
 *   clickCount     — Number 0-5, current decrypt-click progress
 *   onMenuClick    — Handler for ⋮ click (private: 5-click decrypt)
 *   onCopy         — Handler for copy action (AI chat)
 *   onDelete       — Handler for delete action (AI chat)
 *   onRegenerate   — Handler for regenerate action (AI chat)
 */
export default function MessageBubble({
  message,
  isAIChat,
  isPrivateChat,
  displayText,
  isDecrypted,
  clickCount,
  onMenuClick,
  onCopy,
  onDelete,
  onRegenerate,
}) {
  const isUser = message.sender === 'user';
  const isAIMsg = message.sender === 'ai';

  const fmtTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  /* ── Bubble class names ─────────────────────────────────── */
  const bubbleCls = [
    'pm-bubble',
    isUser ? 'pm-bubble--user' : 'pm-bubble--other',
    isPrivateChat && isDecrypted ? 'pm-bubble--decrypted' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`pm-msg-row ${isUser ? 'pm-msg--right' : 'pm-msg--left'}`}>
      <div className="pm-msg-wrapper">
        {/* ── Bubble ──────────────────────────────────────── */}
        <div className={bubbleCls}>
          {/* Text */}
          <div className="pm-bubble-text">
            {displayText.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Meta row: time + actions + lock */}
          <div className="pm-bubble-meta">
            <span className="pm-bubble-time">{fmtTime(message.ts)}</span>

            {/* Private chat: ⋮ menu on ALL messages (user + contact) */}
            {isPrivateChat && (
              <button
                className="pm-bubble-menu"
                onClick={() => onMenuClick(message)}
                aria-label="Decrypt"
              >
                ⋮
              </button>
            )}

            {/* Check mark for user messages */}
            {isUser && (
              <span className="pm-bubble-check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}

            {/* Lock icon — private chats only */}
            {isPrivateChat && (
              <span className="pm-lock-small">{isDecrypted ? '\uD83D\uDD13' : '\uD83D\uDD12'}</span>
            )}
          </div>

          {/* Click progress dots — private chats, shown while in progress */}
          {isPrivateChat && clickCount > 0 && (
            <div className="pm-msg-dots">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`pm-dot ${i < clickCount ? 'pm-dot--filled' : ''}`} />
              ))}
              <span className="pm-dot-label">{clickCount}/5</span>
            </div>
          )}
        </div>

        {/* ── AI hover actions (copy / regenerate / delete) ── */}
        {isAIChat && (
          <div className="pm-ai-actions">
            {/* Copy */}
            <button
              className="pm-ai-action-btn"
              onClick={() => onCopy(message.text)}
              aria-label="Copy"
              title="Copy"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Regenerate — AI responses only */}
            {isAIMsg && (
              <button
                className="pm-ai-action-btn"
                onClick={() => onRegenerate(message.id)}
                aria-label="Regenerate"
                title="Regenerate"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Delete */}
            <button
              className="pm-ai-action-btn pm-ai-action-btn--danger"
              onClick={() => onDelete(message.id)}
              aria-label="Delete"
              title="Delete"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
