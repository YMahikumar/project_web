import React, { useEffect, useState } from 'react';

const StudentDetails = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setStudentData(loggedInUser);
    }
  }, []);

  if (!studentData) {
    return <div>No student data found. Please log in.</div>;
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div className="student-details">
        <p><strong>First Name:</strong> {studentData.firstName}</p>
        <p><strong>Last Name:</strong> {studentData.lastName}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
        <p><strong>Phone Number:</strong> {studentData.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> {studentData.dateOfBirth}</p>
        <p><strong>Gender:</strong> {studentData.gender}</p>
        <p><strong>Guardian Name:</strong> {studentData.guardianName}</p>
        <p><strong>Guardian Phone Number:</strong> {studentData.guardianPhoneNumber}</p>
        <p><strong>Address:</strong> {studentData.address}</p>
        <p><strong>Current Class:</strong> {studentData.currentClass}</p>
        {studentData.currentClass && studentData.currentClass !== '1' && (
          <>
            <p><strong>Previous Class:</strong> {studentData.previousClass}</p>
            <p><strong>Previous Class Grade:</strong> {studentData.previousClassGrade}</p>
            <p><strong>Previous School:</strong> {studentData.previousSchool}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
