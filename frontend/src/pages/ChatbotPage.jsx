import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import Navbar from '../components/Navbar';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            if (response.ok) {
                const botMessage = { text: data.response, sender: 'bot' };
                setMessages(prev => [...prev, botMessage]);
            } else {
                const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="bg-light-bg dark:bg-[#0a0f23] h-screen text-light-text dark:text-gray-100 relative overflow-x-hidden font-sans pt-20 md:pt-24 flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-start p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="text-left">
                        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                            GYAN AI
                        </h1>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.sender === 'bot' && (
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <FiMessageSquare className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${message.sender === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-br-md'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-bl-md border border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                {message.sender === 'bot' ? (
                                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{children}</h3>,
                                                strong: ({ children }) => <strong className="text-purple-600 dark:text-purple-400 font-semibold">{children}</strong>,
                                                code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono">{children}</code>,
                                                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                                li: ({ children }) => <li className="ml-4 leading-relaxed">{children}</li>,
                                            }}
                                        >
                                            {message.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                )}
                            </div>
                            {message.sender === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <FiUser className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <FiMessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-md shadow-lg border border-gray-200 dark:border-gray-600">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
