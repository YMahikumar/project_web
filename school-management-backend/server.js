const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/school_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err) => {
  console.error('Connection error', err.message);
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection is open');
});

// Student Schema and Model
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianPhoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  currentClass: { type: String, required: true },
  previousClass: { type: String },
  previousClassGrade: { type: String },
  previousSchool: { type: String },
  password: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { email, password, ...rest } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Student already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      email,
      password: hashedPassword,
      ...rest,
    });

    await newStudent.save();
    res.status(201).json({ msg: 'Student registered successfully' });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).json({ msg: 'Email already exists' });
    } else {
      res.status(500).json({ msg: 'Server error' });
    }
  }
});

// Login Route
app.post('/login', async (req, res) => {
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

    // const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token, student });
  } catch (error) {
    // if (error.name === 'JsonWebTokenError') {
    //   res.status(400).json({ msg: 'Invalid token. Please log in again.' });
    // } else if (error.name === 'MongoError') {
    //   res.status(500).json({ msg: 'Database error. Please try again later.' });
    // } else {
    //   res.status(500).json({ msg: 'Server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
