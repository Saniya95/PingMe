import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ContactsSidebar from '../components/ContactsSidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import { SAMPLE_CONTACTS, AI_CONTACT, AI_TYPES } from '../utils/encryption.js';

/**
 * PingMeChat — Main chat page (supports multiple AI types)
 *
 * Route: /chat/:aiType?   (defaults to 'pingme')
 * When aiType === 'chatgpt', renders a full ChatGPT-replica UI.
 */
export default function PingMeChat() {
  const { isAuthenticated } = useAuth();
  const { aiType } = useParams();

  // Resolve AI info from route param (default to 'pingme')
  const currentAI = AI_TYPES[aiType] || AI_TYPES.pingme;
  const isChatGPT = currentAI.isChatGPT === true;

  const [selectedContact, setSelectedContact] = useState(AI_CONTACT);
  const [contactClickCounts, setContactClickCounts] = useState({});
  const [decryptedContacts, setDecryptedContacts] = useState(new Set());

  /* Chat history for ChatGPT sidebar */
  const [chatHistories, setChatHistories] = useState([
    { id: 1, title: 'New conversation', active: true },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);

  /* Guard */
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  /* Re-encrypt helper */
  const reEncryptPrevious = (prev) => {
    if (prev && prev.id !== 'ai') {
      setDecryptedContacts((s) => {
        const n = new Set(s);
        n.delete(prev.id);
        return n;
      });
    }
  };

  /* Contact click handler (5 = decrypt) */
  const handleContactClick = (contact) => {
    if (selectedContact?.id !== contact.id) {
      reEncryptPrevious(selectedContact);
      setContactClickCounts((p) => ({ ...p, [contact.id]: 1 }));
      setSelectedContact(contact);
      return;
    }
    const cur = contactClickCounts[contact.id] || 0;
    const next = cur + 1;
    setContactClickCounts((p) => ({ ...p, [contact.id]: next }));
    if (next >= 5) {
      setDecryptedContacts((p) => new Set([...p, contact.id]));
      setContactClickCounts((p) => ({ ...p, [contact.id]: 0 }));
    }
    setSelectedContact(contact);
  };

  /* AI click handler */
  const handleAIClick = () => {
    reEncryptPrevious(selectedContact);
    setSelectedContact(AI_CONTACT);
  };

  /* New Chat handler for ChatGPT */
  const handleNewChat = () => {
    const newId = Date.now();
    setChatHistories((prev) => [
      { id: newId, title: 'New conversation', active: true },
      ...prev.map((c) => ({ ...c, active: false })),
    ]);
    setActiveChatId(newId);
  };

  const handleSelectChat = (id) => {
    setChatHistories((prev) =>
      prev.map((c) => ({ ...c, active: c.id === id }))
    );
    setActiveChatId(id);
  };

  /* =========================================================
     ChatGPT Mode — Full replica layout
     ========================================================= */
  if (isChatGPT) {
    return (
      <div className="gpt-page">
        {/* Left Sidebar */}
        <aside className="gpt-sidebar">
          <button className="gpt-new-chat" onClick={handleNewChat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New chat
          </button>

          <div className="gpt-history">
            {chatHistories.map((chat) => (
              <button
                key={chat.id}
                className={`gpt-history-item ${chat.active ? 'gpt-history-item--active' : ''}`}
                onClick={() => handleSelectChat(chat.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                <span className="gpt-history-title">{chat.title}</span>
              </button>
            ))}
          </div>

          <div className="gpt-sidebar-footer">
            <div className="gpt-user-pill">
              <div className="gpt-user-avatar">U</div>
              <span className="gpt-user-name">User</span>
            </div>
          </div>
        </aside>

        {/* Right Main Chat */}
        <ChatWindow
          selectedContact={selectedContact}
          isAI={true}
          decryptedContacts={decryptedContacts}
          aiInfo={currentAI}
          isChatGPTMode={true}
        />
      </div>
    );
  }

  /* =========================================================
     Default Mode — Original PingMe layout
     ========================================================= */
  return (
    <div className="pm-page">
      <ContactsSidebar
        contacts={SAMPLE_CONTACTS}
        aiInfo={currentAI}
        selectedContact={selectedContact}
        onContactClick={handleContactClick}
        onAIClick={handleAIClick}
        contactClickCounts={contactClickCounts}
        decryptedContacts={decryptedContacts}
      />
      <ChatWindow
        selectedContact={selectedContact}
        isAI={selectedContact?.id === 'ai'}
        decryptedContacts={decryptedContacts}
        aiInfo={currentAI}
      />
    </div>
  );
}
