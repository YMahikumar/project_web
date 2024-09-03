const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,
  guardianName: String,
  guardianPhoneNumber: String,
  address: String,
  currentClass: String,
  previousClass: String,
  previousClassGrade: String,
  previousSchool: String
});

module.exports = mongoose.model('Student', studentSchema);
