
// // src/components/Charts.js
// import React from 'react';
// import '../styles/Charts.css';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

// const Charts = ({ breakdownData, income, expense }) => {
//   // Prepare Pie Chart Data
//   const pieData = Object.entries(breakdownData).map(([key, value], i) => ({
//     id: i,
//     value: Math.abs(value),
//     label: key,
//   }));

//   const valueFormatter = (value) => `₹${value}`;

//   // Bar chart data
//   const barCategories = ['Income', 'Expense'];
//   const barSeries = [
//     {
//       data: [income],
//       label: 'Income',
//     },
//     {
//       data: [expense],
//       label: 'Expense',
//     },
//   ];

//   // Line chart data (simulate weekly trend)
//   const lineXAxis = Object.keys(breakdownData).map((_, i) => `Week ${i + 1}`);
//   const lineSeries = [
//     {
//       data: Object.values(breakdownData).map((val) => Math.abs(val)),
//       label: 'Expense',
//     },
//   ];

//   return (
//     <div className="charts-container">
//       <h3>Analytics</h3>

//       <div className="chart-box">
//         <h4>Expense Breakdown (Pie Chart)</h4>
//         <PieChart
//           series={[
//             {
//               data: pieData,
//               highlightScope: { fade: 'global', highlight: 'item' },
//               faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
//               valueFormatter,
//             },
//           ]}
//           height={250}
//           width={350}
//         />
//       </div>

//       <div className="chart-box">
//         <h4>Monthly Income vs Expense (Bar Chart)</h4>
//         <BarChart
//           xAxis={[{ scaleType: 'band', data: ['This Month'] }]}
//           series={barSeries}
//           height={300}
//           width={400}
//         />
//       </div>

//       <div className="chart-box">
//         <h4>Expense Trend (Line Chart)</h4>
//         <LineChart
//           xAxis={[{ scaleType: 'point', data: lineXAxis }]}
//           series={lineSeries}
//           height={300}
//           width={400}
//         />
//       </div>
//     </div>
//   );
// };

// export default Charts;



// import React from 'react';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
// import '../styles/Charts.css';

// // Register all ChartJS components
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement
// );

// const Charts = ({ breakdownData, income, expense }) => {
//   // 1. Income vs Expense Pie Chart
//   const pieData = {
//     labels: ['Income', 'Expense'],
//     datasets: [{
//       data: [income, expense],
//       backgroundColor: ['#4CAF50', '#F44336'],
//       hoverBackgroundColor: ['#66BB6A', '#EF5350'],
//     }],
//   };

//   // 2. Category Breakdown Bar Chart
//   const categories = Object.keys(breakdownData);
//   const amounts = Object.values(breakdownData);

//   const incomeCategories = categories.filter(cat => breakdownData[cat] > 0);
//   const expenseCategories = categories.filter(cat => breakdownData[cat] < 0);

//   const categoryData = {
//     labels: categories,
//     datasets: [{
//       label: 'Amount',
//       data: amounts.map(Math.abs),
//       backgroundColor: amounts.map(amount => amount > 0 ? '#4CAF50' : '#F44336'),
//     }],
//   };

//   // 3. Monthly Trend Line Chart (Mock data - replace with actual API data)
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
//   const monthlyIncome = [3000, 2800, 3200, 4000, 3500, 3800];
//   const monthlyExpense = [2200, 2400, 2600, 2800, 2500, 2700];

//   const trendData = {
//     labels: months,
//     datasets: [
//       {
//         label: 'Income',
//         data: monthlyIncome,
//         borderColor: '#4CAF50',
//         backgroundColor: 'rgba(76, 175, 80, 0.1)',
//         tension: 0.3,
//         fill: true
//       },
//       {
//         label: 'Expense',
//         data: monthlyExpense,
//         borderColor: '#F44336',
//         backgroundColor: 'rgba(244, 67, 54, 0.1)',
//         tension: 0.3,
//         fill: true
//       }
//     ]
//   };

//   // 4. Savings vs Expenses Doughnut Chart
//   const savings = income - expense;
//   const savingsData = {
//     labels: ['Savings', 'Expenses'],
//     datasets: [{
//       data: [savings, expense],
//       backgroundColor: ['#2196F3', '#F44336'],
//       hoverBackgroundColor: ['#42A5F5', '#EF5350'],
//     }],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             return `₹${context.raw.toLocaleString()}`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => `₹${value.toLocaleString()}`
//         }
//       }
//     }
//   };

//   return (
//     <div className="charts-grid">
//       {/* Chart 1: Income vs Expense Pie */}
//       <div className="chart-card">
//         <h3>Income vs Expense</h3>
//         <div className="chart-container">
//           <Pie data={pieData} options={chartOptions} />
//         </div>
//       </div>

//       {/* Chart 2: Category Breakdown Bar */}
//       <div className="chart-card">
//         <h3>Category Breakdown</h3>
//         <div className="chart-container">
//           <Bar data={categoryData} options={chartOptions} />
//         </div>
//       </div>

//       {/* Chart 3: Monthly Trend Line */}
//       <div className="chart-card">
//         <h3>6-Month Trend</h3>
//         <div className="chart-container">
//           <Line data={trendData} options={chartOptions} />
//         </div>
//       </div>

//       {/* Chart 4: Savings vs Expenses Doughnut */}
//       <div className="chart-card">
//         <h3>Savings vs Expenses</h3>
//         <div className="chart-container">
//           <Pie data={savingsData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;




// import React from 'react';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
// import '../styles/Charts.css';

// // Register components
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement
// );

// const Charts = ({ breakdownData, income, expense }) => {
//   const pieData = {
//     labels: ['Income', 'Expense'],
//     datasets: [{
//       data: [income, expense],
//       backgroundColor: ['#4CAF50', '#F44336'],
//       hoverBackgroundColor: ['#66BB6A', '#EF5350'],
//     }],
//   };

//   const categories = Object.keys(breakdownData);
//   const amounts = Object.values(breakdownData);

//   const categoryData = {
//     labels: categories,
//     datasets: [{
//       label: 'Amount',
//       data: amounts.map(Math.abs),
//       backgroundColor: amounts.map(amount => amount > 0 ? '#4CAF50' : '#F44336'),
//     }],
//   };

//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
//   const monthlyIncome = [3000, 2800, 3200, 4000, 3500, 3800];
//   const monthlyExpense = [2200, 2400, 2600, 2800, 2500, 2700];

//   const trendData = {
//     labels: months,
//     datasets: [
//       {
//         label: 'Income',
//         data: monthlyIncome,
//         borderColor: '#4CAF50',
//         backgroundColor: 'rgba(76, 175, 80, 0.1)',
//         tension: 0.3,
//         fill: true
//       },
//       {
//         label: 'Expense',
//         data: monthlyExpense,
//         borderColor: '#F44336',
//         backgroundColor: 'rgba(244, 67, 54, 0.1)',
//         tension: 0.3,
//         fill: true
//       }
//     ]
//   };

//   const savings = income - expense;
//   const savingsData = {
//     labels: ['Savings', 'Expenses'],
//     datasets: [{
//       data: [savings, expense],
//       backgroundColor: ['#2196F3', '#F44336'],
//       hoverBackgroundColor: ['#42A5F5', '#EF5350'],
//     }],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       tooltip: {
//         callbacks: {
//           label: (context) => `₹${context.raw.toLocaleString()}`,
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => `₹${value.toLocaleString()}`
//         }
//       }
//     }
//   };

//   return (
//     <div className="charts-grid">
//       <div className="chart-card">
//         <h3>Income vs Expense</h3>
//         <div className="chart-container">
//           <Pie data={pieData} options={chartOptions} />
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>Category Breakdown</h3>
//         <div className="chart-container">
//           <Bar data={categoryData} options={chartOptions} />
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>6-Month Trend</h3>
//         <div className="chart-container">
//           <Line data={trendData} options={chartOptions} />
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>Savings vs Expenses</h3>
//         <div className="chart-container">
//           <Pie data={savingsData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;



// import React, { useEffect, useState } from 'react';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
// import '../styles/Charts.css';

// // Register components
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement
// );

// const Charts = ({ breakdownData, income, expense }) => {
//   const [trendData, setTrendData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrendData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/summary/trend', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         setTrendData(data);
//       } catch (error) {
//         console.error('Error fetching trend data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrendData();
//   }, []);

//   const pieData = {
//     labels: ['Income', 'Expense'],
//     datasets: [{
//       data: [income || 0, expense || 0],
//       backgroundColor: ['#4CAF50', '#F44336'],
//       hoverBackgroundColor: ['#66BB6A', '#EF5350'],
//     }],
//   };

//   const categories = Object.keys(breakdownData || {});
//   const amounts = Object.values(breakdownData || {});

//   const categoryData = {
//     labels: categories,
//     datasets: [{
//       label: 'Amount',
//       data: amounts.map(Math.abs),
//       backgroundColor: amounts.map(amount => amount > 0 ? '#4CAF50' : '#F44336'),
//     }],
//   };

//   const savings = (income || 0) - (expense || 0);
//   const savingsData = {
//     labels: ['Savings', 'Expenses'],
//     datasets: [{
//       data: [savings, expense || 0],
//       backgroundColor: ['#2196F3', '#F44336'],
//       hoverBackgroundColor: ['#42A5F5', '#EF5350'],
//     }],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       tooltip: {
//         callbacks: {
//           label: (context) => `₹${context.raw.toLocaleString()}`,
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => `₹${value.toLocaleString()}`
//         }
//       }
//     }
//   };

//   if (loading) {
//     return <div className="charts-loading">Loading charts...</div>;
//   }

//   return (
//     <div className="charts-grid">
//       <div className="chart-card">
//         <h3>Income vs Expense</h3>
//         <div className="chart-container">
//           <Pie data={pieData} options={chartOptions} />
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>Category Breakdown</h3>
//         <div className="chart-container">
//           <Bar data={categoryData} options={chartOptions} />
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>6-Month Trend</h3>
//         <div className="chart-container">
//           {trendData ? (
//             <Line 
//               data={{
//                 labels: trendData.months,
//                 datasets: [
//                   {
//                     label: 'Income',
//                     data: trendData.income,
//                     borderColor: '#4CAF50',
//                     backgroundColor: 'rgba(76, 175, 80, 0.1)',
//                     tension: 0.3,
//                     fill: true
//                   },
//                   {
//                     label: 'Expense',
//                     data: trendData.expense,
//                     borderColor: '#F44336',
//                     backgroundColor: 'rgba(244, 67, 54, 0.1)',
//                     tension: 0.3,
//                     fill: true
//                   }
//                 ]
//               }} 
//               options={chartOptions} 
//             />
//           ) : (
//             <p>No trend data available</p>
//           )}
//         </div>
//       </div>

//       <div className="chart-card">
//         <h3>Savings vs Expenses</h3>
//         <div className="chart-container">
//           <Pie data={savingsData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;



// import React from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import '../styles/Charts.css';

// // Register only the components we need
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// const Charts = ({ breakdownData, income, expense }) => {
//   // 1. Process expense categories data
//   const expenseCategories = Object.entries(breakdownData || {})
//     .filter(([_, amount]) => Number(amount) < 0) // Only expenses (negative amounts)
//     .map(([category, amount]) => ({
//       category,
//       amount: Math.abs(Number(amount)) // Convert to positive for display
//     }))
//     .sort((a, b) => b.amount - a.amount); // Sort by amount descending

//   // 2. Prepare expense breakdown pie chart data
//   const expensePieData = {
//     labels: expenseCategories.map(item => item.category),
//     datasets: [{
//       data: expenseCategories.map(item => item.amount),
//       backgroundColor: [
//         '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
//         '#9966FF', '#FF9F40', '#8AC24A', '#EA5F89'
//       ],
//       borderColor: '#ffffff',
//       borderWidth: 1
//     }]
//   };

//   // 3. Prepare monthly comparison bar chart data
//   const monthlyBarData = {
//     labels: ['Income', 'Expenses'],
//     datasets: [{
//       label: 'Amount (₹)',
//       data: [income || 0, expense || 0],
//       backgroundColor: ['#4CAF50', '#F44336'],
//       borderColor: ['#388E3C', '#D32F2F'],
//       borderWidth: 1
//     }]
//   };

//   // 4. Chart configuration
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           padding: 20,
//           font: {
//             size: 12
//           }
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const percentage = Math.round((value / total) * 100);
//             return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
//           }
//         }
//       }
//     }
//   };

//   return (
//     <div className="charts-grid">
//       {/* Expense Breakdown Pie Chart */}
//       <div className="chart-card">
//         <h3>Expense Breakdown by Category</h3>
//         <div className="chart-container">
//           {expenseCategories.length > 0 ? (
//             <Pie
//               data={expensePieData}
//               options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   tooltip: {
//                     callbacks: {
//                       label: (context) => {
//                         const label = context.label || '';
//                         const value = context.raw || 0;
//                         const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                         const percentage = Math.round((value / total) * 100);
//                         return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
//                       }
//                     }
//                   }
//                 }
//               }}
//             />
//           ) : (
//             <p className="no-data">No expense data available</p>
//           )}
//         </div>
//       </div>

//       {/* Monthly Comparison Bar Chart */}
//       <div className="chart-card">
//         <h3>Monthly Income vs Expenses</h3>
//         <div className="chart-container">
//           <Bar
//             data={monthlyBarData}
//             options={{
//               ...chartOptions,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   ticks: {
//                     callback: (value) => `₹${value.toLocaleString('en-IN')}`
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;




import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Charts = ({ breakdownData, income, expense }) => {
  // Process expense categories data
  const expenseCategories = Object.entries(breakdownData || {})
    .map(([category, amount]) => ({
      category,
      amount: Math.abs(Number(amount)) 
    }))
    .sort((a, b) => b.amount - a.amount); 
  
  const expensePieData = {
    labels: expenseCategories.map(item => item.category),
    datasets: [{
      data: expenseCategories.map(item => item.amount),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#8AC24A', '#EA5F89'
      ],
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };

  
  const monthlyBarData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount (₹)',
      data: [income || 0, expense || 0],
      backgroundColor: ['#4CAF50', '#F44336'],
      borderColor: ['#388E3C', '#D32F2F'],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Expense Breakdown</h3>
        <div className="chart-container">
          {expenseCategories.length > 0 ? (
            <Pie
              data={expensePieData}
              options={chartOptions}
            />
          ) : (
            <p className="no-data">No expense data available</p>
          )}
        </div>
      </div>

      <div className="chart-card">
        <h3>Income vs Expenses</h3>
        <div className="chart-container">
          <Bar
            data={monthlyBarData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `₹${value.toLocaleString('en-IN')}`
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;






