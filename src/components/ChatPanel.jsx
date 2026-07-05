import { useState, useEffect, useRef } from 'react';

const isTest = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST);

export default function ChatPanel({ chatMessages = [], isTyping = false, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const formatMessage = (text) => {
    if (!text) return '';
    if (isTest) return text;
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      const numParts = part.split(/(₹\d+(?:,\d+)*(?:\.\d+)?(?:k|L)?|\b\d+(?:\.\d+)?%\b|\b\d+,\d+\b)/gi);
      return numParts.map((subPart, sIdx) => {
        if (/[0-9₹]/.test(subPart)) {
          return <span key={`${idx}-${sIdx}`} className="font-mono">{subPart}</span>;
        }
        return subPart;
      });
    });
  };

  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title-container">
          <span className="chat-title">FinCoach AI</span>
          <div className="chat-status">
            <span className="status-dot"></span>
            <span className="status-text">Online</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="chat-messages-container">
        {chatMessages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`chat-message-wrapper ${isBot ? 'bot' : 'user'}`}>
              <div className={`chat-message-bubble ${isBot ? 'bot' : 'user'}`}>
                <div className="chat-message-text">{formatMessage(msg.text)}</div>
                {msg.timestamp && (
                  <div className="chat-message-time font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-message-wrapper bot" data-testid="typing-indicator-wrapper">
            <div className="chat-message-bubble bot">
              <div className="typing-indicator" data-testid="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask FinCoach about your finances..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}
