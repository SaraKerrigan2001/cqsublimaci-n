'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  senderRole: string;
  createdAt: string;
}

export function UserChat({ darkMode }: { darkMode: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const border = darkMode ? 'border-gray-700' : 'border-gray-200';
  const text = darkMode ? 'text-white' : 'text-gray-900';
  const subtext = darkMode ? 'text-gray-400' : 'text-gray-500';

  useEffect(() => {
    loadConversation();
  }, []);

  useEffect(() => {
    if (conversationId) {
      pollRef.current = setInterval(() => fetchMessages(conversationId), 3000);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadConversation() {
    setLoading(true);
    const r = await fetch('/api/chat/conversations');
    if (r.ok) {
      const data = await r.json();
      setConversationId(data.conversation.id);
      setMessages(data.conversation.messages || []);
    }
    setLoading(false);
  }

  async function fetchMessages(convId: string) {
    const r = await fetch(`/api/chat/messages?conversationId=${convId}`);
    if (r.ok) {
      const data = await r.json();
      setMessages(data.messages || []);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !conversationId) return;
    const text = input.trim();
    setInput('');
    const tempMsg: Message = {
      id: 'temp-' + Date.now(),
      content: text,
      senderRole: 'USER',
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMsg]);
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, content: text }),
    });
    await fetchMessages(conversationId);
  }

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={`flex flex-col h-[500px] rounded-xl border ${border} overflow-hidden`}>
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">CQ</div>
        <div>
          <p className="text-white font-semibold text-sm">Soporte CQ Sublimación</p>
          <p className="text-indigo-200 text-xs">Chat en vivo con el administrador</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div className={`flex flex-col items-center justify-center h-full gap-2 ${subtext}`}>
            <MessageCircle className="w-10 h-10 opacity-30" />
            <p className="text-sm text-center">Escribe tu mensaje y un asesor te responderá pronto.</p>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderRole === 'USER' ? 'justify-end' : 'justify-start'}`}>
            {msg.senderRole === 'ADMIN' && (
              <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <span className="text-xs text-indigo-400 font-bold">CQ</span>
              </div>
            )}
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
              msg.senderRole === 'USER'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                : darkMode ? 'bg-gray-700 text-gray-200 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.senderRole === 'USER' ? 'text-indigo-200' : subtext}`}>
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`px-4 py-3 border-t ${border} flex gap-2`}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje..."
          className={`flex-1 text-sm rounded-xl px-3 py-2 outline-none border ${border} ${
            darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-50 text-gray-900 placeholder-gray-400'
          } focus:border-indigo-500`}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
