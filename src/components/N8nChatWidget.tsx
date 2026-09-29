import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircle, Bot, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

const N8N_PRODUCTION_WEBHOOK = 'https://deepumomentacretions.app.n8n.cloud/webhook/389f5bf8-b418-48fc-ae87-750b15983946/chat';
const N8N_TEST_WEBHOOK = 'https://deepumomentacretions.app.n8n.cloud/webhook-test/389f5bf8-b418-48fc-ae87-750b15983946/chat';

export default function N8nChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('deepu_n8n_session');
    if (saved) return saved;
    const newId = 'n8n_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    localStorage.setItem('deepu_n8n_session', newId);
    return newId;
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! 🌸 Welcome to Deepu Momenta Creations. How can I help you today with our handcrafted pipe-cleaner flowers, custom flower pots, gift hampers, or keychains?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/n8n-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: userText,
          message: userText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.text || "Thank you for reaching out! Please message Deepu on WhatsApp at 9703265096 for customized orders.";

      setMessages((prev) => [
        ...prev,
        {
          id: 'res_' + Date.now(),
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: "Hello! 🌸 Welcome to Deepu Momenta Creations. You can ask about our pipe cleaner flowers, flower pots, keychains, or chat with Deepu directly on WhatsApp at 9703265096! 💕",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Flower Pot Prices",
    "Bouquet Options",
    "Gift Hampers",
    "Crochet Keychains"
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#502D55] to-[#935073] text-[#F8F4E9] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#935073] focus:ring-offset-2 focus:ring-offset-[#F8F4E9]"
        aria-label="Open n8n chatbot"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative">
            <Bot size={26} className="transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </div>
        )}
      </button>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] md:w-[400px] h-[560px] flex flex-col rounded-3xl bg-[#F8F4E9] border border-[#935073]/20 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#502D55] to-[#935073] p-4 text-[#F8F4E9] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F4E9]/15 border border-[#F8F4E9]/20 text-[#F6DBC0]">
                <Bot size={22} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif text-sm font-bold tracking-tight">Deepu's n8n Chatbot</h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/20 rounded font-bold">n8n</span>
                </div>
                <p className="text-[11px] text-[#F6DBC0] flex items-center gap-1 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Automated Assistant Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F8F4E9]/80 hover:text-[#F8F4E9] transition-colors p-1.5 rounded-full hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs transition-all whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#502D55] text-white rounded-br-none'
                      : 'bg-white text-[#502D55] border border-[#935073]/15 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-[#502D55]/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-[#502D55]/70 border border-[#935073]/15 rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-2 shadow-xs">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-[#935073] rounded-full animate-bounce" />
                    <span className="h-1.5 w-1.5 bg-[#935073] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 bg-[#935073] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                  <span>n8n assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Helper */}
          <div className="px-3.5 py-2 bg-[#F8F4E9] border-t border-[#935073]/10 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-bold text-[#502D55]/50 shrink-0">Quick Ask:</span>
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(`What are your prices for ${q}?`);
                }}
                className="px-2.5 py-1 text-[11px] rounded-full bg-white border border-[#935073]/15 text-[#502D55] hover:bg-[#935073] hover:text-white transition-colors font-medium shrink-0 shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#935073]/15">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about flower pots, bouquets, keychains..."
                className="flex-1 bg-[#F8F4E9]/50 border border-[#935073]/20 text-xs text-[#502D55] px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#935073] placeholder-[#502D55]/40"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-[#502D55] text-white hover:bg-[#3D2141] transition-colors shadow-sm disabled:opacity-40 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px]">
              <span className="text-[#502D55]/50">Powered by n8n Webhook</span>
              <a
                href="https://wa.me/919703265096?text=Hello%20Deepu%20Momenta%20Creations!%20%F0%9F%91%8B%20I%20have%20questions%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#935073] font-bold hover:underline inline-flex items-center gap-0.5"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
