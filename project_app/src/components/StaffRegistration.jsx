 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    department: '',
    highestQualification: '',
    workExperience: '',
    previousSchool: '',
    currentCTC: '',
    expectedCTC: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
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
      address,
      department,
      highestQualification,
      workExperience,
      password,
      confirmPassword,
    } = formData;

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email Address is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!address) newErrors.address = 'Address is required';
    if (!department) newErrors.department = 'Department is required';
    if (!highestQualification) newErrors.highestQualification = 'Highest Qualification is required';

    if (parseInt(workExperience) > 0 && !formData.previousSchool) {
      newErrors.previousSchool = 'Previous School is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 10 characters long and contain letters, numbers, and special characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add registration logic here
      console.log(formData);
      // Show success message
      toast.success('You have successfully registered!', {
        autoClose: 3000, // Close the toast after 3 seconds
        onClose: () => navigate('/staff-login') // Redirect to login page after toast is closed
      });
    }
  };

  return (
    <div>
      <h1>New Staff Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
        </label>
        <br />
        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <p style={{ color: 'red' }}>{errors.dateOfBirth}</p>}
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </label>
        <br />
        <label>
          Department:
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="Social">Social</option>
          </select>
          {errors.department && <p style={{ color: 'red' }}>{errors.department}</p>}
        </label>
        <br />
        <label>
          Highest Qualification:
          <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} />
          {errors.highestQualification && <p style={{ color: 'red' }}>{errors.highestQualification}</p>}
        </label>
        <br />
        <label>
          Work Experience (in years):
          <input type="number" name="workExperience" value={formData.workExperience} onChange={handleChange} />
        </label>
        <br />
        {parseInt(formData.workExperience) > 0 && (
          <>
            <label>
              Previous School:
              <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} />
              {errors.previousSchool && <p style={{ color: 'red' }}>{errors.previousSchool}</p>}
            </label>
            <br />
            <label>
              Current CTC:
              <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleChange} />
            </label>
            <br />
          </>
        )}
        <label>
          Expected CTC:
          <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          <label>
            <input type="checkbox" onChange={togglePasswordVisibility} /> Show Password
          </label>
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default StaffRegistration;
