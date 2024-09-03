import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import Axios for making HTTP requests
import './StudentRegistration.css'; // Import the custom CSS

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    guardianName: '',
    guardianPhoneNumber: '',
    address: '',
    currentClass: '',
    previousClass: '',
    previousClassGrade: '',
    previousSchool: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{6,}$/; // Adjusted password regex for easier validation (min 6 chars)
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
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
      confirmPassword,
    } = formData;

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email Address is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!guardianName) newErrors.guardianName = 'Guardian Name is required';
    if (!guardianPhoneNumber) newErrors.guardianPhoneNumber = 'Guardian Phone Number is required';
    if (!address) newErrors.address = 'Address is required';
    if (!currentClass) newErrors.currentClass = 'Current Class is required';

    if (currentClass && currentClass !== '1') {
      if (!previousClass) newErrors.previousClass = 'Previous Class is required';
      if (!previousClassGrade) newErrors.previousClassGrade = 'Previous Class Grade is required';
      if (!previousSchool) newErrors.previousSchool = 'Previous School is required';
    }

    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!gender) newErrors.gender = 'Gender is required';

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/students/register', formData);
        if (response.status === 201) {
          toast.success('You have successfully registered!', {
            autoClose: 3000,
            onClose: () => navigate('/student-login'),
          });
        } else {
          toast.error('Registration failed. Please try again later.');
        }
      } catch (error) {
        toast.error('Registration failed. Please try again later.');
      }
    }
  };
  

  return (
    <div className="center-box">
      <h1>New Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </label>
        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </label>
        <label>
          Guardian Name:
          <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} />
          {errors.guardianName && <p className="error-message">{errors.guardianName}</p>}
        </label>
        <label>
          Guardian Phone Number:
          <input type="tel" name="guardianPhoneNumber" value={formData.guardianPhoneNumber} onChange={handleChange} />
          {errors.guardianPhoneNumber && <p className="error-message">{errors.guardianPhoneNumber}</p>}
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </label>
        <label>
          Current Class:
          <select name="currentClass" value={formData.currentClass} onChange={handleChange}>
            <option value="">Select Class</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {errors.currentClass && <p className="error-message">{errors.currentClass}</p>}
        </label>
        {formData.currentClass && formData.currentClass !== '1' && (
          <>
            <label>
              Previous Class:
              <select name="previousClass" value={formData.previousClass} onChange={handleChange}>
                <option value="">Select Class</option>
                {[...Array(Number(formData.currentClass) - 1)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors.previousClass && <p className="error-message">{errors.previousClass}</p>}
            </label>
            <label>
              Previous Class Grade:
              <input type="text" name="previousClassGrade" value={formData.previousClassGrade} onChange={handleChange} />
              {errors.previousClassGrade && <p className="error-message">{errors.previousClassGrade}</p>}
            </label>
            <label>
              Previous School:
              <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} />
              {errors.previousSchool && <p className="error-message">{errors.previousSchool}</p>}
            </label>
          </>
        )}
        <div className="password-input-container">
          <label>
            Password:
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="password-input"
            />
            <span className="toggle-password-visibility" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="password-input-container">
          <label>
            Confirm Password:
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="password-input"
            />
            <span className="toggle-password-visibility" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <ToastContainer className="toast-container" />
    </div>
  );
};
export default StudentRegistration;