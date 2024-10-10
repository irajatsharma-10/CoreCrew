import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    if (user.isLoggedIn) {
        navigate('/employees');  // Redirect to employee list if logged in
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                        <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Not registered? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
