import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, updateEmployee } from '../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector((state) => state.employee.employees);
    const user = useSelector((state) => state.user);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    useEffect(() => {
        if (user.isLoggedIn) {
            dispatch(fetchEmployees());
        } else {
            navigate('/login');
        }
    }, [dispatch, user, navigate]);

    if (!Array.isArray(employees)) {
        return <div>Loading...</div>;
    }

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.phone.includes(searchQuery) ||
            emp.uniqueId.includes(searchQuery)
    );

    const sortedEmployees = filteredEmployees.sort((a, b) => {
        if (sortField === 'name' || sortField === 'email') {
            return a[sortField].localeCompare(b[sortField]);
        } else {
            return a[sortField] - b[sortField];
        }
    });

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
        toast.success('Employee deleted successfully');
    };

    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        dispatch(updateEmployee(id, { status: newStatus }));
        toast.success(`Employee status updated to ${newStatus}`);
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-red-500 p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Employee List</h2>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-lg hover:shadow-xl mt-4 md:mt-0"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add Employee
                    </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaSearch className="mr-2 text-gray-500" />
                        <input
                            type="text"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full md:w-64"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="email">Sort by Email</option>
                            <option value="phone">Sort by Phone</option>
                            <option value="salary">Sort by Salary</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr>
                                {["Name", "Email", "Phone", "Salary", "Status", "Actions"].map((header, index) => (
                                    <th key={index} className="py-3 px-4 bg-gray-200 text-center">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.length > 0 ? (
                                currentEmployees.map((employee) => (
                                    <tr key={employee._id} className={`hover:bg-gray-100 ${employee.status === 'active' ? 'bg-green-50' : 'bg-red-50'}`}>
                                        <td className="py-3 px-4 border border-gray-300 text-center">{employee.name}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-center">{employee.email}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-center">{employee.phone}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-center">{employee.salary}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-center">
                                            <button
                                                className={`px-3 py-1 rounded-lg focus:outline-none transition duration-300 ${employee.status === 'active' ? 'bg-green-500 text-white shadow-md hover:shadow-lg' : 'bg-red-500 text-white shadow-md hover:shadow-lg'}`}
                                                onClick={() => handleStatusToggle(employee._id, employee.status)}
                                            >
                                                {employee.status}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 border border-gray-300 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                                    onClick={() => { setIsEditModalOpen(true); setCurrentEmployeeId(employee._id); }}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="bg-gradient-to-r from-red-400 to-red-500 text-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                                    onClick={() => handleDelete(employee._id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-700 font-bold">
                            Active Users: {employees.filter(emp => emp.status === 'active').length}
                            <br />
                            Inactive Users: {employees.filter(emp => emp.status === 'inactive').length}
                        </div>
                        <ul className="flex space-x-2 mt-4 md:mt-0">
                            {Array.from({ length: Math.ceil(sortedEmployees.length / employeesPerPage) }, (_, index) => (
                                <li key={index} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition duration-300" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditEmployeeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} employeeId={currentEmployeeId} />
        </div>
    );
};

export default EmployeeList;
