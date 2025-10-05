import { useState } from 'react';

const API_URL = 'http://localhost:8000/chatbot';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;
    setIsLoading(true);
    setMessages([...messages, { role: 'user', content: question }]);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setMessages(msgs => [...msgs, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    }
    setInput('');
    setIsLoading(false);
  };

  return (
    <div>
      {/* Floating circular icon */}
      {!open && (
        <button
          aria-label="Open CapreCapital Chatbot"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 60%, #0ea5e9 100%)',
            boxShadow: '0 4px 16px rgba(56,189,248,0.15)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#fff" />
            <path d="M8 10h8M8 14h5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Chatbot window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1001,
            width: '100%',
            maxWidth: 370,
            height: 480,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(56,189,248,0.18)',
            border: '1px solid #e0e7ef',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '18px 20px 12px 20px',
            background: 'linear-gradient(90deg, #38bdf8 60%, #0ea5e9 100%)',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            color: '#fff',
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>CapreCapital Chatbot</span>
            <button
              aria-label="Close Chatbot"
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer',
                marginLeft: 8
              }}
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px 16px 0 16px',
            overflowY: 'auto',
            background: '#f8fafc'
          }}>
            {messages.length === 0 && (
              <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: 32, fontSize: 15 }}>
                Ask about CapreCapital, finance, or AI...
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                textAlign: msg.role === 'user' ? 'right' : 'left',
                margin: '8px 0'
              }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.role === 'user' ? '#e0f2fe' : '#f3f4f6',
                  color: '#222',
                  borderRadius: 8,
                  padding: '8px 12px',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                  fontSize: 15
                }}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #e0e7ef',
            background: '#fff',
            display: 'flex',
            gap: 8
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: 15,
                background: '#f1f5f9'
              }}
              disabled={isLoading}
              placeholder="Type your question..."
              onKeyDown={e => {
                if (e.key === 'Enter' && input.trim() && !isLoading) handleSend();
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '0 18px',
                borderRadius: 8,
                background: '#38bdf8',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
                fontSize: 15,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
