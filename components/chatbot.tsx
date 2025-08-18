
"use client";
import ReactMarkdown from 'react-markdown';
import React, { useState, useRef, useEffect } from 'react';

interface ChatbotProps {
  expenses: any[];
  fullPage?: boolean;
}

const Chatbot = ({ expenses, fullPage = false }: ChatbotProps) => {
  const [open, setOpen] = useState(fullPage);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about your expenses or how to save money.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, expenses }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I could not get a response.' }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to Gemini API.' }]);
    }
    setLoading(false);
  };

  if (fullPage) {
    return (
      <div className="w-full h-[80vh] max-h-[500px] flex flex-col rounded-3xl bg-white/80 dark:bg-gray-900/80 shadow-xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200/40 bg-white/40 dark:bg-gray-900/40 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <img
                src="/chatbot.png"
                alt="Chatbot Icon"
                className="w-8 h-8 rounded-full object-cover"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              />
            </span>
            <span className="font-semibold text-gray-800 dark:text-white text-lg">Expense Chatbot</span>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent bg-white/10 dark:bg-gray-900/10">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              {msg.role === 'assistant' ? (
                <span
                  className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-5 py-3 rounded-2xl rounded-bl-md max-w-[70%] shadow prose prose-sm dark:prose-invert"
                  style={{ wordBreak: 'break-word', fontSize: '1rem', lineHeight: '1.5' }}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </span>
              ) : (
                <span
                  className="bg-blue-500/90 text-white px-5 py-3 rounded-2xl rounded-br-md max-w-[70%] shadow-lg"
                  style={{ wordBreak: 'break-word', fontSize: '1rem', lineHeight: '1.5' }}
                >
                  {msg.content}
                </span>
              )}
            </div>
          ))}
          {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="px-8 py-5 flex gap-3 items-center border-t border-gray-200/40 bg-white/40 dark:bg-gray-900/40 rounded-b-3xl">
          <input
            className="flex-1 border-none bg-white/70 dark:bg-gray-800/70 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your expenses..."
            disabled={loading}
            style={{ minWidth: 0 }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow transition disabled:opacity-60"
            aria-label="Send"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Floating widget fallback for other pages
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      {open ? (
        <div
          className="w-80 h-[420px] flex flex-col animate-fade-in"
          style={{
            borderRadius: '2rem',
            background: 'rgba(255,255,255,0.55)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3" style={{ background: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(200,200,200,0.18)' }}>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/90 shadow">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="16" cy="16" rx="13" ry="11" fill="white" fillOpacity="0.95"/>
                  <path d="M10 18c0-2.21 2.91-4 6.5-4s6.5 1.79 6.5 4c0 2.21-2.91 4-6.5 4-.98 0-1.91-.09-2.77-.25-.41-.08-.84.01-1.17.25l-2.09 1.5c-.38.27-.9-.01-.9-.48v-2.13c0-.28-.11-.54-.3-.74C10.13 19.37 10 18.7 10 18z" fill="#1857e6" fillOpacity="0.7"/>
                </svg>
              </span>
              <span className="font-semibold text-gray-800 text-base">Expense Chatbot</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors text-lg font-bold">✕</button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent" style={{ background: 'rgba(255,255,255,0.15)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <span
                  className={
                    msg.role === 'user'
                      ? 'bg-blue-500/90 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[75%] shadow-lg'
                      : 'bg-white/90 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-[75%] shadow'
                  }
                  style={{ wordBreak: 'break-word', fontSize: '1rem', lineHeight: '1.5' }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <div className="px-4 py-3 flex gap-2 items-center" style={{ background: 'rgba(255,255,255,0.25)', borderTop: '1px solid rgba(200,200,200,0.18)' }}>
            <input
              className="flex-1 border-none bg-white/70 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your expenses..."
              disabled={loading}
              style={{ minWidth: 0 }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow transition disabled:opacity-60"
              style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
              aria-label="Send"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full w-16 h-16 flex items-center justify-center shadow-2xl border-none transition-all backdrop-blur-lg bg-white/40 hover:bg-white/60"
          aria-label="Open Expense Chatbot"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', border: 'none', padding: 0 }}
        >
          <img
            src="/chatbot.png"
            alt="Chatbot Icon"
            className="w-12 h-12 rounded-full object-cover shadow"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
