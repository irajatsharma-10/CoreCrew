const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
    const userId = req.userId;
    const employees = await Employee.find({userId: userId});
    res.json(employees);
};

exports.createEmployee = async (req, res) => {
    const { name, email, phone, salary, status, uniqueId } = req.body;
    // fetch the userId from the req object that has been sent to the req object object as a payload 
    const userId = req.userId;
    const employee = new Employee({ name, email, phone, salary, status, uniqueId, userId });
    await employee.save();
    res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEmployee);
};

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
};
