import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './StudentForgetPassword.css';

const StudentForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.dob.trim()) newErrors.dob = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const registeredStudents = JSON.parse(localStorage.getItem('students')) || {};
      const { email, dob } = formData;
      
      if (registeredStudents[email] && registeredStudents[email].dateOfBirth === dob) {
        // If verification is successful, navigate to reset password page with email as query param
        navigate(`/student-reset-password?email=${email}`);
      } else {
        // If verification fails, display error message
        setErrors({ form: 'Invalid email or date of birth' });
      }
    }
  };

  return (
    <div className="center-box">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && <p className="error-message">{errors.dob}</p>}
        </div>
        {errors.form && <p className="error-message">{errors.form}</p>}
        <button type="submit">Submit</button>
      </form>
      <div className="additional-links">
        <Link to="/student-login">Back to Login</Link>
        <Link to="/student-registration">New Student Registration</Link>
      </div>
    </div>
  );
}

export default StudentForgetPassword;

