'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Image from 'next/image';
import Link from 'next/link';

ChartJS.register(ArcElement, Tooltip, Legend);

const LogExpense = () => {
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Generate chart data
  const chartData = {
    labels: [...new Set(expenses.map((expense) => expense.category))],
    datasets: [
      {
        label: 'Expenses',
        data: [...new Set(expenses.map((expense) =>
          expenses
            .filter((e) => e.category === expense.category)
            .reduce((sum, e) => sum + e.amount, 0)
        ))],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8DD0A9', '#FF9F40',
          '#B1B9C4', '#FF7373', '#73D2DE', '#C39BD3', '#5499C7'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && category) {
      setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
      setAmount('');
      setCategory('');
    }
  };

  return (
    <div className="h-screen bg-white">
      {/* Page Layout */}
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

      {/* Pie Chart */}
      <div className="mt-10 p-4">
        <h2 className="text-4xl font-bold text-wenge mb-4">Expense Distribution</h2>
        {expenses.length > 0 ? (
          <Pie data={chartData} />
        ) : (
          <p className="text-xl text-wenge">No expenses logged yet.</p>
        )}
      </div>

      {/* Navigation Link */}
      <div className="p-6">
        <Link href="/dashboard">
          <button className="bg-pistachio text-white p-3 rounded-lg">Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default LogExpense;
