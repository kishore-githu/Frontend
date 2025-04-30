// // src/App.jsx
// import RegisterForm from './components/RegisterForm';

// function App() {
//   return (
//     <div>
//       <h1>My Auth App</h1>
//       <RegisterForm />
//     </div>
//   );
// }

// export default App;



// import Register from './components/Register';
// import Login from './components/Login';

// function App() {
//   return (
//     <div className="App">
//       <Register />
//       <Login />
//     </div>
//   );
// }
// export default App;



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Register from './components/Register';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Register from './components/Register';
// import TransactionManager from './components/TransactionManager';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/transactions" element={<TransactionManager />} />
        
       
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Register from './components/Register';
// import TransactionManager from './components/TransactionManager';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
          
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
          
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
          
//           <Route path="/transactions" element={
//             <ProtectedRoute>
//               <TransactionManager />
//             </ProtectedRoute>
//           } />
          
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;



// // src/App.js
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Register from './components/Register';
// import TransactionManager from './components/TransactionManager';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/transactions"
//             element={
//               <ProtectedRoute>
//                 <TransactionManager />
                
//               </ProtectedRoute>
              
//             }
//           />

//           {/* Redirect root path */}
//           <Route path="/" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import TransactionManager from './components/TransactionManager';

import CategoryManager from './components/CategoryManager';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoryManager />
                </ProtectedRoute>
              
            }
          />

          {/* Redirect root path */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;










