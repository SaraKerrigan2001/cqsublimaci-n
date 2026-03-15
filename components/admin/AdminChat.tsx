'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, MessageCircle, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  senderRole: string;
  createdAt: string;
  read: boolean;
}

interface Conversation {
  id: string;
  status: string;
  updatedAt: string;
  user: { id: string; name: string; email: string };
  messages: Message[];
}

export function AdminChat({ darkMode }: { darkMode: boolean }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const bg = darkMode ? 'bg-gray-900' : 'bg-white';
  const border = darkMode ? 'border-gray-700' : 'border-gray-200';
  const text = darkMode ? 'text-white' : 'text-gray-900';
  const subtext = darkMode ? 'text-gray-400' : 'text-gray-500';
  const itemBg = darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100';

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConv) {
      fetchMessages(selectedConv.id);
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(() => fetchMessages(selectedConv.id), 3000);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [selectedConv?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadConversations() {
    const r = await fetch('/api/chat/conversations');
    if (r.ok) {
      const data = await r.json();
      setConversations(data.conversations || []);
      setLoading(false);
    }
  }

  async function fetchMessages(convId: string) {
    const r = await fetch(`/api/chat/messages?conversationId=${convId}`);
    if (r.ok) {
      const data = await r.json();
      setMessages(data.messages || []);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !selectedConv) return;
    const text = input.trim();
    setInput('');
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: selectedConv.id, content: text }),
    });
    await fetchMessages(selectedConv.id);
  }

  function getUnread(conv: Conversation) {
    return conv.messages.filter(m => m.senderRole === 'USER' && !m.read).length;
  }

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex h-[600px] rounded-xl border ${border} overflow-hidden`}>
      {/* Sidebar - lista de conversaciones */}
      <div className={`w-72 border-r ${border} flex flex-col`}>
        <div className={`px-4 py-3 border-b ${border}`}>
          <h3 className={`font-semibold ${text}`}>Conversaciones</h3>
          <p className={`text-xs ${subtext}`}>{conversations.length} chats activos</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full gap-2 ${subtext}`}>
              <MessageCircle className="w-8 h-8 opacity-40" />
              <p className="text-sm">Sin conversaciones aún</p>
            </div>
          ) : (
            conversations.map(conv => {
              const unread = getUnread(conv);
              const lastMsg = conv.messages[0];
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full text-left px-4 py-3 border-b ${border} transition-colors ${
                    selectedConv?.id === conv.id
                      ? 'bg-indigo-600/20 border-l-2 border-l-indigo-500'
                      : itemBg
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-500/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className={`text-sm font-medium ${text} truncate max-w-[120px]`}>
                        {conv.user.name || conv.user.email}
                      </span>
                    </div>
                    {unread > 0 && (
                      <span className="w-5 h-5 bg-indigo-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                        {unread}
                      </span>
                    )}
                  </div>
                  {lastMsg && (
                    <p className={`text-xs ${subtext} truncate`}>
                      {lastMsg.senderRole === 'ADMIN' ? 'Tú: ' : ''}{lastMsg.content}
                    </p>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Panel de mensajes */}
      <div className="flex-1 flex flex-col">
        {!selectedConv ? (
          <div className={`flex flex-col items-center justify-center h-full gap-3 ${subtext}`}>
            <MessageCircle className="w-12 h-12 opacity-30" />
            <p className="text-sm">Selecciona una conversación</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={`px-4 py-3 border-b ${border} flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${text}`}>{selectedConv.user.name || 'Usuario'}</p>
                <p className={`text-xs ${subtext}`}>{selectedConv.user.email}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <p className={`text-center text-sm ${subtext} mt-8`}>Sin mensajes aún. Escribe para iniciar.</p>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderRole === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                    msg.senderRole === 'ADMIN'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                      : darkMode ? 'bg-gray-700 text-gray-200 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.senderRole === 'ADMIN' ? 'text-indigo-200' : subtext}`}>
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
                placeholder="Responder al usuario..."
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
          </>
        )}
      </div>
    </div>
  );
}
