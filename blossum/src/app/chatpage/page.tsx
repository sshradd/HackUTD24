'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('Home')

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

        try {
          const response = await fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          // setMessage(data.message); // Display response message from FastAPI
          // setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: 'bot' }]);
        } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Error uploading file');
          setMessages((prevMessages) => [...prevMessages, { text: 'Error uploading file', sender: 'bot' }]);
        }
      }  
        // Ask question if no file is selected
        try {
          const response = await fetch('http://localhost:8000/ask/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: inputValue.trim() }),
          });

          const data = await response.json();
          setAnswer(data.answer); // Display the assistant's answer
          setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: 'bot' }]);
        } catch (error) {
          console.error('Error asking question:', error);
          setMessages((prevMessages) => [...prevMessages, { text: 'Error asking question', sender: 'bot' }]);
        
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTabClick = (tab: string) =>{
    setActiveTab(tab);
  }

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
            className={`p-2 rounded-lg mb-2 w-full ${
              message.sender === 'user' ? 'bg-pistachio text-white self-end text-right' : 'bg-gray-300 text-black self-start text-left'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex items-center border-2 border-gray-300 rounded-lg drop-shadow-lg w-full p-4 fixed bottom-0 left-0 bg-white">
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
    </div>
    </div>
  );
};

export default ChatPage;