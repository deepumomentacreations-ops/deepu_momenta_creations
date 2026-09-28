import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! 🌸 Welcome to Deepu Momenta Creations. I am Deepu's Shopping Assistant, here to help you plan beautiful handmade bouquets, recommend customized gift hampers, and clarify our pricing. Ask me anything, or tell me your budget and let's craft something magical! 💕"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
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
    
    // Add user message
    const updatedMessages = [...messages, { role: 'user', content: userText } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a small connection issue. Please don't worry! You can easily chat with Deepu directly on WhatsApp at 9703265096 for any product questions or pricing quotes. 🌸"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickBudgets = ['₹300', '₹500', '₹1000'];

  const handleQuickBudget = (budget: string) => {
    setInput(`What customized products or combinations can I get for a budget of ${budget}?`);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#502D55] to-[#935073] text-[#F8F4E9] shadow-2xl hover:scale-105 hover:rotate-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#935073] focus:ring-offset-2 focus:ring-offset-[#F8F4E9] group"
        aria-label="Open shopping assistant"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare size={24} className="transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6DBC0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F6DBC0]"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] md:w-[400px] h-[550px] flex flex-col rounded-2xl bg-[#F8F4E9] border border-[#935073]/20 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#502D55] to-[#935073] p-4 text-[#F8F4E9] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F4E9]/10 border border-[#F8F4E9]/20 text-[#F6DBC0]">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold tracking-tight">Deepu's Assistant</h4>
                <p className="text-xs text-[#F6DBC0] flex items-center gap-1 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online & Ready to Help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F8F4E9]/80 hover:text-[#F8F4E9] transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm transition-all ${
                    msg.role === 'user'
                      ? 'bg-[#935073] text-white rounded-br-none'
                      : 'bg-[#F8F4E9] text-[#502D55] border border-[#935073]/10 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F8F4E9] text-[#502D55]/60 border border-[#935073]/10 rounded-2xl rounded-bl-none p-3 text-sm flex items-center gap-2 shadow-sm">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 bg-[#935073] rounded-full animate-bounce" />
                    <span className="h-2 w-2 bg-[#935073] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 bg-[#935073] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                  <span>Deepu's assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Helper */}
          <div className="px-4 py-2 bg-[#F8F4E9]/50 border-t border-[#935073]/5 flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#502D55]/60 shrink-0">Try budget suggestions:</span>
            <div className="flex gap-1.5 overflow-x-auto">
              {quickBudgets.map((b) => (
                <button
                  key={b}
                  onClick={() => handleQuickBudget(b)}
                  className="px-2 py-1 text-xs rounded-full bg-white border border-[#935073]/10 text-[#935073] hover:bg-[#935073]/5 transition-colors font-semibold"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form & Custom WhatsApp Action */}
          <div className="p-3 bg-[#F8F4E9] border-t border-[#935073]/10">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about bouquets, keychains, custom orders..."
                className="flex-1 bg-white border border-[#935073]/20 text-sm text-[#502D55] px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#935073] placeholder-[#502D55]/40"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#502D55] text-white hover:bg-[#3D2141] transition-colors shadow-md disabled:opacity-50"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </form>
            
            {/* Quick WhatsApp Action inside Assistant */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-[#502D55]/50">Need direct human contact?</span>
              <a
                href="https://wa.me/919703265096?text=Hello%20Deepu%20Momenta%20Creations!%20%F0%9F%91%8B%20I%20have%20some%20questions%20about%20your%20handmade%20creations."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#935073] font-bold hover:text-[#502D55] transition-colors"
              >
                Chat directly on WhatsApp <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
