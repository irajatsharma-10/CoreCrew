import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to WorkMate Pro!
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaUser className="text-5xl text-blue-500 mb-4" />
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Manage Employees</h2>
                        <p className="text-center mb-4">Keep track of employee details, performance, and more. Efficient management made easy.</p>
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Go to Employee List
                        </Link>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaUserPlus className="text-5xl text-green-500 mb-4" />
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">New Here?</h2>
                        <p className="text-center mb-4">Sign up to get started with managing your team. Quick and easy registration.</p>
                        <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Sign Up Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
