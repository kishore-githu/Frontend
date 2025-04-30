

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // 👈 for navigation
// import '../styles/Register.css';

// const Register = () => {
//   const navigate = useNavigate(); // 👈 hook to navigate
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMessage(data.message || "Registered successfully!");
//         setTimeout(() => {
//           navigate('/login'); // 👈 redirect to login after register
//         }, 1500);
//       } else {
//         const errorData = await res.json();
//         setMessage(errorData.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setMessage("Something went wrong!");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || "Registered successfully!");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {/* {message && <p>{message}</p>} */}
      {message && (
  <p role="alert" className={message.includes('success') ? 'register-success-message' : 'register-error-message'}>
    {message}
  </p>
)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account?</p>
      <button onClick={() => navigate('/login')} className="switch-button">
        Login
      </button>
    </div>
  );
};

export default Register;




