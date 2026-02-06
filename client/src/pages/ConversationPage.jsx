import React from "react";
import ChatHeader from "../components/ChatHeader.jsx";
import MessageBubble from "../components/MessageBubble.jsx";
import MessageInput from "../components/MessageInput.jsx";

export default function ConversationPage() {
  return (
    <div className="max-w-6xl mx-auto grid grid-rows-[auto,1fr,auto] gap-4">
      <ChatHeader />
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)]">
        <div className="space-y-6">
          <MessageBubble />
        </div>
      </div>
      <MessageInput />
    </div>
  );
}
