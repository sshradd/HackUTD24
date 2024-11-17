"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  // Static data for the profile
  const userData = {
    name: 'Gabrielle Kuruvilla',
    age: 21,
    zipcode: '76092',
    employed: true,
    yearlyIncome: '$20,000',
    financialLiteracyLevel: 'Beginner',
    monthlySpendingLimit: '$1,000',
    hasBanker: false,
    bankReason: 'I prefer managing my finances independently',
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar at the top right */}
      <nav className="flex justify-end space-x-6 p-4 fixed top-2 right-0 w-full">
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

      {/* Profile Content */}
      <div className="min-h-screen flex justify-center items-center py-12 mt-16" style={{ backgroundColor: '#F9F8F1' }}>
        <div className="w-full max-w-2xl p-8 rounded-lg" style={{ backgroundColor: '#F9F8F1' }}>
          <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#655453' }}>Profile</h1>
          
          <div className="space-y-6">
            {/* Name */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Name</h3>
              <p>{userData.name}</p>
            </div>

            {/* Age */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Age</h3>
              <p>{userData.age}</p>
            </div>

            {/* Zipcode */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Zipcode</h3>
              <p>{userData.zipcode}</p>
            </div>

            {/* Employed */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Employed</h3>
              <p>{userData.employed ? 'Yes' : 'No'}</p>
            </div>

            {/* Yearly Income */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Yearly Income</h3>
              <p>{userData.yearlyIncome}</p>
            </div>

            {/* Financial Literacy Level */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Financial Literacy Level</h3>
              <p>{userData.financialLiteracyLevel}</p>
            </div>

            {/* Monthly Spending Limit */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Monthly Spending Limit</h3>
              <p>{userData.monthlySpendingLimit}</p>
            </div>

            {/* Banker Status */}
            <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="font-semibold text-gray-700">Do You Have a Banker?</h3>
              <p>{userData.hasBanker ? 'Yes' : 'No'}</p>
            </div>

            {/* Reason if No Banker */}
            {!userData.hasBanker && (
              <div className="p-6 border rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                <h3 className="font-semibold text-gray-700">Reason</h3>
                <p>{userData.bankReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
