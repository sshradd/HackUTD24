'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; // Firebase Auth instance
import { db } from '@/app/firebase/config'; // Firestore instance
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions

const Welcome = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [zipcode, setZipcode] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Create a new document in the Firestore "users" collection
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Using the user's UID from Firebase Auth as the document ID
      await setDoc(userDocRef, {
        fullName,
        age,
        zipcode,
      });

      // Reset form inputs
      setFullName('');
      setAge('');
      setZipcode('');

      // Redirect the user to the next page
      router.push('/onboarding/financebg');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };

  return (
    <div>
      <div className="bg-white h-screen flex relative items-center">
        <div className="flex flex-col">
          <img src="/tree.png" alt="Welcome" width={900} height={400} />
        </div>
        <div className="flex flex-col ml-52 space-y-8">
          <div className="flex items-center flex-col">
            <h1 className="text-6xl font-bold text-wenge mb-8">Welcome to Blossom</h1>
            <p className="text-3xl text-wenge">Tell us a bit about you.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-8">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Area Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pistachio text-white py-3 px-72 rounded-lg"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
