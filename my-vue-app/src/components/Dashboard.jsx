
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 
 


// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await res.json();
//         setTransactions(data);
//       } catch (err) {
//         console.error("Failed to fetch transactions", err);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let income = 0;
//     let expense = 0;
//     const currentMonth = new Date().getMonth();
//     const categorySummary = {};

//     transactions.forEach((txn) => {
//       const txnDate = new Date(txn.date);
//       if (txnDate.getMonth() === currentMonth) {
//         if (!categorySummary[txn.category]) {
//           categorySummary[txn.category] = 0;
//         }
//         txn.type === 'income'
//           ? (income += txn.amount)
//           : (expense += txn.amount);
//         txn.type === 'expense' && (categorySummary[txn.category] -= txn.amount);
//         txn.type === 'income' && (categorySummary[txn.category] += txn.amount);
//       }
//     });

//     setTotalIncome(income);
//     setTotalExpense(expense);
//     setBalance(income - expense);
//     setMonthlyBreakdown(categorySummary);
//   }, [transactions]);

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{balance.toFixed(2)}</p>
//         <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
//         <p><strong>Total Expenses:</strong> ₹{totalExpense.toFixed(2)}</p>
//       </div>

//       {/* ✅ Button to go to TransactionManager */}
//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {Object.keys(monthlyBreakdown).length === 0 ? (
//           <p>No data for this month.</p>
//         ) : (
//           <ul>
//             {Object.entries(monthlyBreakdown).map(([category, amount]) => (
//               <li key={category}>
//                 <strong>{category}</strong>: ₹{amount.toFixed(2)}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       <Charts
//   breakdownData={{
//     Food: -300,
//     Travel: -150,
//     Entertainment: -100,
//   }}
//   income={2000}
//   expense={550}
// />


//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ income: 0, expense: 0 });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary(monthlyData);
        
//         // Fetch category breakdown
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData);
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Calculate balance from the monthly summary
//     const calculatedBalance = monthlySummary.income - monthlySummary.expense;
//     setBalance(calculatedBalance);
//     setTotalIncome(monthlySummary.income);
//     setTotalExpense(monthlySummary.expense);
    
//     // You can keep the client-side calculation as fallback
//     let income = 0;
//     let expense = 0;
//     const currentMonth = new Date().getMonth();
//     const categorySummary = {};

//     transactions.forEach((txn) => {
//       const txnDate = new Date(txn.date);
//       if (txnDate.getMonth() === currentMonth) {
//         if (!categorySummary[txn.category]) {
//           categorySummary[txn.category] = 0;
//         }
//         txn.type === 'income'
//           ? (income += txn.amount)
//           : (expense += txn.amount);
//         txn.type === 'expense' && (categorySummary[txn.category] -= txn.amount);
//         txn.type === 'income' && (categorySummary[txn.category] += txn.amount);
//       }
//     });

//     // Only use client-side calculation if server data isn't available
//     if (monthlySummary.income === 0 && monthlySummary.expense === 0) {
//       setTotalIncome(income);
//       setTotalExpense(expense);
//       setBalance(income - expense);
//     }
    
//     setMonthlyBreakdown(categorySummary);
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{balance.toFixed(2)}</p>
//         <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
//         <p><strong>Total Expenses:</strong> ₹{totalExpense.toFixed(2)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {Object.keys(categoryBreakdown).length === 0 ? (
//           <p>No data for this month.</p>
//         ) : (
//           <ul>
//             {Object.entries(categoryBreakdown).map(([category, amount]) => (
//               <li key={category}>
//                 <strong>{category}</strong>: ₹{Math.abs(amount).toFixed(2)} ({amount < 0 ? 'Expense' : 'Income'})
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ 
//     income: 0, 
//     expense: 0,
//     balance: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData || []);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary({
//           income: monthlyData?.totalIncome || 0,
//           expense: monthlyData?.totalExpense || 0,
//           balance: monthlyData?.balance || 0
//         });
        
//         // Fetch category breakdown
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData || {});
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Use server-provided values first, fallback to client calculation
//     const income = monthlySummary.income || 0;
//     const expense = monthlySummary.expense || 0;
//     const calculatedBalance = income - expense;
    
//     setBalance(calculatedBalance);
//     setTotalIncome(income);
//     setTotalExpense(expense);
    
//     // Client-side calculation as fallback
//     if (income === 0 && expense === 0) {
//       let clientIncome = 0;
//       let clientExpense = 0;
//       const currentMonth = new Date().getMonth();
//       const categorySummary = {};

//       transactions.forEach((txn) => {
//         const txnDate = new Date(txn.date);
//         if (txnDate.getMonth() === currentMonth) {
//           if (!categorySummary[txn.category]) {
//             categorySummary[txn.category] = 0;
//           }
//           if (txn.type === 'income') {
//             clientIncome += Number(txn.amount) || 0;
//             categorySummary[txn.category] += Number(txn.amount) || 0;
//           } else {
//             clientExpense += Number(txn.amount) || 0;
//             categorySummary[txn.category] -= Number(txn.amount) || 0;
//           }
//         }
//       });

//       setTotalIncome(clientIncome);
//       setTotalExpense(clientExpense);
//       setBalance(clientIncome - clientExpense);
//       setMonthlyBreakdown(categorySummary);
//     }
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   // Helper function to safely format numbers
//   const formatCurrency = (value) => {
//     const num = Number(value) || 0;
//     return num.toFixed(2);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{formatCurrency(balance)}</p>
//         <p><strong>Total Income:</strong> ₹{formatCurrency(totalIncome)}</p>
//         <p><strong>Total Expenses:</strong> ₹{formatCurrency(totalExpense)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {Object.keys(categoryBreakdown).length === 0 ? (
//           <p>No data for this month.</p>
//         ) : (
//           <ul>
//             {Object.entries(categoryBreakdown).map(([category, amount]) => {
//               const numAmount = Number(amount) || 0;
//               return (
//                 <li key={category}>
//                   <strong>{category}</strong>: ₹{formatCurrency(Math.abs(numAmount))} 
//                   ({numAmount < 0 ? 'Expense' : 'Income'})
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ 
//     income: 0, 
//     expense: 0,
//     balance: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData || []);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary({
//           income: monthlyData?.totalIncome || 0,
//           expense: monthlyData?.totalExpense || 0,
//           balance: monthlyData?.balance || 0
//         });
        
//         // Fetch category breakdown - request only expense data
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category?type=expense', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData || {});
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Use server-provided values first, fallback to client calculation
//     const income = monthlySummary.income || 0;
//     const expense = monthlySummary.expense || 0;
//     const calculatedBalance = income - expense;
    
//     setBalance(calculatedBalance);
//     setTotalIncome(income);
//     setTotalExpense(expense);
    
//     // Client-side calculation as fallback
//     if (income === 0 && expense === 0) {
//       let clientIncome = 0;
//       let clientExpense = 0;
//       const currentMonth = new Date().getMonth();
//       const categorySummary = {};

//       transactions.forEach((txn) => {
//         const txnDate = new Date(txn.date);
//         if (txnDate.getMonth() === currentMonth) {
//           const categoryName = txn.category?.name || 'Uncategorized';
//           if (!categorySummary[categoryName]) {
//             categorySummary[categoryName] = 0;
//           }
//           if (txn.type === 'income') {
//             clientIncome += Number(txn.amount) || 0;
//             categorySummary[categoryName] += Number(txn.amount) || 0;
//           } else {
//             clientExpense += Number(txn.amount) || 0;
//             categorySummary[categoryName] -= Number(txn.amount) || 0;
//           }
//         }
//       });

//       setTotalIncome(clientIncome);
//       setTotalExpense(clientExpense);
//       setBalance(clientIncome - clientExpense);
//       setMonthlyBreakdown(categorySummary);
//     }
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   // Helper function to safely format numbers
//   const formatCurrency = (value) => {
//     const num = Number(value) || 0;
//     return num.toLocaleString('en-IN', {
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2
//     });
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{formatCurrency(balance)}</p>
//         <p><strong>Total Income:</strong> ₹{formatCurrency(totalIncome)}</p>
//         <p><strong>Total Expenses:</strong> ₹{formatCurrency(totalExpense)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Expense Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {Object.keys(categoryBreakdown).length === 0 ? (
//           <p>No expense data for this month.</p>
//         ) : (
//           <ul>
//             {Object.entries(categoryBreakdown).map(([category, amount]) => {
//               const numAmount = Math.abs(Number(amount)) || 0;
//               return (
//                 <li key={category}>
//                   <strong>{category}</strong>: ₹{formatCurrency(numAmount)}
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ 
//     income: 0, 
//     expense: 0,
//     balance: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData || []);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary({
//           income: monthlyData?.totalIncome || 0,
//           expense: monthlyData?.totalExpense || 0,
//           balance: monthlyData?.balance || 0
//         });
        
//         // Fetch full category breakdown (both income and expenses)
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData || {});
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Use server-provided values first, fallback to client calculation
//     const income = monthlySummary.income || 0;
//     const expense = monthlySummary.expense || 0;
//     const calculatedBalance = income - expense;
    
//     setBalance(calculatedBalance);
//     setTotalIncome(income);
//     setTotalExpense(expense);
    
//     // Client-side calculation as fallback
//     if (income === 0 && expense === 0) {
//       let clientIncome = 0;
//       let clientExpense = 0;
//       const currentMonth = new Date().getMonth();
//       const categorySummary = {};

//       transactions.forEach((txn) => {
//         const txnDate = new Date(txn.date);
//         if (txnDate.getMonth() === currentMonth) {
//           const categoryName = txn.category?.name || 'Uncategorized';
//           if (!categorySummary[categoryName]) {
//             categorySummary[categoryName] = 0;
//           }
//           if (txn.type === 'income') {
//             clientIncome += Number(txn.amount) || 0;
//             categorySummary[categoryName] += Number(txn.amount) || 0;
//           } else {
//             clientExpense += Number(txn.amount) || 0;
//             categorySummary[categoryName] -= Number(txn.amount) || 0;
//           }
//         }
//       });

//       setTotalIncome(clientIncome);
//       setTotalExpense(clientExpense);
//       setBalance(clientIncome - clientExpense);
//       setMonthlyBreakdown(categorySummary);
//     }
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   // Helper function to safely format numbers
//   const formatCurrency = (value) => {
//     const num = Number(value) || 0;
//     return num.toLocaleString('en-IN', {
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2
//     });
//   };

//   // Prepare data for monthly breakdown display
//   const monthlyCategoryData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
//     category,
//     amount: Number(amount) || 0,
//     type: Number(amount) >= 0 ? 'Income' : 'Expense'
//   })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{formatCurrency(balance)}</p>
//         <p><strong>Total Income:</strong> ₹{formatCurrency(totalIncome)}</p>
//         <p><strong>Total Expenses:</strong> ₹{formatCurrency(totalExpense)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {monthlyCategoryData.length === 0 ? (
//           <p>No transaction data for this month.</p>
//         ) : (
//           <table className="breakdown-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlyCategoryData.map(({category, amount, type}) => (
//                 <tr key={category} className={`breakdown-row ${type.toLowerCase()}`}>
//                   <td>{category}</td>
//                   <td>₹{formatCurrency(Math.abs(amount))}</td>
//                   <td>{type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ 
//     income: 0, 
//     expense: 0,
//     balance: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData || []);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary({
//           income: monthlyData?.totalIncome || 0,
//           expense: monthlyData?.totalExpense || 0,
//           balance: monthlyData?.balance || 0
//         });
        
//         // Fetch full category breakdown (both income and expenses)
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData || {});
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Use server-provided values first, fallback to client calculation
//     const income = monthlySummary.income || 0;
//     const expense = monthlySummary.expense || 0;
//     const calculatedBalance = income - expense;
    
//     setBalance(calculatedBalance);
//     setTotalIncome(income);
//     setTotalExpense(expense);
    
//     // Client-side calculation as fallback
//     if (income === 0 && expense === 0) {
//       let clientIncome = 0;
//       let clientExpense = 0;
//       const currentMonth = new Date().getMonth();
//       const categorySummary = {};

//       transactions.forEach((txn) => {
//         const txnDate = new Date(txn.date);
//         if (txnDate.getMonth() === currentMonth) {
//           const categoryName = txn.category?.name || 'Uncategorized';
//           if (!categorySummary[categoryName]) {
//             categorySummary[categoryName] = 0;
//           }
//           if (txn.type === 'income') {
//             clientIncome += Number(txn.amount) || 0;
//             categorySummary[categoryName] += Number(txn.amount) || 0;
//           } else {
//             clientExpense += Number(txn.amount) || 0;
//             categorySummary[categoryName] -= Number(txn.amount) || 0;
//           }
//         }
//       });

//       setTotalIncome(clientIncome);
//       setTotalExpense(clientExpense);
//       setBalance(clientIncome - clientExpense);
//       setMonthlyBreakdown(categorySummary);
//     }
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   // Helper function to safely format numbers
//   const formatCurrency = (value) => {
//     const num = Number(value) || 0;
//     return num.toLocaleString('en-IN', {
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2
//     });
//   };

//   // Prepare data for monthly breakdown display
//   const monthlyCategoryData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
//     category,
//     amount: Number(amount) || 0,
//     type: Number(amount) >= 0 ? 'Income' : 'Expense'
//   })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{formatCurrency(balance)}</p>
//         <p><strong>Total Income:</strong> ₹{formatCurrency(totalIncome)}</p>
//         <p><strong>Total Expenses:</strong> ₹{formatCurrency(totalExpense)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {monthlyCategoryData.length === 0 ? (
//           <p>No transaction data for this month.</p>
//         ) : (
//           <table className="breakdown-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlyCategoryData.map(({category, amount, type}) => (
//                 <tr key={category} className={`breakdown-row ${type.toLowerCase()}`}>
//                   <td>{category}</td>
//                   <td>₹{formatCurrency(Math.abs(amount))}</td>
//                   <td>{type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../styles/Dashboard.css';
// import Charts from './Charts'; 
// import '../styles/Charts.css'; 

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({});
//   const [categoryBreakdown, setCategoryBreakdown] = useState({});
//   const [monthlySummary, setMonthlySummary] = useState({ 
//     income: 0, 
//     expense: 0,
//     balance: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch transactions
//         const transactionsRes = await fetch('http://localhost:8080/api/transactions', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const transactionsData = await transactionsRes.json();
//         setTransactions(transactionsData || []);
        
//         // Fetch monthly summary
//         const monthlyRes = await fetch('http://localhost:8080/api/summary/monthly', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const monthlyData = await monthlyRes.json();
//         setMonthlySummary({
//           income: monthlyData?.totalIncome || 0,
//           expense: monthlyData?.totalExpense || 0,
//           balance: monthlyData?.balance || 0
//         });
        
//         // Fetch full category breakdown (both income and expenses)
//         const categoryRes = await fetch('http://localhost:8080/api/summary/category', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const categoryData = await categoryRes.json();
//         setCategoryBreakdown(categoryData || {});
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Use server-provided values first, fallback to client calculation
//     const income = monthlySummary.income || 0;
//     const expense = monthlySummary.expense || 0;
//     const calculatedBalance = income - expense;
    
//     setBalance(calculatedBalance);
//     setTotalIncome(income);
//     setTotalExpense(expense);
    
//     // Client-side calculation as fallback
//     if (income === 0 && expense === 0) {
//       let clientIncome = 0;
//       let clientExpense = 0;
//       const currentMonth = new Date().getMonth();
//       const categorySummary = {};

//       transactions.forEach((txn) => {
//         const txnDate = new Date(txn.date);
//         if (txnDate.getMonth() === currentMonth) {
//           const categoryName = txn.category?.name || 'Uncategorized';
//           if (!categorySummary[categoryName]) {
//             categorySummary[categoryName] = 0;
//           }
//           if (txn.type === 'income') {
//             clientIncome += Number(txn.amount) || 0;
//             categorySummary[categoryName] += Number(txn.amount) || 0;
//           } else {
//             clientExpense += Number(txn.amount) || 0;
//             categorySummary[categoryName] -= Number(txn.amount) || 0;
//           }
//         }
//       });

//       setTotalIncome(clientIncome);
//       setTotalExpense(clientExpense);
//       setBalance(clientIncome - clientExpense);
//       setMonthlyBreakdown(categorySummary);
//     }
//   }, [transactions, monthlySummary]);

//   if (loading) {
//     return <div className="dashboard-container">Loading...</div>;
//   }

//   // Helper function to safely format numbers
//   const formatCurrency = (value) => {
//     const num = Number(value) || 0;
//     return num.toLocaleString('en-IN', {
//       maximumFractionDigits: 2,
//       minimumFractionDigits: 2
//     });
//   };

//   // Prepare data for monthly breakdown display
//   const monthlyCategoryData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
//     category,
//     amount: Number(amount) || 0,
//     type: Number(amount) >= 0 ? 'Income' : 'Expense'
//   })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="summary-box">
//         <p><strong>Current Balance:</strong> ₹{formatCurrency(balance)}</p>
//         <p><strong>Total Income:</strong> ₹{formatCurrency(totalIncome)}</p>
//         <p><strong>Total Expenses:</strong> ₹{formatCurrency(totalExpense)}</p>
//       </div>

//       <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
//         Go to Transactions
//       </button>

//       <h3>Monthly Breakdown by Category</h3>
//       <div className="category-breakdown">
//         {monthlyCategoryData.length === 0 ? (
//           <p>No transaction data for this month.</p>
//         ) : (
//           <table className="breakdown-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monthlyCategoryData.map(({category, amount, type}) => (
//                 <tr key={category} className={`breakdown-row ${type.toLowerCase()}`}>
//                   <td>{category}</td>
//                   <td>₹{formatCurrency(Math.abs(amount))}</td>
//                   <td>{type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
      
//       <Charts
//         breakdownData={categoryBreakdown}
//         income={totalIncome}
//         expense={totalExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Charts from './Charts';
import '../styles/Charts.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});
  const [filteredBreakdown, setFilteredBreakdown] = useState({});
  const [monthlySummary, setMonthlySummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState(['All']);

  const navigate = useNavigate();

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [transactionsRes, monthlyRes, categoryRes] = await Promise.all([
          fetch('http://localhost:8080/api/transactions', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          fetch('http://localhost:8080/api/summary/monthly', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          fetch('http://localhost:8080/api/summary/category', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        const [transactionsData, monthlyData, categoryData] = await Promise.all([
          transactionsRes.json(),
          monthlyRes.json(),
          categoryRes.json()
        ]);

        setTransactions(transactionsData || []);
        setMonthlySummary({
          income: monthlyData?.totalIncome || 0,
          expense: monthlyData?.totalExpense || 0,
          balance: monthlyData?.balance || 0
        });
        setCategoryBreakdown(categoryData || {});

        
        const categories = new Set(['All']);
        transactionsData.forEach(txn => {
          if (txn.category?.name) {
            categories.add(txn.category.name);
          }
        });
        setAvailableCategories(Array.from(categories));

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {

      const filtered = transactions.filter(txn => {
        const txnDate = new Date(txn.date);
        const txnMonth = txnDate.getMonth() + 1;
        const matchesMonth = selectedMonth === txnMonth;
        const matchesCategory = selectedCategory === 'All' || 
                              txn.category?.name === selectedCategory;
        return matchesMonth && matchesCategory;
      });

      
      const breakdown = {};
      let income = 0;
      let expense = 0;

      filtered.forEach(txn => {
        const category = txn.category?.name || 'Uncategorized';
        const amount = Number(txn.amount) || 0;

        if (!breakdown[category]) {
          breakdown[category] = 0;
        }

        if (txn.type === 'income') {
          income += amount;
          breakdown[category] += amount;
        } else {
          expense += amount;
          breakdown[category] -= amount;
        }
      });

      setTotalIncome(income);
      setTotalExpense(expense);
      setBalance(income - expense);
      setFilteredBreakdown(breakdown);
    }
  }, [transactions, selectedMonth, selectedCategory, loading]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const monthlyCategoryData = Object.entries(filteredBreakdown).map(([category, amount]) => ({
    category,
    amount: Number(amount) || 0,
    type: Number(amount) >= 0 ? 'Income' : 'Expense'
  })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <button 
          onClick={handleLogout}
          className="logout-btn"
          aria-label="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z"/>
          </svg>
          
          <span className="logout-text">Logout</span>
        </button>
      
     
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="month-filter">Month:</label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-box">
        <div className="summary-item">
          <span className="summary-label">Current Balance:</span>
          <span className={`summary-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(balance)}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Income:</span>
          <span className="summary-value positive">{formatCurrency(totalIncome)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Expenses:</span>
          <span className="summary-value negative">{formatCurrency(totalExpense)}</span>
        </div>
      </div>

      <button onClick={() => navigate('/transactions')} className="go-to-transactions-btn">
        Go to Transactions
      </button>

      <h3>
        Monthly Breakdown for {months.find(m => m.value === selectedMonth)?.label}
        {selectedCategory !== 'All' ? ` (${selectedCategory})` : ''}
      </h3>
      
      <div className="category-breakdown">
        {monthlyCategoryData.length === 0 ? (
          <p>No transaction data for selected filters.</p>
        ) : (
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {monthlyCategoryData.map(({category, amount, type}) => (
                <tr key={`${category}-${type}`} className={`breakdown-row ${type.toLowerCase()}`}>
                  <td>{category}</td>
                  <td>{formatCurrency(Math.abs(amount))}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <Charts
        breakdownData={filteredBreakdown}
        income={totalIncome}
        expense={totalExpense}
      />
    </div>
  );
};

export default Dashboard;




