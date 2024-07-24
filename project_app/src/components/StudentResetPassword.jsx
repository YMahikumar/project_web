import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email'); // Get email from query params

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Fetch data from local storage and ensure it's an object
    const students = JSON.parse(localStorage.getItem('students')) || {};

    if (!students[email]) {
      setError('No student data available');
      return;
    }

    // Update password
    students[email].password = newPassword;

    // Save updated data to local storage
    localStorage.setItem('students', JSON.stringify(students));

    // Redirect to login page
    navigate('/student-login');
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default StudentResetPassword;

