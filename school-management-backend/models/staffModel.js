const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the staff schema
const staffSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  position: { type: String },
  department: { type: String },
  address: { type: String }
});

// Optional: Middleware to hash the password before saving
staffSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Export the model
module.exports = mongoose.model('Staff', staffSchema);
