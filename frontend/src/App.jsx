import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './redux/slices/userSlice';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeList from './components/EmployeeList';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(loginSuccess({ token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/employees" /> : <LoginPage />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/employees" /> : <SignupPage />} />
        <Route path="/employees" element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
