import React, { useState, useRef, useEffect } from 'react';

const ChatbotSidebar = ({ expenses }: { expenses: any[] }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI Assistant. Ask me anything about your expenses or how to save money.' },
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        style={{ marginTop: 8 }}
      >
        <img src="/chatbot.png" alt="AI Assistant" className="w-6 h-6 rounded-full object-cover" />
        <span className="font-medium text-blue-700">AI Assistant</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[500px] flex flex-col animate-fade-in relative">
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <div className="flex items-center gap-2">
                <img src="/chatbot.png" alt="AI Assistant" className="w-8 h-8 rounded-full object-cover" />
                <span className="font-semibold text-gray-800 text-base">AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors text-lg font-bold">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <span
                    className={
                      msg.role === 'user'
                        ? 'bg-blue-500/90 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[75%] shadow-lg'
                        : 'bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-[75%] shadow'
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
            <div className="px-4 py-3 flex gap-2 items-center border-t">
              <input
                className="flex-1 border bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow"
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
        </div>
      )}
    </>
  );
};

export default ChatbotSidebar;
