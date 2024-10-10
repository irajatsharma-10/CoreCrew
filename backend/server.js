const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/employeeRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/employees', authMiddleware, userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});