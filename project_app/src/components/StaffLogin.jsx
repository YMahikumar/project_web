import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StaffLogin.css';

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulating a successful login
      alert('Form submitted successfully');
      navigate('/staff-details'); // Redirect to the staff details page
    }
  };

  return (
    <div className="center-box">
      <h1>Staff Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
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
        <Link to="/staff-forget-password">Forgot Password?</Link>
        <Link to="/staff-registration">New Staff Registration</Link>
      </div>
    </div>
  );
};

export default StaffLogin;
