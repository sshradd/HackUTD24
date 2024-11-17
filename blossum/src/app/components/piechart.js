'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Prepare data for the pie chart
  const data = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  // Handle form submission to add a new expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && amount) {
      setExpenses((prev) => [...prev, { category, amount: Number(amount) }]);
      setCategory('');
      setAmount('');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h1 className="text-3xl font-bold text-wenge">Expense Tracker</h1>

      {/* Pie Chart */}
      <div className="w-1/6">
        <Pie data={data} />
      </div>

      {/* Input Form */}
      <form className="flex flex-col items-center space-y-4 w-1/2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
          className="border-2 border-gray-300 p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-pistachio text-white px-6 py-2 rounded-lg"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpensePieChart;
