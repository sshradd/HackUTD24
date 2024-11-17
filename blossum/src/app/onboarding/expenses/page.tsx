'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase/config'; // Firebase Auth and Firestore instances
import { setDoc, doc, collection, addDoc } from 'firebase/firestore'; // Firestore functions

const ExpensesForm = () => {
  const [expenseCategory, setExpenseCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Create a new expense document in the "expenses" collection
      const expensesCollectionRef = collection(db, 'expenses'); // 'expenses' collection
      await addDoc(expensesCollectionRef, {
        userId: auth.currentUser.uid, // Store user ID for reference
        expenseCategory,
        amount,
        expenseDate,
        timestamp: new Date(), // Optional: timestamp for when the expense is added
      });

      // Reset form inputs
      setExpenseCategory('');
      setAmount('');
      setExpenseDate('');

      // Redirect the user to the next page
      router.push('/onboarding/nextPage'); // Replace with the actual next page path
    } catch (error) {
      console.error('Error saving expense data to Firestore:', error);
    }
  };

  return (
    <div>
      <div className="bg-white h-screen flex relative items-center">
        <div className="flex flex-col">
          <img src="/tree.png" alt="Expenses" width={900} height={400} />
        </div>
        <div className="flex flex-col ml-52 space-y-8">
          <div className="flex items-center flex-col">
            <h1 className="text-6xl font-bold text-wenge mb-8">Add Your Expenses</h1>
            <p className="text-3xl text-wenge">Tell us about your expenses.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-8">
            <input
              type="text"
              placeholder="Expense Category"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
            />
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

export default ExpensesForm;
