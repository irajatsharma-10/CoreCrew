import axios from 'axios';
import { setEmployees, removeEmployee } from '../slices/employeeSlice';
import { toast } from 'react-toastify';
const BASEURL = import.meta.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
export const fetchEmployees = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASEURL}/employees`);
        dispatch(setEmployees(response.data));
    } catch (error) {
        toast.error('Error fetching employees');
    }
};

export const addEmployee = (employeeData) => async (dispatch) => {
    try {
        await axios.post(`${BASEURL}/employees`, employeeData);
        dispatch(fetchEmployees());
        toast.success('Employee added successfully');
    } catch (error) {
        toast.error('Error adding employee');
    }
};

export const updateEmployee = (id, employeeData) => async (dispatch) => {
    try {
        await axios.put(`${BASEURL}/employees/${id}`, employeeData);
        dispatch(fetchEmployees());
        toast.success('Employee updated successfully');
    } catch (error) {
        toast.error('Error updating employee');
    }
};

export const deleteEmployee = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASEURL}/employees/${id}`);
        dispatch(removeEmployee(id));
        toast.success('Employee deleted successfully');
    } catch (error) {
        toast.error('Error deleting employee');
    }
};
