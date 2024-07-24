// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './StudentLogin.css';

// const StudentLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.password.trim()) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const registeredUsers = JSON.parse(localStorage.getItem('students')) || {};
//       const { email, password } = formData;

//       if (registeredUsers[email] && registeredUsers[email].password === password) {
//         // Store user details in session storage for use in StudentDetails page
//         sessionStorage.setItem('loggedInUser', JSON.stringify(registeredUsers[email]));
//         navigate('/student-details');
//       } else {
//         setErrors({ form: 'Invalid email or password' });
//       }
//     }
//   };

//   return (
//     <div className="center-box">
//       <h1>Student Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.email && <p className="error-message">{errors.email}</p>}
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {errors.password && <p className="error-message">{errors.password}</p>}
//         </div>
//         {errors.form && <p className="error-message">{errors.form}</p>}
//         <button type="submit">Submit</button>
//       </form>
//       <div className="additional-links">
//         <Link to="/student-forget-password">Forgot Password?</Link>
//         <Link to="/student-registration">New Student Registration</Link>
//       </div>
//     </div>
//   );
// }

// export default StudentLogin;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        const response = await axios.post('http://localhost:5000/login', formData);
        const { token, student } = response.data;
        // Store token in sessionStorage for authentication
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('loggedInUser', JSON.stringify(student));
        navigate('/student-details');
      } catch (error) {
        // console.error('Login error:', error);
        if (error.response) {
          setErrors({ form: error.response.data.msg });
        } 
        // else {
        //   setErrors({ form: 'Server error. Please try again later.' });
        // }
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
