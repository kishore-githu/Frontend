
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css'; // ✅ Make sure this path is correct

// const Login = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();
//       console.log("Login Response:", data); // 🔍 Check this in browser console

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('username', data.username); // ✅ Set username

//         navigate('/dashboard'); // or wherever you want
//       } else {
//         setMessage(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       setMessage('Something went wrong');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="fade-in">Login</h2>
//         {message && <p className="error-message">{message}</p>}
//         <form onSubmit={handleSubmit} className="fade-in">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

// const Login = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();
//       console.log("Login Response:", data);

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('username', data.username);
//         navigate('/dashboard');
//       } else {
//         setMessage(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       setMessage('Something went wrong');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="fade-in">Login</h2>
//         {message && <p className="error-message">{message}</p>}
//         <form onSubmit={handleSubmit} className="fade-in">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p>Don't have an account?</p>
//         <button onClick={() => navigate('/register')} className="switch-button">
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.ok) {
        login({
          username: data.username,
          token: data.token
        });
        console.log("Login successful:", data);
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="fade-in">Login</h2>
        
        {message && (
          <p className={`message ${message.includes('failed') ? 'error' : ''}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="fade-in">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button 
            onClick={() => navigate('/register')} 
            className="switch-button"
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
















