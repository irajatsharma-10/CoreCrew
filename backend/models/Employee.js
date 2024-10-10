const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    salary: { type: Number, required: true },
    status: { type: String, default: 'active' },
    uniqueId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports =mongoose.model('Employee', EmployeeSchema);
