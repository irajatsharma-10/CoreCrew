import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeeReducer from './slices/employeeSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        employee: employeeReducer,
    },
});
