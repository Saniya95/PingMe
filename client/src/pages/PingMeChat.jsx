import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ContactsSidebar from '../components/ContactsSidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import { SAMPLE_CONTACTS, AI_CONTACT, AI_TYPES } from '../utils/encryption.js';

/**
 * PingMeChat \u2014 Main chat page (supports multiple AI types)
 *
 * Route: /chat/:aiType?   (defaults to \u2018pingme\u2019)
 *
 * Layout:
 * \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
 * \u2502  Sidebar     \u2502  Chat window             \u2502
 * \u2502  (contacts)  \u2502  (messages + input)       \u2502
 * \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
 *
 * The AI type is resolved from the :aiType URL param.
 * Clicking a private contact 5 times decrypts its number/name.
 * Switching contacts auto-re-encrypts the previous one.
 */
export default function PingMeChat() {
  const { isAuthenticated } = useAuth();
  const { aiType } = useParams();

  // Resolve AI info from route param (default to \u2018pingme\u2019)
  const currentAI = AI_TYPES[aiType] || AI_TYPES.pingme;

  const [selectedContact, setSelectedContact] = useState(AI_CONTACT);
  const [contactClickCounts, setContactClickCounts] = useState({});
  const [decryptedContacts, setDecryptedContacts] = useState(new Set());

  /* \u2500\u2500 Guard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  /* \u2500\u2500 Re-encrypt helper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  const reEncryptPrevious = (prev) => {
    if (prev && prev.id !== 'ai') {
      setDecryptedContacts((s) => {
        const n = new Set(s);
        n.delete(prev.id);
        return n;
      });
    }
  };

  /* \u2500\u2500 Contact click handler (5 = decrypt) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  const handleContactClick = (contact) => {
    // Switching to a different contact: re-encrypt old, start count at 1
    if (selectedContact?.id !== contact.id) {
      reEncryptPrevious(selectedContact);
      setContactClickCounts((p) => ({ ...p, [contact.id]: 1 }));
      setSelectedContact(contact);
      return;
    }

    // Same contact: increment click count
    const cur = contactClickCounts[contact.id] || 0;
    const next = cur + 1;
    setContactClickCounts((p) => ({ ...p, [contact.id]: next }));

    if (next >= 5) {
      setDecryptedContacts((p) => new Set([...p, contact.id]));
      setContactClickCounts((p) => ({ ...p, [contact.id]: 0 }));
    }

    setSelectedContact(contact);
  };

  /* \u2500\u2500 AI click handler \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  const handleAIClick = () => {
    reEncryptPrevious(selectedContact);
    setSelectedContact(AI_CONTACT);
  };

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
