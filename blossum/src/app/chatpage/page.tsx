'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [language, setLanguage] = useState('en'); // Default language is English

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log('ChatPage component rendered'); // Log when the component renders
  }, []);

  const handleSend = async () => {
    console.log('Send button clicked'); // Log when the button is clicked
    console.log('Input value:', inputValue.trim()); // Log the trimmed input value
    if (inputValue.trim() !== '') {
      console.log('Adding message:', inputValue); // Log the input value
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'user' }]); // Add new message to the list
      setInputValue(''); // Clear the input field

      // Upload file if selected
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language); // Append the selected language

        try {
          const response = await fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          setMessage(data.message); // Display response message from FastAPI
          setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: 'bot' }]);
        } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Error uploading file');
          setMessages((prevMessages) => [...prevMessages, { text: 'Error uploading file', sender: 'bot' }]);
        }
      } else {
        // Ask question if no file is selected
        try {
          const response = await fetch('http://localhost:8000/ask/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: inputValue.trim(), language }), // Include the selected language
          });

          const data = await response.json();
          setAnswer(data.answer); // Display the assistant's answer
          setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: 'bot' }]);
        } catch (error) {
          console.error('Error asking question:', error);
          setMessages((prevMessages) => [...prevMessages, { text: 'Error asking question', sender: 'bot' }]);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-screen text-wenge">
      <div className="flex justify-end items-center w-full p-4 pr-12" style={{ backgroundColor: '#F9F8F1' }}>
        <nav className="flex space-x-6 text-2xl">
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
      </div>
      <div className="flex-grow p-4 overflow-y-auto" style={{ backgroundColor: '#F9F8F1' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-5 rounded-full mb-2 max-w-md ${
              message.sender === 'user' ? 'bg-pistachio border-wenge border-2 text-xl text-white self-end text-left ml-auto mt-14 mr-32 rounded-full' : 
              'bg-eggshell border-wenge border-2 text-xl text-wenge self-start text-left mr-auto mt-5 ml-36'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex text-2xl items-center justify-center border-2 border-wenge rounded-lg drop-shadow-lg w-5/6 p-4 fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white">
        <input
          type="file"
          className="py-2 px-2 text-wenge rounded-l-lg"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Chat with Blossom"
          className="py-2 px-2 flex-grow text-wenge"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-pistachio text-white py-2 px-4 rounded-r-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ar">Arabic</option>
          <option value="hi">Hindi</option>
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>
  );
};

export default ChatPage;