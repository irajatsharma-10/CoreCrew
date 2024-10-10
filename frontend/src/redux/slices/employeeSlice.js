import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        removeEmployee: (state, action) => {
            state.employees = state.employees.filter(emp => emp._id !== action.payload);
        },
    },
});

export const { setEmployees, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
