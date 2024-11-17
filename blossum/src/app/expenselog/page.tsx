'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase/config'; // Firebase configuration
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions
import Image from 'next/image';
import Link from 'next/link';

const ExpensesPage = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<any[]>([]);
  const router = useRouter();

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.error('User is not authenticated');
      return;
    }

    if (!category || !amount) {
      alert('Please enter both category and amount.');
      return;
    }

    const newExpense = { category, amount: parseFloat(amount) };
    setExpenses([...expenses, newExpense]);

    try {
      // Save the expense data to Firestore
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Use the UID as the document ID
      await setDoc(userDocRef, { expenses: [...expenses, newExpense] }, { merge: true }); // Merge with existing data

      // Clear input fields
      setCategory('');
      setAmount('');
    } catch (error) {
      console.error('Error saving expense to Firestore:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <div className="bg-white h-screen flex relative items-center gap-2 px-0">
          <div className="flex flex-col">
            <Image src="/tree.png" alt="Expense Tracker" width={800} height={400} />
          </div>
          <div className="flex flex-col ml-52">
            <div className="flex items-center flex-col">
              <h1 className="text-5xl font-bold text-wenge mb-8">Expense Tracker</h1>
              <div className="flex flex-col space-y-3">
                <p className="text-3xl text-wenge">Category</p>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
                />
                <p className="text-3xl text-wenge">Amount (USD)</p>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="py-4 border-2 text-wenge drop-shadow-lg border-gray-300 p-2 rounded-lg"
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-pistachio text-white py-3 px-72 rounded-lg"
                  >
                    Add Expense
                  </button>
                </div>
              </div>
              <h2 className="text-3xl text-wenge mt-8">Logged Expenses</h2>
              {expenses.length === 0 ? (
                <p className="text-xl text-wenge">No expenses logged yet.</p>
              ) : (
                <ul>
                  {expenses.map((expense, index) => (
                    <li key={index} className="text-xl text-wenge">
                      {expense.category}: ${expense.amount.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpensesPage;
