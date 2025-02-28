import React, { useState } from "react";
import { Button, TextInput, Textarea, MultiSelect } from "@mantine/core";
import "./ManageStudents.css";

const ManageProjects = ({ projects, setProjects }) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoURL, setNewVideoURL] = useState("");
  const [newCodeLink, setNewCodeLink] = useState("");
  const [newLanguages, setNewLanguages] = useState([]);
  const [newNotes, setNewNotes] = useState("");
  const [newStudentName, setNewStudentName] = useState(""); // New field for student name
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleAddProject = () => {
    if (!newProjectName.trim() || !newStudentName.trim() || !newDescription.trim()) return;

    const newProject = {
      id: projects.length + 1,
      name: newProjectName,
      description: newDescription,
      videoURL: newVideoURL,
      codeLink: newCodeLink,
      languages: newLanguages,
      notes: newNotes,
      studentName: newStudentName, // Storing student name
    };

    setProjects([...projects, newProject]);
    resetForm();
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setNewProjectName(projectToEdit.name);
    setNewDescription(projectToEdit.description);
    setNewVideoURL(projectToEdit.videoURL);
    setNewCodeLink(projectToEdit.codeLink);
    setNewLanguages(projectToEdit.languages);
    setNewNotes(projectToEdit.notes);
    setNewStudentName(projectToEdit.studentName); // Pre-fill student name
    setEditingProjectId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!newProjectName.trim() || !newStudentName.trim() || !newDescription.trim()) return;

    const updatedProjects = projects.map((project) =>
      project.id === editingProjectId
        ? { ...project, name: newProjectName, description: newDescription, videoURL: newVideoURL, codeLink: newCodeLink, languages: newLanguages, notes: newNotes, studentName: newStudentName }
        : project
    );

    setProjects(updatedProjects);
    resetForm();
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const resetForm = () => {
    setNewProjectName("");
    setNewDescription("");
    setNewVideoURL("");
    setNewCodeLink("");
    setNewLanguages([]);
    setNewNotes("");
    setNewStudentName(""); // Reset student name field
    setEditingProjectId(null);
    setShowForm(false);
  };

  return (
    <div className="section">
      <h2>Manage Projects</h2>

      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Project
      </Button>

      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>{editingProjectId ? "Edit Project" : "Create New Project"}</h3>
            <TextInput
              label="Project Name "
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              required
            />
            <TextInput
              label="Student Name "
              placeholder="Enter student name"
              value={newStudentName}
              onChange={(event) => setNewStudentName(event.target.value)}
              required
            />
            <Textarea
              label="Description "
              placeholder="Enter project description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              required
            />
            <TextInput
              label="Presentation Video URL"
              placeholder="Enter URL"
              value={newVideoURL}
              onChange={(event) => setNewVideoURL(event.target.value)}
            />
            <TextInput
              label="Code Access Link"
              placeholder="Enter URL"
              value={newCodeLink}
              onChange={(event) => setNewCodeLink(event.target.value)}
            />
            <MultiSelect
              label="Coding Languages Used"
              data={['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Ruby', 'PHP', 'Swift', 'TypeScript', 'Rust', 'Kotlin', 'R', 'Scratch/Block Based', 'SQL',]}
              value={newLanguages}
              onChange={setNewLanguages}
              required
            />
            <Textarea
              label="Notes"
              placeholder="Enter any notes"
              value={newNotes}
              onChange={(event) => setNewNotes(event.target.value)}
            />
            <Button fullWidth mt="md" onClick={editingProjectId ? handleSaveEdit : handleAddProject}>
              {editingProjectId ? "Save Changes" : "Submit"}
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
              <th>Project Name</th>
              <th>Student Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.studentName}</td> {/* Displaying student name */}
                <td>{project.description}</td>
                <td className="actions-column">
                  <Button
                    className="edit-btn"
                    size="xs"
                    onClick={() => handleEditProject(project.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete-btn"
                    size="xs"
                    onClick={() => handleDeleteProject(project.id)}
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

export default ManageProjects;
