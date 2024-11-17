"use client";

import React, { useState } from "react";
import Link from "next/link";
import ExpenseDistribution from "../components/pie-chart/expensedistribution";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [expenses, setExpenses] = useState([
    { category: "Groceries", amount: 50 },
    { category: "Transportation", amount: 20 },
    { category: "Dining", amount: 35 },
  ]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-black">
      <div
        className="flex justify-end items-center w-full p-4 pr-12"
        style={{ backgroundColor: "#F9F8F1" }}
      >
        <nav className="flex space-x-6 right-0">
          {/* Navigation Tabs */}
          <Link href="/dashboard">
            <div
              className={`cursor-pointer ${
                activeTab === "Home" ? "font-bold underline" : ""
              }`}
              style={{ color: "#655453" }}
              onClick={() => handleTabClick("Home")}
            >
              Home
            </div>
          </Link>
          <Link href="/chatpage">
            <div
              className={`cursor-pointer ${
                activeTab === "BlossomBot" ? "font-bold underline" : ""
              }`}
              style={{ color: "#655453" }}
              onClick={() => handleTabClick("BlossomBot")}
            >
              BlossomBot
            </div>
          </Link>
          <Link href="/profile">
            <div
              className={`cursor-pointer ${
                activeTab === "Profile" ? "font-bold underline" : ""
              }`}
              style={{ color: "#655453" }}
              onClick={() => handleTabClick("Profile")}
            >
              Profile
            </div>
          </Link>
        </nav>
      </div>

      <div className="flex justify-between h-screen p-6 space-x-6">
        {/* Left Column */}
        <div className="flex flex-col items-start space-y-6 w-1/2">
          <div
            className="rounded-2xl border-2"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#655453",
              width: "100%",
              height: "600px",
            }}
          >
            <ExpenseDistribution expenses={expenses} />
          </div>
          {/* Savings Goal Input */}
          <div className="flex space-x-4">
            <input
              type="text"
              className="rounded-2xl border-2 p-2 text-xl w-64"
              placeholder="Yearly Saving Goal"
              style={{
                borderColor: "#655453",
                backgroundColor: "#F9F8F1",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
            />
            <Link href="/dashboard/logexpense">
              <button
                className={`px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-[#F7B7BD] via-[#8FA97D] to-[#F7B7BD] rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 ${
                  savingsGoal ? "animate-pulse" : ""
                }`}
              >
                Generate Savings Recommendations
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="flex flex-col items-start space-y-6 w-1/2"
          style={{ color: "#F9F8F1" }}
        >
          {/* Savings Recommendations */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#655453",
              width: "100%",
              height: "200px",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <h3 className="text-xl font-semibold" style={{ color: "#655453" }}>
                  Savings Recommendations
                </h3>
              </div>
              <span className="text-xl font-bold cursor-pointer" style={{ color: "#655453" }}>
                →
              </span>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <div
                className="rounded-lg h-10 w-full shadow-lg"
                style={{
                  backgroundColor: "#F9F8F1",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              ></div>
              <div
                className="rounded-lg h-10 w-full shadow-lg"
                style={{
                  backgroundColor: "#F9F8F1",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              ></div>
            </div>
          </div>
          {/* Recently Logged Transactions */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#655453",
              width: "100%",
              height: "500px",
            }}
          >
            <div className="flex justify-center mb-4">
              <h3 className="text-xl font-semibold" style={{ color: "#655453" }}>
                Recently Logged
              </h3>
            </div>
            <div className="flex flex-col space-y-5">
              {expenses.map((expense, index) => (
                <div
                  key={index}
                  className="rounded-lg h-12 w-full shadow-lg flex items-center px-4"
                  style={{
                    backgroundColor: "#F9F8F1",
                    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span className="text-black">{`${expense.category}: $${expense.amount}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
