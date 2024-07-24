import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaffResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to reset password
    navigate('/staff-login'); // Navigate back to login page after password reset
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input type="password" name="new-password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirm-password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StaffResetPassword;
