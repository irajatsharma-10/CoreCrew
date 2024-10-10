import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { performLogout } from '../redux/actions/userActions';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(performLogout());
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">WorkMate Pro</Link>
                <div className="flex md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
                    </button>
                </div>
                <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-2 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
                    {user.isLoggedIn ? (
                        <>
                            <Link to="/employees" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Employees
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
