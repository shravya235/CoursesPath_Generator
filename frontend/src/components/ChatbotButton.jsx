import React from 'react';

const ChatbotButton = () => {
  return (
    <button
      aria-label="Chatbot Help"
      className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center text-white text-3xl font-bold animate-blob hover:scale-110"
      title="Chat with us"
    >
      ?
    </button>
  );
};

export default ChatbotButton;
