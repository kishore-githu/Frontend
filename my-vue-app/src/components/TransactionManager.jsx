
import React, { useEffect, useState } from 'react';
import '../styles/TransactionManager.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TransactionManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    type: 'income',
    category_id: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState({ 
    category_id: '', 
    date: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to continue');
      setTimeout(() => window.location.href = '/login', 1500);
      return null;
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      
      const categoriesRes = await axios.get('http://localhost:8080/api/categories', { headers });
      setCategories(categoriesRes.data);

      
      const transactionsRes = await axios.get('http://localhost:8080/api/transactions', { headers });
      setTransactions(transactionsRes.data);

    } catch (err) {
      console.error("Failed to load data", err);
      setError(err.message);
      
      if (err.message.includes('401') || err.message.includes('403')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCategory = async (categoryName) => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return null;
    }

    try {
      const headers = getAuthHeaders();
      if (!headers) return null;

      const response = await axios.post(
        'http://localhost:8080/api/categories',
        { name: categoryName },
        { headers }
      );

      setCategories(prev => [...prev, response.data]);
      setSuccess(`Category "${categoryName}" added successfully!`);
      return response.data.id;
    } catch (error) {
      console.error('Error creating category:', error);
      setError(error.response?.data?.message || 'Error creating category');
      return null;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.category_id === "new") {
      const newCategoryName = prompt("Enter new category name:");
      if (!newCategoryName) return;

      const newCategoryId = await handleAddCategory(newCategoryName);
      if (!newCategoryId) return;

      setForm(prev => ({ ...prev, category_id: newCategoryId }));
      return;
    }

    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    if (!form.category_id) {
      setError('Please select a category');
      return;
    }

    const headers = getAuthHeaders();
    if (!headers) return;

    const url = isEditing 
      ? `http://localhost:8080/api/transactions/${editId}`
      : 'http://localhost:8080/api/transactions';

    try {
      const payload = {
        amount: amount,
        type: form.type,
        category: { id: form.category_id },
        note: form.note,
        date: form.date
      };

      const response = await axios({
        method: isEditing ? 'put' : 'post',
        url,
        headers,
        data: payload
      });

      setSuccess(isEditing ? 'Transaction updated!' : 'Transaction added!');
      fetchData();

      setForm({
        amount: '',
        type: 'income',
        category_id: '',
        note: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Transaction error:', error);
      setError(error.response?.data?.message || 'Transaction failed');
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

  const handleEdit = (txn) => {
    setForm({
      amount: txn.amount.toString(),
      type: txn.type,
      category_id: txn.category?.id || txn.category_id,
      note: txn.note || '',
      date: txn.date.split('T')[0]
    });
    setEditId(txn.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      await axios.delete(`http://localhost:8080/api/transactions/${id}`, { headers });
      setSuccess('Transaction deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesCategory = filter.category_id ? 
      String(txn.category?.id || txn.category_id) === String(filter.category_id) : true;
    const matchesDate = filter.date ? txn.date.startsWith(filter.date) : true;
    return matchesCategory && matchesDate;
  });

  const getCategoryName = (id) => {
    if (!id) return 'Uncategorized';
    const category = categories.find(cat => String(cat.id) === String(id));
    return category ? category.name : 'Unknown';
  };

  const summary = filteredTransactions.reduce((acc, txn) => {
    acc[txn.type] += parseFloat(txn.amount);
    return acc;
  }, { income: 0, expense: 0 });

  const balance = summary.income - summary.expense;

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="transaction-manager">
      
      <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
      
      {success && <div className="alert success">{success}</div>}
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Type</label>
          <select 
            name="type" 
            value={form.type} 
            onChange={handleChange}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            name="category_id" 
            value={form.category_id} 
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="new">+ Add New Category</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Note (Optional)</label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Description or memo"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Update' : 'Add'} Transaction
          </button>
          {isEditing && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setForm({
                  amount: '',
                  type: 'income',
                  category_id: '',
                  note: '',
                  date: new Date().toISOString().split('T')[0]
                });
              }}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/categories')}
          >
            Manage Categories
          </button>
        </div>
      </form>
      <div className="filters">
        <h3>Filter Transactions</h3>
        <div className="filter-group">
          <label>Category</label>
          <select
            name="category_id"
            value={filter.category_id}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
          />
        </div>

        <button 
          onClick={() => setFilter({ category_id: '', date: '' })}
          className="btn-secondary"
        >
          Clear Filters
        </button>
      </div>

      <div className="summary">
        <h3>Financial Summary</h3>
        <div className="summary-cards">
          <div className="card income">
            <h4>Income</h4>
            <p>${summary.income.toFixed(2)}</p>
          </div>
          <div className="card expense">
            <h4>Expense</h4>
            <p>${summary.expense.toFixed(2)}</p>
          </div>
          <div className="card balance">
            <h4>Balance</h4>
            <p>${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="transactions-list">
        <h3>Transactions</h3>
        {filteredTransactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className={`txn-${txn.type}`}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>{getCategoryName(txn.category?.id || txn.category_id)}</td>
                  <td>{txn.type}</td>
                  <td>${parseFloat(txn.amount).toFixed(2)}</td>
                  <td>{txn.note || '-'}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(txn)}>Edit</button>
                    <button onClick={() => handleDelete(txn.id)} className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionManager;