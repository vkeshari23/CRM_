import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";
import { hashPassword, comparePassword } from "../utils/password.js";

const generateToken = (employee) => {
  return jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const employee = await Employee.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Employee registered successfully",
      token: generateToken(employee),
      employee: { id: employee._id, name: employee.name, email: employee.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const employee = await Employee.findOne({ email: email.toLowerCase() });
    if (!employee) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(employee),
      employee: { id: employee._id, name: employee.name, email: employee.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
