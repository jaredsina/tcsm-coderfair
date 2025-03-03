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

      {/* Modal for Creating/Editing Projects */}
      <Modal opened={showForm} onClose={resetForm} title={editingProjectId ? "Edit Project" : "Create New Project"} centered overlayProps={{ style: { zIndex: 7000 } }}
        zIndex={8000}>
        <MultiSelect
          label="Student Name(s)"
          placeholder="Select students involved in the project"
          data={studentNames}
          value={formData.student_names}
          onChange={(value) => handleChange("student_names", value)}
          searchable
          creatable
          getCreateLabel={(query) => `+ Add ${query}`}
          required
        />
        <TextInput label="Project Name" placeholder="Name for the app or project" value={formData.name} onChange={(event) => handleChange("name", event.target.value)} required />
        <Textarea label="Description" placeholder="Describe what the project does" value={formData.description} onChange={(event) => handleChange("description", event.target.value)} required />
        <TextInput label="Presentation Video URL" placeholder="Youtube or other videoplayer link" value={formData.presentation_video_url} onChange={(event) => handleChange("presentation_video_url", event.target.value)} />
        <TextInput label="Code Access Link" placeholder="Link to repository or project" value={formData.code_access_link} onChange={(event) => handleChange("code_access_link", event.target.value)} required />
        <MultiSelect searchable creatable label="Coding Languages Used" placeholder="Pick all languages utilized" data={['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Swift', 'PHP', 'Lua', 'Scratch']} value={formData.coding_language} onChange={(value) => handleChange("coding_language", value)} required />
        <Textarea label="Notes" placeholder="What did the student learn from this" value={formData.notes} onChange={(event) => handleChange("notes", event.target.value)} />
        <Button fullWidth mt="md" onClick={editingProjectId ? handleSaveEdit : handleAddProject}>{editingProjectId ? "Save Changes" : "Submit"}</Button>
        <Button fullWidth mt="md" color="gray" onClick={resetForm}>Cancel</Button>
      </Modal>

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
