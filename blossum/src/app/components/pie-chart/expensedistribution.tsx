import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface Expense {
  category: string;
  amount: number;
}

interface ExpenseDistributionProps {
  expenses: Expense[];
}

const ExpenseDistribution = ({ expenses = [] }: ExpenseDistributionProps) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Handle case for no expenses
  if (expenses.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Expense Breakdown</h2>
        <p>No expenses logged yet.</p>
      </div>
    );
  }

  // Define chart data
  const chartData = {
    labels: expenses.map((exp) => exp.category),
    datasets: [
      {
        label: "Expense Distribution",
        data: expenses.map((exp) => (exp.amount / totalExpenses) * 100),
        backgroundColor: ["#F7B7BD", "#8FA97D", "#F7D8BD", "#B0E5E7", "#F2A7D0"],
        borderColor: ["#F7B7BD", "#8FA97D", "#F7D8BD", "#B0E5E7", "#F2A7D0"],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options to center the label and legend
  const options = {
    plugins: {
      legend: {
        position: "top" as const,  // Place legend at the top
        align: "center" as const, // Center the legend
        labels: {
          boxWidth: 12, // Adjust the size of the color boxes
          padding: 10, // Space between the legend items
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.label + ": " + context.raw.toFixed(2) + "%"; 
          },
        },
      },
    },
    responsive: true,
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Expense Breakdown</h2> 
      
      {/* Centering Pie Chart and Legend */}
      <div className="flex flex-col items-center justify-center p-4 w-3/4 mx-auto">
        <Pie data={chartData} options={options} width={300} height={300} />
      </div>
    </div>
  );
};

export default ExpenseDistribution;
