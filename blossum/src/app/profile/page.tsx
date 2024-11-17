"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch request - replace with your actual API/database call
    const fetchData = async () => {
      try {
        // Example API call
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Failed to load profile data.</div>;
  }

  return (
    <div>
      <div className="bg-white h-screen flex flex-col items-center space-y-12 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <Image src="/profile-icon.png" alt="Profile Icon" width={120} height={120} />
          <h1 className="text-4xl font-bold text-wenge mt-4">Your Profile</h1>
        </div>

        {/* Profile Information */}
        <div className="w-3/4 bg-pistachio rounded-xl p-8 shadow-lg text-white space-y-6">
          {Object.entries(userData).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center border-b-2 border-white pb-4"
            >
              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span>{String(value) || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
