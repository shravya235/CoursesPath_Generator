import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiOutlineRobot } from 'react-icons/ai';

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Gyan AI. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response (replace with real API call)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `You said: "${userMessage.text}". This is a demo response.`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!chatOpen && (
        <button
          aria-label="Chatbot Help"
          className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center text-white text-3xl font-bold animate-blob hover:scale-110 z-50"
          title="Chat with us"
          onClick={toggleChat}
        >
          <AiOutlineRobot />
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-full max-w-xs md:w-80 bg-gray-900/70 backdrop-blur-lg rounded-xl border border-cyan-500 shadow-lg shadow-cyan-700/50 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-600">
            <h3 className="text-cyan-400 font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Gyan AI
            </h3>
            <button
              onClick={toggleChat}
              aria-label="Close Chatbot"
              className="text-cyan-400 hover:text-cyan-600 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Chat Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-sm text-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-gray-700 text-white self-end rounded-br-none'
                    : 'bg-gradient-to-r from-purple-700 to-cyan-700 border border-cyan-400 shadow-md shadow-cyan-600'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t border-cyan-600 p-2">
            <input
              type="text"
              placeholder="Ask about any career path..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-700/70 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white rounded-full p-2 shadow-lg shadow-orange-600 transition-transform hover:scale-110"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
