'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; // Firebase Auth instance
import { db } from '@/app/firebase/config'; // Firestore instance
import { setDoc, doc, collection, addDoc } from 'firebase/firestore'; // Firestore functions

const LogExpense = () => {
  const [amountSpent, setAmountSpent] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Create a new document in the Firestore "expenses" collection
      const expenseDocRef = collection(db, 'expenses');
      await addDoc(expenseDocRef, {
        userID: auth.currentUser.uid,  // The UID of the logged-in user
        amountSpent: amountSpent,      // The expense amount
        category: category,            // The category of the expense
               // Timestamp of when the expense is logged
      });

      // Reset form inputs
      setAmountSpent('');
      setCategory('');

      // Redirect the user to the next page (or dashboard, etc.)
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving expense data to Firestore:', error);
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
            <h1 className="text-6xl font-bold text-wenge mb-8">Log Your Expense</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-8">
            <input
              type="text"
              placeholder="Amount Spent"
              value={amountSpent}
              onChange={(e) => setAmountSpent(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Pets">Pets</option>
              <option value="Investments">Investments</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pistachio text-white py-3 px-72 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogExpense;
