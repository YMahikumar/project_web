import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaffForgetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to verify username and date of birth
    navigate('/staff-reset-password'); // Navigate to reset password page if verification is successful
  }

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dob" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StaffForgetPassword;
