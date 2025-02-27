import React, { useState } from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import "./ManageStudents.css";

const ManageStudents = ({ students, setStudents }) => {
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentUsername, setNewStudentUsername] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentBio, setNewStudentBio] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;

    const newStudent = {
      id: students.length + 1,
      name: newStudentName,
      username: newStudentUsername,
      email: newStudentEmail,
      bio: newStudentBio,
    };

    setStudents([...students, newStudent]);
    resetForm();
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setNewStudentName(studentToEdit.name);
    setNewStudentUsername(studentToEdit.username);
    setNewStudentEmail(studentToEdit.email);
    setNewStudentBio(studentToEdit.bio);
    setEditingStudentId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!newStudentName.trim()) return;

    const updatedStudents = students.map((student) =>
      student.id === editingStudentId
        ? {
          ...student,
          name: newStudentName,
          username: newStudentUsername,
          email: newStudentEmail,
          bio: newStudentBio
        }
        : student
    );

    setStudents(updatedStudents);
    resetForm();
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const resetForm = () => {
    setNewStudentName("");
    setNewStudentUsername("");
    setNewStudentEmail("");
    setNewStudentBio("");
    setEditingStudentId(null);
    setShowForm(false);
  };

  return (
    <div className="section">
      <h2>Manage Students</h2>

      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Student Account
      </Button>

      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>{editingStudentId ? "Edit Student" : "Create New Student"}</h3>
            <TextInput
              label="Student Name"
              placeholder="Enter student name"
              value={newStudentName}
              onChange={(event) => setNewStudentName(event.target.value)}
              required
            />
            <TextInput
              label="Username"
              placeholder="Enter Username"
              value={newStudentUsername}
              onChange={(event) => setNewStudentUsername(event.target.value)}
            />
            <TextInput label="Email"
              placeholder="Email" mt="md"
              value={newStudentEmail}
              onChange={(event) => setNewStudentEmail(event.target.value)} />

            <Textarea
              label="Student Bio"
              placeholder="Enter student bio"
              value={newStudentBio}
              onChange={(event) => setNewStudentBio(event.target.value)}
            />
            <Button fullWidth mt="md" onClick={editingStudentId ? handleSaveEdit : handleAddStudent}>
              {editingStudentId ? "Save Changes" : "Submit"}
            </Button>
            <Button
              fullWidth
              mt="md"
              color="gray"
              onClick={resetForm}
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
              <th>Username</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.username}</td>
                <td>{student.email}</td>
                <td>{student.bio}</td>
                <td className="actions-column">
                  <Button
                    color="blue"
                    size="s"
                    onClick={() => handleEditStudent(student.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="s"
                    color="red"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
