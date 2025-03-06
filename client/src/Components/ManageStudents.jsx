import React, { useState, useEffect } from "react";
import { Button, TextInput, Textarea, FileInput, Image, Modal, Alert } from "@mantine/core";
import "./ManageStudents.css";
import { createStudent, deleteStudent, fetchStudents, updateStudent } from "../reducers/studentSlice";
import {useDispatch, useSelector} from "react-redux"

const ManageStudents = () => {
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentBio, setNewStudentBio] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [newStudentImage, setNewStudentImage] = useState(null);
  const [students, setStudents] = useState([{}]);

  const dispatch = useDispatch()

  // Get information from the globale state (store)
  const studentInfo = useSelector(state => state.students.studentInfo)
  const status = useSelector(state=> state.students.status)

  useEffect(()=>{
    // Only fetch students when the page is loaded or when new student is added
    status === "idle" ? dispatch(fetchStudents()) : setStudents([{}]);
    setStudents(studentInfo)
  },[status, dispatch])

  const handleAddStudent = async() => {
    if (!newStudentName.trim()) return;

    const formData = new FormData();
    formData.append("name", newStudentName);
    formData.append("bio", newStudentBio);
    formData.append("avatar_image", newStudentImage);

    try{
      dispatch(createStudent(formData))
      //setStudents([...students, newStudent]);
    }
    catch (error){
      console.log(error)
    }
      
    
    resetForm();
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student._id === id);
    setNewStudentName(studentToEdit.name);
    setNewStudentImage(studentToEdit.image);
    setNewStudentBio(studentToEdit.bio);
    setEditingStudentId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!newStudentName.trim()) return;
    
    const formData = new FormData();

    formData.append("name", newStudentName);
    formData.append("bio", newStudentBio);
    formData.append("avatar_image", newStudentImage);

    dispatch(updateStudent({"_id": editingStudentId, "updatedStudentData": formData}))
    //setStudents(updatedStudents);
    resetForm();
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id))
  };

  const resetForm = () => {
    setNewStudentName("");
    setNewStudentBio("");
    setNewStudentImage(null);
    setEditingStudentId(null);
    setShowForm(false);
  };

  return (
    <div className="section">
      <h2>Manage Students</h2>

      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Student Account
      </Button>

      <Modal
        opened={showForm}
        onClose={resetForm}
        title={editingStudentId ? "Edit Student" : "Create New Student"}
        centered
        overlayProps={{ style: { zIndex: 7000 } }}
        zIndex={8000}
      >
        {editingStudentId ? null : <TextInput
          required
          label="Student Name"
          placeholder="Enter student name"
          value={newStudentName}
          onChange={(event) => setNewStudentName(event.target.value)}
        />}
        <Alert variant="light" color="red" title="Warning">Do not update student images often!</Alert>
         <FileInput
          size="md"
          radius="xl"
          label="Student Image"
          placeholder="Click to upload image"
          onChange={(file) => setNewStudentImage(file)}
          accept="image/*"
        />
        <Textarea
          required
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
      </Modal>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bio</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.bio}</td>
                <td>
                  {student.avatar_image ? (
                    <Image
                      src={student.avatar_image}
                      alt={`${student.name}'s photo`}
                      width={100}
                      height={100}
                      fit="contain"
                    />
                  ) : (
                    <div>No image</div>
                  )}
                </td>
                <td className="actions-column">
                  <Button
                    color="blue"
                    size="s"
                    onClick={() => handleEditStudent(student._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="s"
                    color="red"
                    onClick={() => handleDeleteStudent(student._id)}
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
