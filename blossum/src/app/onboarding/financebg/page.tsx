'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase/config'; // Firebase configuration
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions
import Image from 'next/image';
import Link from 'next/link';

const FinanceBG = () => {
  const [employment, setEmployment] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [financialLiteracy, setFinancialLiteracy] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Save financial data to Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Use the UID as the document ID
      await setDoc(userDocRef, {
        employment,
        yearlyIncome,
        financialLiteracy,
      }, { merge: true }); // Merge with existing data

      // Redirect to the next page
      router.push('/onboarding/expenses');
    } catch (error) {
      console.error('Error saving financial data to Firestore:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white h-screen flex relative items-center gap-2 px-0">
          <div className="flex flex-col">
            <Image src="/tree.png" alt="Welcome" width={800} height={400} />
          </div>
          <div className="flex flex-col ml-52">
            <div className="flex items-center flex-col">
              <h1 className="text-5xl font-bold text-wenge mb-8">Financial Background</h1>
              <div className="flex flex-col space-y-3">
                <p className="text-3xl text-wenge">Are you employed?</p>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="employment"
                        value="yes"
                        checked={employment === 'yes'}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="p-2 rounded-lg"
                      />
                      <span className="text-wenge ml-2 text-2xl">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="employment"
                        value="no"
                        checked={employment === 'no'}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="p-2 rounded-lg"
                      />
                      <span className="ml-2 text-wenge text-2xl">No</span>
                    </label>
                  </div>
                </div>
                <p className=" text-wenge text-3xl">Yearly Income</p>
                <input
                  type="text"
                  placeholder="USD Value"
                  value={yearlyIncome}
                  onChange={(e) => setYearlyIncome(e.target.value)}
                  className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
                />
                <p className="text-3xl text-wenge">Financial Literacy Level</p>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="financial-literacy"
                        value="beginner"
                        checked={financialLiteracy === 'beginner'}
                        onChange={(e) => setFinancialLiteracy(e.target.value)}
                        className="p-2 rounded-lg"
                      />
                      <span className="text-wenge ml-2 text-2xl">Beginner</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="financial-literacy"
                        value="intermediate"
                        checked={financialLiteracy === 'intermediate'}
                        onChange={(e) => setFinancialLiteracy(e.target.value)}
                        className="p-2 rounded-lg"
                      />
                      <span className="ml-2 text-wenge text-2xl">Intermediate</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="financial-literacy"
                        value="advanced"
                        checked={financialLiteracy === 'advanced'}
                        onChange={(e) => setFinancialLiteracy(e.target.value)}
                        className="p-2 rounded-lg"
                      />
                      <span className="ml-2 text-wenge text-2xl">Advanced</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-pistachio text-white py-3 px-72 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinanceBG;
