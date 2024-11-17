'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LogExpense = ({ updateExpenses }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category) {
      updateExpenses({ category, amount: parseFloat(amount) }); // Send new expense to parent state
      setAmount('');
      setCategory('');
      router.push('/dashboard'); // Redirect to the dashboard after submission
    }
  };

  return (
    <div className="h-screen bg-white">
      <div className="flex items-center justify-between gap-2 px-0">
        <div className="flex flex-col">
          <Image src="/tree.png" alt="Welcome" width={800} height={400} />
        </div>
        <div className="flex flex-col p-6">
          {/* Expense Form */}
          <h1 className="text-5xl font-bold text-wenge mb-6">Your Expenses</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <p className="text-2xl text-wenge">Amount Spent</p>
            <input
              type="number"
              placeholder="USD Value"
              className="border-2 border-gray-300 p-2 rounded-lg text-wenge drop-shadow-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-2xl text-wenge">Category</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Housing',
                'Transportation',
                'Food',
                'Healthcare',
                'Entertainment',
                'Education',
                'Personal Care',
                'Pets',
                'Investments',
                'Other',
              ].map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    className="p-2 rounded-lg"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={category === cat}
                  />
                  <span className="ml-2 text-wenge">{cat}</span>
                </label>
              ))}
            </div>
            <button type="submit" className="bg-pistachio text-white p-2 rounded-lg">
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogExpense;
