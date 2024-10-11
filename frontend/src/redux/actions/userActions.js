import axios from 'axios';
import { loginSuccess, logout } from '../slices/userSlice';
import { toast } from 'react-toastify';

const BASEURL = import.meta.env.REACT_APP_BASE_URL || 'http://localhost:5000/api'; 

export const login = (email, password) => async (dispatch) => {
    try {
        // // Log request data to confirm correct values
        // console.log('Login request:', { email, password });

        const response = await axios.post(`${BASEURL}/auth/login`, { email, password });

        // // Log response for debugging
        // console.log('Login response:', response.data);

        const { token } = response.data;

        // Log token to ensure it's being generated and assigned
        // console.log('JWT Token:', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);

        dispatch(loginSuccess(response.data));
        toast.success('Logged in successfully');
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);

        // Check if it's specifically a 401 error
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password');
        } else {
            toast.error('An error occurred during login');
        }
    }
};

export const signup = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASEURL}/auth/signup`, userData); // Use BASEURL

        // Log signup response
        // console.log('Signup response:', response.data);

        const { token } = response.data;

        // Log token to ensure it's being assigned
        // console.log('JWT Token:', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
        toast.success('Registered successfully');
    } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        toast.error('Error during registration');
    }
};

export const performLogout = () => (dispatch) => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    dispatch(logout());
    toast.success('Logged out successfully');
};
