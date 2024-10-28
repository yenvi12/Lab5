import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Col,
  Row,
  Container,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import StudentDetail from "./components/StudentDetail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    studentCode: "",
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    axios
      .get("https://student-api-nestjs.onrender.com/students")
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching student list:", error);
      });
  }, []);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [name, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleAddStudent = (e) => {
    e.preventDefault();
    console.log(student);
    // API call to add new student
    axios
      .post("https://student-api-nestjs.onrender.com/students", student)
      .then((response) => {
        setStudents([...students, response.data.data]); // Cập nhật danh sách sinh viên
        setStudent({ name: "", studentCode: "", isActive: false }); // Reset form
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const handleDeleteStudent = (id) => {
    axios
      .delete(`https://student-api-nestjs.onrender.com/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student._id !== id));
        setSelectedStudents(
          selectedStudents.filter((studentId) => studentId !== id)
        );
        console.log("Student deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleClearAll = () => {
    setStudents([]);
    setSelectedStudents([]);
  };

  return (
    <Router>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Total Selected Student: {selectedStudents.length}</h2>
          </Col>
          <Col>
            <Button onClick={handleClearAll}>Clear</Button>
          </Col>
        </Row>

        <Form onSubmit={handleAddStudent} className="student-form">
          <Row className="mt-5">
            <Col>
              <FormControl
                type="text"
                className="mb-2"
                placeholder="Full Name"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />
              <FormControl
                type="text"
                placeholder="Student Code"
                name="studentCode"
                value={student.studentCode}
                onChange={handleChange}
                required
              />
              <Form.Check
                className="mt-2"
                type="checkbox"
                label={"Active"}
                name="isActive"
                checked={student.isActive}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Button type="submit">Add Student</Button>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleSelectStudent(student._id)}
                  />
                </td>
                <td>
                  
                  <Link
                    to={`/student/${student._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {student.name}
                  </Link>
                </td>
                <td>{student.studentCode}</td>
                <td>
                  <Button
                    style={{
                      backgroundColor: student.isActive ? "green" : "red",
                      opacity: 0.5,
                    }}
                    className="text-white"
                  >
                    {student.isActive ? "Active" : "In-active"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Định nghĩa Route cho StudentDetail */}
      <Routes>
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
