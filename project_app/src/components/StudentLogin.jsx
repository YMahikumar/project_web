import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentLogin.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/students/login', formData);
  
        // Store the student data in sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data.student));
  
        // Redirect to StudentDetails page
        navigate('/student-details');
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ form: error.response.data.msg });
        } else {
          setErrors({ form: 'Server error' });
        }
      }
    }
  };
  
  return (
    <div className="center-box">
      <h1>Student Login</h1>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {errors.form && <p className="error-message">{errors.form}</p>}
        <button type="submit">Submit</button>
      </form>
      <div className="additional-links">
        <Link to="/student-forget-password">Forgot Password?</Link>
        <Link to="/student-registration">New Student Registration</Link>
      </div>
    </div>
  );
};

export default StudentLogin;
