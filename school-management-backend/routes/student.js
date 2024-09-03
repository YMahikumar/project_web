const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    guardianName,
    guardianPhoneNumber,
    address,
    currentClass,
    previousClass,
    previousClassGrade,
    previousSchool,
    password,
    confirmPassword
  } = req.body;

  try {
    // Validate input
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new student
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      guardianName,
      guardianPhoneNumber,
      address,
      currentClass,
      previousClass,
      previousClassGrade,
      previousSchool,
      password: hashedPassword
    });

    await newStudent.save();

    res.status(201).json({ msg: 'Student registered successfully' });

  } catch (error) {
    console.error('Registration error:', error); // Detailed error logging
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, student });

  } catch (error) {
    console.error('Login error:', error); // Detailed error logging
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

