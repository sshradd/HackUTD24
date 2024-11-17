'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    console.log('ChatPage component rendered'); // Log when the component renders
  }, []);

  const handleSend = () => {
    console.log('Send button clicked'); // Log when the button is clicked
    console.log('Input value:', inputValue.trim()); // Log the trimmed input value
    if (inputValue.trim() !== '') {
      console.log('Adding message:', inputValue); // Log the input value
      setMessages((prevMessages) => [...prevMessages, inputValue]); // Add new message to the list
      setInputValue(''); // Clear the input field

      // Add automatic response after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, 'Sorry, not connected to chatbot']);
      }, 1000); // 1 second delay
    }
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (

    <div>
      {/* Top Navigation */}
      <nav className="flex space-x-6 justify-end p-4">
        {/* Home Tab */}
        <Link href="/dashboard">
          <div
            className={`cursor-pointer ${activeTab === 'Home' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('Home')}
          >
            Home
          </div>
        </Link>

        {/* BlossomBot Tab */}
        <Link href="/chatpage">
          <div
            className={`cursor-pointer ${activeTab === 'BlossomBot' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('BlossomBot')}
          >
            BlossomBot
          </div>
        </Link>

        {/* Profile Tab */}
        <Link href="/profile">
          <div
            className={`cursor-pointer ${activeTab === 'Profile' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </div>
        </Link>
      </nav>

    <div className="flex flex-col h-screen text-wenge">
      <div className="flex-grow p-4 overflow-y-auto"
        style={{backgroundColor: '#F9F8F1'}}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-7 rounded-lg mb-8  ${
              index % 2 === 0 ? 'bg-pistachio text-white' : 'bg-gray-300 text-black justify-end'
            }`}
          >
            {message}
          </div>
        ))}
      </div>
      <div className="flex items-center border-2 border-gray-300 rounded-lg drop-shadow-lg w-full p-4 fixed bottom-0 left-0 bg-white">
        <input
          type="file"
          className="py-2 px-2 text-wenge rounded-l-lg"
        />
        <input
          type="text"
          placeholder="Chat with Blossom"
          className="py-2 px-2 flex-grow text-wenge"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-pistachio text-white py-2 px-6 rounded-lg justify-end"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChatPage;