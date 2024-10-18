import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Form,
  Button,
  Table,
  Col,
  Row,
  Container,
  FormControl,
} from "react-bootstrap";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyen Van A", code: "CODE12345", status: "Active" },
    { id: 2, name: "Tran Van B", code: "CODE67890", status: "In-active" },
  ]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Q6: Add student to the top of the list
  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: studentName,
      code: studentCode,
      status: isActive ? "Active" : "In-active",
    };
    setStudents([newStudent, ...students]); // Add to the top of the list
    setStudentName("");
    setStudentCode("");
    setIsActive(false);
  };

  // Q7: Delete a student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    setSelectedStudents(
      selectedStudents.filter((studentId) => studentId !== id)
    );
  };

  // Q8: Update selected students count
  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // Q9: Clear all students
  const handleClearAll = () => {
    setStudents([]);
    setSelectedStudents([]);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Total Selected Student: {selectedStudents.length} </h2>
        </Col>
        <Col>
          <Button onClick={handleClearAll}>Clear</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FormControl
            className="mb-2"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          ></FormControl>
          <FormControl
            placeholder="Student Code"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          ></FormControl>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label={"Still Active"}
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          ></Form.Check>
        </Col>
        <Col>
          <Button onClick={handleAddStudent}>Add</Button>
        </Col>
      </Row>

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
            <tr key={student.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleSelectStudent(student.id)}
                ></Form.Check>
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                <Button
                  style={{
                    backgroundColor:
                      student.status === "In-active" ? "green" : "red",
                      opacity: 0.5
                  }} // Chỉ áp dụng opacity cho màu nền
                  className="text-white"             
                >
                  {student.status}
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
