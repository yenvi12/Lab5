import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`https://student-api-nestjs.onrender.com/students/${id}`)
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Student Code:</strong> {student.studentCode}</p>
      <p><strong>Status:</strong> {student.isActive ? 'Active' : 'In-active'}</p>
      <Button onClick={() => window.history.back()}>Back</Button>
    </Container>
  );
};

export default StudentDetail;