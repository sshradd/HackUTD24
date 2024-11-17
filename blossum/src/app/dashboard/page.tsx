"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  
    const [activeTab, setActiveTab] = useState('Home');
    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
    };
  
  return (
    <div className="text-black">
      <div className="flex justify-end items-center w-full p-4 pr-12"
        style={{ backgroundColor: '#F9F8F1' }}
      > 
        <nav className="flex space-x-6">
          {/* Home Tab */}
          <div
            className={`cursor-pointer ${activeTab === 'Home' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('Home')}
          >
            Home
          </div>

          {/* BlossomBot Tab */}
          <div
            className={`cursor-pointer ${activeTab === 'BlossomBot' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('BlossomBot')}
          >
            BlossomBot
          </div>

          {/* Profile Tab */}
          <div
            className={`cursor-pointer ${activeTab === 'Profile' ? 'font-bold underline' : ''}`}
            style={{ color: '#655453' }}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </div>
        </nav>
      </div>

      <div className="flex justify-between h-screen p-6 space-x-6">
        
        {/* Left Column */}
        <div className="flex flex-col items-start space-y-6 w-1/2">
          <div className="rounded-2xl border-2"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#655453', width: '100%', height: '600px' }}>
            {/* Content of first box */}
          </div>

            {/* Content of second box */}
            <Link href="/dashboard/logexpense">
              <button className="rounded-2xl border-2 p-2 text-3xl font-semibold"
              style={{ backgroundColor: '#655453', color: '#F9F8F1', borderColor: '#655453', width: '100%', height: '100px'}}>
              Log Expense
              </button>
            </Link>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start space-y-6 w-1/2"
        style={{ color: '#F9F8F1'}}>
          {/* Savings Recommendations -- still needs to be centered */}
          <div className="rounded-2xl border-2 p-6"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#655453', width: '100%', height: '200px' }}>
            <div className="flex justify-between items-center">
                <div className='flex justify-center'>
                <h3 className="text-xl font-semibold"
                style={{ color: '#655453'}}
                >Savings Recommendations</h3>
                </div>
              <span className="text-xl font-bold cursor-pointer"
              style={{ color: '#655453'}}>→</span>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <div className="rounded-lg h-10 w-full shadow-lg"
              style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
              ></div>
              <div className="rounded-lg h-10 w-full shadow-lg"
              style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
              ></div>
            </div>
          </div>

        {/* Recently Logged */}
        <div className="rounded-2xl border-2 p-6"
          style={{ backgroundColor: '#FFFFFF', color: '#F9F8F1', borderColor: '#655453', width: '100%', height: '500px' }}>
            <div className="flex justify-center">
            <h3 className="text-xl font-semibold"
              style={{ color: '#655453'}}
            >Recently Logged</h3>
            </div>
          <div className="flex flex-col space-y-5 mt-7">
            <div className="rounded-lg h-12 w-full shadow-lg"
            style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
            ></div>
            <div className="rounded-lg h-12 w-full shadow-lg"
            style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
            ></div>
            <div className="rounded-lg h-12 w-full shadow-lg"
            style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
            ></div>
            <div className="rounded-lg h-12 w-full shadow-lg"
            style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
            ></div>
            <div className="rounded-lg h-12 w-full shadow-lg"
            style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}}
            ></div>
          </div>
            <div className="flex justify-center">
              <button className="mt-4 w-1/4 py-3 rounded-3xl font-semibold"
              style={{ backgroundColor: '#A2C19A', color: '#655453'}}>
              See All
              </button>
            </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Dashboard;
