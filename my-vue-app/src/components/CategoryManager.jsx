
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryManager.css';

function CategoryManager() {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleAddCategory = async (event) => {
        event.preventDefault();

        if (!categoryName.trim()) {
            setError("Category name is required.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/categories',
                { name: categoryName },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccess('Category created successfully!');
            setCategoryName('');
            setError(null);
            
            // Optionally navigate back to transactions
            navigate('/transactions');

        } catch (error) {
            console.error('Error creating category:', error);
            setError(error.response?.data?.message || 'Error creating category');
        }
    };

    return (
        <div className="category-manager">
            <h2>Add New Category</h2>
            
            {success && <div className="alert success">{success}</div>}
            {error && <div className="alert error">{error}</div>}

            <form onSubmit={handleAddCategory}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleChange}
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">Add Category</button>
                    <button 
                        type="button" 
                        className="btn-secondary"
                        onClick={() => navigate('/transactions')}
                    >
                        Back to Transactions
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryManager;






