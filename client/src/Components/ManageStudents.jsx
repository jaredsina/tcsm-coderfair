import React, { useState } from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import "./ManageStudents.css"; // We'll add custom styles for the pop-out effect

const ManageStudents = ({ students, setStudents }) => {
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("");
  const [newStudentBio, setNewStudentBio] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return; // Prevent adding empty students

    const newStudent = {
      id: students.length + 1,
      name: newStudentName,
      grade: newStudentGrade || "N/A", // Default to "N/A" if empty
      bio: newStudentBio,
    };

    setStudents([...students, newStudent]);

    setNewStudentName("");
    setNewStudentGrade("");
    setNewStudentBio("");
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="section">
      <h2>Manage Students</h2>

      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Student Account
      </Button>

      {/* Pop-out form */}
      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Student</h3>
            <TextInput
              label="Student Name"
              placeholder="Enter student name"
              value={newStudentName}
              onChange={(event) => setNewStudentName(event.target.value)}
              required
            />
            <TextInput
              label="Grade"
              placeholder="Enter grade (optional)"
              value={newStudentGrade}
              onChange={(event) => setNewStudentGrade(event.target.value)}
            />
            <Textarea
              label="Student Bio"
              placeholder="Enter student bio"
              value={newStudentBio}
              onChange={(event) => setNewStudentBio(event.target.value)}
            />
            <Button fullWidth mt="md" onClick={handleAddStudent}>
              Submit
            </Button>
            <Button
              fullWidth
              mt="md"
              color="gray"
              onClick={() => setShowForm(false)} // Close the pop-up
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.bio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
