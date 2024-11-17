'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/app/firebase/config'; // Firebase Auth instance
import { db } from '@/app/firebase/config'; // Firestore instance
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore'; // Firestore query functions

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [expenses, setExpenses] = useState<DocumentData[]>([]); // Explicitly typing expenses as DocumentData[]
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [savingsRecommendations, setSavingsRecommendations] = useState<string[]>([]); // Store recommendations as an array

  // Handle tab changes
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Fetch expenses associated with the logged-in user
  const fetchExpenses = async (userId: string) => {
    setLoading(true);

    try {
      // Create a query to fetch expenses based on the logged-in user's uid
      const expenseQuery = query(
        collection(db, 'expenses'),
        where('userID', '==', userId)
      );

      const querySnapshot = await getDocs(expenseQuery);
      const fetchedExpenses = querySnapshot.docs.map((doc) => doc.data());

      // Log the fetched expenses to the console for debugging
      console.log('Fetched expenses:', fetchedExpenses);

      // Update state with fetched expenses
      setExpenses(fetchedExpenses);
      setLoading(false);

      // Calculate savings recommendation once expenses are fetched
      calculateSavings(fetchedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  // Calculate savings needed based on monthly income and goal
  const calculateSavings = (expenses: DocumentData[]) => {
    const monthlyIncome = 500;
    const savingsGoal = 5000; // Target savings goal
    const monthsLeft = 12; // Months left in the year
    const monthlySavingTarget = savingsGoal / monthsLeft;

    // Calculate the total current expenses and group them by category
    const categoryExpenses: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      const category = expense.category || 'Uncategorized';
      const amountSpent = parseFloat(expense.amountSpent);
      categoryExpenses[category] = (categoryExpenses[category] || 0) + amountSpent;
    });

    const totalExpenses = Object.values(categoryExpenses).reduce((acc, curr) => acc + curr, 0);
    const currentSavingPotential = monthlyIncome - totalExpenses;
    const additionalSavingsRequired = monthlySavingTarget - currentSavingPotential;

    let recommendations: string[] = [];

    if (additionalSavingsRequired > 0) {
      // Recommend cutting expenses from each category
      for (const [category, amount] of Object.entries(categoryExpenses)) {
        const cutAmount = Math.min(amount, additionalSavingsRequired);
        recommendations.push(`Cut ${cutAmount.toFixed(2)} from ${category}.`);
        if (cutAmount === additionalSavingsRequired) break; // Stop once we meet the savings goal
      }
      setSavingsRecommendations(recommendations);
    } else {
      setSavingsRecommendations(['You are already on track to meet your savings goal!']);
    }
  };

  // Use useEffect to fetch expenses when the component is mounted
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in, fetch expenses
        fetchExpenses(user.uid);
      } else {
        // User is not logged in, redirect to sign-in page
        window.location.href = '/signin'; // Adjust the path to your sign-in page
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    console.log('Expenses state:', expenses); // Debugging: Check the state of expenses
  }, [expenses]);

  // Calculate height for the boxes based on the number of items (expenses or recommendations)
  const calculateBoxHeight = (items: string[]) => {
    const baseHeight = 250; // Base height for the box
    const itemHeight = 50; // Height for each item (expense or recommendation)
    const maxHeight = 600; // Maximum height for the box
    
    const newHeight = Math.min(baseHeight + (items.length * itemHeight), maxHeight);
    return `${newHeight}px`;
  };

  return (
    <div className="text-black">
      {/* Navigation */}
      <div className="flex justify-end items-center w-full p-4 pr-12" style={{ backgroundColor: '#F9F8F1' }}>
        <nav className="flex space-x-6">
          <div className={`cursor-pointer ${activeTab === 'Home' ? 'font-bold underline' : ''}`} style={{ color: '#655453' }} onClick={() => handleTabClick('Home')}>
            Home
          </div>
          <div className={`cursor-pointer ${activeTab === 'BlossomBot' ? 'font-bold underline' : ''}`} style={{ color: '#655453' }} onClick={() => handleTabClick('BlossomBot')}>
            BlossomBot
          </div>
          <div className={`cursor-pointer ${activeTab === 'Profile' ? 'font-bold underline' : ''}`} style={{ color: '#655453' }} onClick={() => handleTabClick('Profile')}>
            Profile
          </div>
        </nav>
      </div>

      {/* Dashboard Content */}
      <div className="flex justify-between h-screen p-6 space-x-6">
        <div className="flex flex-col items-start space-y-6 w-1/2">
          {/* Left Column */}
          <div className="rounded-2xl border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#655453', width: '100%', height: '600px' }}></div>

          <Link href="/dashboard/logexpense">
            <button className="rounded-2xl border-2 p-2 text-3xl font-semibold" style={{ backgroundColor: '#655453', color: '#F9F8F1', borderColor: '#655453', width: '100%', height: '100px' }}>
              Log Expense
            </button>
          </Link>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start space-y-6 w-1/2" style={{ color: '#F9F8F1' }}>
          <div className="rounded-2xl border-2 p-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#655453', width: '100%', height: calculateBoxHeight(savingsRecommendations) }}>
            {/* Recommendations */}
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <h3 className="text-xl font-semibold" style={{ color: '#655453' }}>Savings Recommendations</h3>
              </div>
              <span className="text-xl font-bold cursor-pointer" style={{ color: '#655453' }}>→</span>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              {savingsRecommendations.map((recommendation, index) => (
                <div key={index} className="rounded-lg h-12 w-full shadow-lg p-4" style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                  <span className="text-black">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Logged Expenses */}
          <div className="rounded-2xl border-2 p-6 ml-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#655453', width: '100%', height: calculateBoxHeight(expenses) }}>
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <h3 className="text-xl font-semibold" style={{ color: '#655453' }}>Recently Logged Expenses</h3>
              </div>
              <span className="text-xl font-bold cursor-pointer" style={{ color: '#655453' }}>→</span>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                expenses.map((expense, index) => (
                  <div key={index} className="rounded-lg h-12 w-full shadow-lg" style={{ backgroundColor: '#F9F8F1', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <span className="text-black">
                      <strong>{expense.category}:</strong> ${expense.amountSpent}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
