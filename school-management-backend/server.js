const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const studentRoutes = require('./routes/student'); // Correctly import student routes
const staffRoutes = require('./routes/staff'); // Correctly import staff routes

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors());
console.log('Student Routes:', studentRoutes);
console.log('Staff Routes:', staffRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/school_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
