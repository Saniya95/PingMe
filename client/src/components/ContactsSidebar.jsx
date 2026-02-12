import React from 'react';

/**
 * ContactsSidebar \u2014 Left panel showing contacts & AI entry point
 *
 * Features:
 *   \u2022 AI contact pinned top (name/emoji driven by aiInfo prop \u2014 multi-AI)
 *   \u2022 Encrypted contacts with 5-click decrypt
 *   \u2022 Auto-re-encrypts when navigating away
 *   \u2022 Click progress dots
 */
export default function ContactsSidebar({
  contacts,
  aiInfo,
  selectedContact,
  onContactClick,
  onAIClick,
  contactClickCounts,
  decryptedContacts,
}) {
  /** Click progress dots */
  const renderClickDots = (contactId) => {
    const count = contactClickCounts[contactId] || 0;
    if (count === 0) return null;

    return (
      <div className="pm-click-indicator">
        <div className="pm-click-dots">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`pm-dot ${i < count ? 'pm-dot--filled' : ''}`} />
          ))}
        </div>
        <span className="pm-click-hint">
          {count < 5 ? `Tap ${5 - count} more` : ''}
        </span>
      </div>
    );
  };

  const isAISelected = selectedContact?.id === 'ai';

  return (
    <aside className="pm-sidebar">
      {/* Sidebar header */}
      <div className="pm-sidebar-head">
        <h2 className="pm-sidebar-title">PingMe</h2>
      </div>

      {/* Scrollable contacts list */}
      <div className="pm-contacts-list">
        {/* \u2500\u2500 AI contact (pinned top) \u2014 always normal, never encrypted \u2500 */}
        <div
          className={`pm-contact-item pm-ai-item ${isAISelected ? 'pm-contact--selected' : ''}`}
          onClick={onAIClick}
        >
          <div
            className="pm-avatar pm-avatar--ai"
            style={aiInfo?.gradient ? { background: aiInfo.gradient } : undefined}
          >
            {aiInfo?.emoji || '\uD83E\uDD16'}
          </div>
          <div className="pm-contact-body">
            <div className="pm-contact-name">{aiInfo?.name || 'PingMe AI'}</div>
            <div className="pm-contact-preview">Ask me anything \u2014 always readable</div>
          </div>
          <div className="pm-contact-badge pm-badge-ai">AI</div>
        </div>

        {/* Divider */}
        <div className="pm-divider">
          <span>Private messages\u2026</span>
        </div>

        {/* \u2500\u2500 Encrypted contacts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
        {contacts.map((contact) => {
          const isSelected = selectedContact?.id === contact.id;
          const isDecrypted = decryptedContacts.has(contact.id);
          const displayLabel = isDecrypted ? contact.realPhone : contact.encrypted;

          return (
            <div
              key={contact.id}
              className={`pm-contact-item ${isSelected ? 'pm-contact--selected' : ''} ${isDecrypted ? 'pm-contact--decrypted' : ''}`}
              onClick={() => onContactClick(contact)}
            >
              {/* Avatar */}
              <div className={`pm-avatar ${isDecrypted ? 'pm-avatar--unlocked' : ''}`}>
                {displayLabel.charAt(0).toUpperCase()}
              </div>

              {/* Name / phone + click dots */}
              <div className="pm-contact-body">
                <div className="pm-contact-name">
                  {displayLabel}
                  <span className="pm-lock">{isDecrypted ? '\uD83D\uDD13' : '\uD83D\uDD12'}</span>
                </div>
                {renderClickDots(contact.id)}
              </div>

              {/* Three-dot menu decoration */}
              <button className="pm-contact-menu" aria-label="Options" onClick={(e) => e.stopPropagation()}>\u22EF</button>
            </div>
          );
        })}
      </div>

      {/* Sidebar footer hint */}
      <div className="pm-sidebar-foot">
        <span className="pm-foot-icon">\uD83D\uDD10</span>
        <div className="pm-foot-text">
          <strong>Encrypted Chat</strong>
          <span>Tap 5 times to decrypt</span>
        </div>
      </div>
    </aside>
  );
}
