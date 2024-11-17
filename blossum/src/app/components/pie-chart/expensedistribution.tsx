"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseDistributionProps {
  expenses: { category: string; amount: number }[];
}

const ExpenseDistribution: React.FC<ExpenseDistributionProps> = ({ expenses }) => {
  // Calculate total expenditure
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Prepare data for the pie chart
  const data = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        data: expenses.map((expense) => ((expense.amount / total) * 100).toFixed(2)),
        backgroundColor: [
          "#FF6384", // Colors for the pie chart
          "#36A2EB",
          "#FFCE56",
          "#8FA97D",
          "#F7B7BD",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8FA97D",
          "#F7B7BD",
        ],
      },
    ],
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        borderColor: "#655453",
        border: "2px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "90%", height: "90%" }}>
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default ExpenseDistribution;
