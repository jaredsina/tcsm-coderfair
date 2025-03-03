import React, { useState } from "react";
import { Button, Table, Title, TextInput, Textarea, MultiSelect, Modal, TagsInput, Autocomplete } from "@mantine/core";
import Delete from "./Delete";
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
  const [formData, setFormData] = useState({
    student_names: [], // Changed to array for multiple students
    coderfair_id: "",
    name: "",
    description: "",
    presentation_video_url: "",
    code_access_link: "",
    coding_language: [],
    project_username: "",
    project_password: "",
    notes: "",
  });

  const studentNames = [
    'Joshua Sambol',
    'Joshua Sambol1',
    'Joshua Sambol2',
    'Joshua Sambol3',
    'Joshua Sambol4',
    'Joshua Sambol5',
    'Joshua Sambol6',
    'Joshua Sambol7',
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    if (!formData.name.trim() || !formData.description.trim()) return;

    const newProject = {
      id: Date.now(),
      studentNames: formData.student_names, // Now an array of student names
      name: formData.name,
      description: formData.description,
      videoURL: formData.presentation_video_url,
      codeLink: formData.code_access_link,
      languages: formData.coding_language,
      notes: formData.notes,
    };

    setProjects([...projects, newProject]);
    resetForm();
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setFormData({
      ...formData,
      student_names: projectToEdit.studentNames, // Now handling array of names
      name: projectToEdit.name,
      description: projectToEdit.description,
      presentation_video_url: projectToEdit.videoURL,
      code_access_link: projectToEdit.codeLink,
      coding_language: projectToEdit.languages,
      notes: projectToEdit.notes,
    });
    setEditingProjectId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!formData.name.trim() || !formData.description.trim()) return;

    const updatedProjects = projects.map((project) =>
      project.id === editingProjectId
        ? {
          ...project,
          studentNames: formData.student_names, // Now handling array of names
          name: formData.name,
          description: formData.description,
          videoURL: formData.presentation_video_url,
          codeLink: formData.code_access_link,
          languages: formData.coding_language,
          notes: formData.notes,
        }
        : project
    );

    setProjects(updatedProjects);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      student_names: [],
      coderfair_id: "",
      name: "",
      description: "",
      presentation_video_url: "",
      code_access_link: "",
      coding_language: [],
      project_username: "",
      project_password: "",
      notes: "",
    });
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

      {/* Project Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Student Name(s)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.studentNames?.join(", ")}</td>
                <td className="actions-column">
                  <Button
                    color="blue"
                    size="s"
                    onClick={() => handleEditProject(project.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="s"
                    color="red"
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
