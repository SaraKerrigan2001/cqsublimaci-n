'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  senderRole: string;
  createdAt: string;
}

// Respuestas automáticas del bot cuando no hay admin
const BOT_RESPONSES: Record<string, string> = {
  default: '¡Hola! Soy el asistente de CQ Sublimación. ¿En qué puedo ayudarte?',
  precio: 'Nuestros precios: Tazas desde $15.99, Camisetas desde $25.99, Impresión 3D desde $35.99. ¿Te gustaría una cotización personalizada?',
  taza: 'Ofrecemos tazas de cerámica de alta calidad con sublimación full color. Resistentes al lavado y con colores vibrantes. Precio desde $15.99.',
  camiseta: 'Camisetas 100% poliéster con impresión HD de alta definición. Tacto suave y colores duraderos. Precio desde $25.99.',
  tiempo: 'El tiempo de entrega estándar es de 24-48 horas para pedidos locales. Para pedidos especiales puede ser 2-3 días.',
  contacto: 'Puedes contactarnos por WhatsApp o dejarnos tu mensaje aquí. Un asesor te responderá pronto.',
  pedido: 'Para hacer un pedido, ve a la sección de Servicios y solicita una cotización. También puedes escribirnos aquí.',
  hola: '¡Hola! Bienvenido a CQ Sublimación. ¿En qué te puedo ayudar hoy?',
  gracias: '¡Con gusto! Estamos para servirte. ¿Hay algo más en lo que pueda ayudarte?',
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return BOT_RESPONSES.default;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const [botMode, setBotMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/me').then(r => {
      if (r.ok) {
        setIsLoggedIn(true);
        setBotMode(false);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (open && isLoggedIn) {
      loadConversation();
    } else if (open && !isLoggedIn && messages.length === 0) {
      // Show welcome bot message
      setMessages([{
        id: 'bot-welcome',
        content: '¡Hola! Soy el asistente de CQ Sublimación. Puedo responder preguntas sobre precios, productos y servicios. Para hablar con un asesor, inicia sesión.',
        senderRole: 'ADMIN',
        createdAt: new Date().toISOString(),
      }]);
    }
  }, [open, isLoggedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll for new messages every 3s when open and logged in
  useEffect(() => {
    if (open && isLoggedIn && conversationId) {
      pollRef.current = setInterval(() => fetchMessages(conversationId), 3000);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [open, isLoggedIn, conversationId]);

  async function loadConversation() {
    setLoading(true);
    try {
      const r = await fetch('/api/chat/conversations');
      if (r.ok) {
        const data = await r.json();
        setConversationId(data.conversation.id);
        setMessages(data.conversation.messages || []);
      }
    } finally {
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
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');

    if (!isLoggedIn) {
      // Bot mode
      const userMsg: Message = {
        id: Date.now().toString(),
        content: text,
        senderRole: 'USER',
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMsg]);
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          content: getBotResponse(text),
          senderRole: 'ADMIN',
          createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMsg]);
      }, 600);
      return;
    }

    if (!conversationId) return;
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

  // Count unread admin messages
  useEffect(() => {
    if (!open) {
      const unreadCount = messages.filter(m => m.senderRole === 'ADMIN').length;
      setUnread(unreadCount > 0 && messages.length > 1 ? 1 : 0);
    } else {
      setUnread(0);
    }
  }, [messages, open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-[340px] h-[480px] bg-[#0b0430] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">CQ</div>
              <div>
                <p className="text-white font-semibold text-sm">CQ Sublimación</p>
                <p className="text-indigo-200 text-xs">{isLoggedIn ? 'Chat en vivo' : 'Asistente virtual'}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {loading && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderRole === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  msg.senderRole === 'USER'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-200 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies (bot mode) */}
          {!isLoggedIn && messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1">
              {['Precios', 'Tazas', 'Camisetas', 'Tiempo de entrega'].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 text-white placeholder-gray-400 text-sm rounded-xl px-3 py-2 outline-none border border-white/10 focus:border-indigo-500"
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
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg hover:scale-105 transition-transform relative"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
