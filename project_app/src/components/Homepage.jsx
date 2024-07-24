import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';  // Ensure the correct path if using a different filename

const Homepage = () => {
  return (
    <div className="container">
      <h1 className="text-center text-black mt-5">Welcome to Our Portal</h1>
      <div className="center-box">        
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/student-login" className="btn btn-primary w-100">Student Login</Link>
          </li>
          <li className="mb-3">
            <Link to="/staff-login" className="btn btn-secondary w-100">Staff Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Homepage;


