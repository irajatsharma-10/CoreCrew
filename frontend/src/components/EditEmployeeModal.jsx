import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../redux/actions/employeeActions';
import { toast } from 'react-toastify';

const EditEmployeeModal = ({ isOpen, onClose, employeeId }) => {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employee.employees.find(emp => emp._id === employeeId));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [salary, setSalary] = useState('');
    const [status, setStatus] = useState('active');
    const [uniqueId, setUniqueId] = useState('');

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setPhone(employee.phone);
            setSalary(employee.salary);
            setStatus(employee.status);
            setUniqueId(employee.uniqueId);
        }
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateEmployee(employeeId, { name, email, phone, salary, status, uniqueId }));
        toast.success('Employee updated successfully');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl md:text-2xl font-bold mb-6">Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
                        <select
                            id="status"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uniqueId">Unique ID</label>
                        <input
                            type="text"
                            id="uniqueId"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
