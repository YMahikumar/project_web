// routes/staff.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Staff = require('../models/staffModel'); // Import your Staff model
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, ...rest } = req.body;

  try {
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ msg: 'Staff already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new Staff({
      email,
      password: hashedPassword,
      ...rest,
    });

    await newStaff.save();
    res.status(201).json({ msg: 'Staff registered successfully' });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).json({ msg: 'Email already exists' });
    } else {
      res.status(500).json({ msg: 'Server error' });
    }
  }
});

// Login Route (if needed, similar to student login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Generate JWT if needed
    const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, staff });

  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
