import React from "react";
import ChatCard from "../components/ChatCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function ChatPage() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
      <aside className="col-span-4 space-y-3">
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4">
          <h2 className="text-sm font-semibold text-gray-800">Chats</h2>
        </div>
        <ChatCard title="ChatGPT • Ayaan" preview="Design feedback and prompts" />
        <ChatCard title="VS Code • Sara" preview="Extensions and productivity tips" />
        <ChatCard title="Gemini • Zoya" preview="Brainstorming ideas" />
        <ChatCard title="Copilot • Nabil" preview="Pair programming session" />
      </aside>
      <section className="col-span-8">
        <EmptyState />
      </section>
    </div>
  );
}
