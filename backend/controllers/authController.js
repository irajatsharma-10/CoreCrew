const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create and save the new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and success message
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        // Handle errors and respond with a 500 status
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token
        res.json({ token });
    } catch (error) {
        // Handle errors and respond with a 500 status
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
