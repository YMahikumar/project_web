import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import StudentLogin from './components/StudentLogin';
import StudentDetails from './components/StudentDetails';
import StudentRegistration from './components/StudentRegistration';
import StudentForgetPassword from './components/StudentForgetPassword';
import StudentResetPassword from './components/StudentResetPassword';
import StaffLogin from './components/StaffLogin';
import StaffDetails from './components/StaffDetails';
import StaffRegistration from './components/StaffRegistration';
import StaffForgetPassword from './components/StaffForgetPassword';
import StaffResetPassword from './components/StaffResetPassword';

const App = () => {
  useEffect(() => {
    // Clear localStorage when App component mounts
    localStorage.clear();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-forget-password" element={<StudentForgetPassword />} />
        <Route path="/student-reset-password" element={<StudentResetPassword />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-details" element={<StaffDetails />} />
        <Route path="/staff-registration" element={<StaffRegistration />} />
        <Route path="/staff-forget-password" element={<StaffForgetPassword />} />
        <Route path="/staff-reset-password" element={<StaffResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
