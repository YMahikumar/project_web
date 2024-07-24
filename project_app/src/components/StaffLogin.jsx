import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    navigate('/staff-details'); // Navigate to staff details page on successful login
  }

  return (
    <div>
      <h1>Staff Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <Link to="/staff-forget-password">Forget Password</Link>
        <Link to="/staff-registration">New Staff Registration</Link>
      </div>
    </div>
  );
}

export default StaffLogin;
