import React, { useState } from "react";
import { Button, Table, Title, TextInput, Textarea, MultiSelect, Modal, TagsInput} from "@mantine/core";
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
    student_id: "",
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
  
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
        

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

      {/* Modal for Creating/Editing Projects */}
      <Modal opened={showForm} onClose={resetForm} title={editingProjectId ? "Edit Project" : "Create New Project"} centered overlayProps={{ style: { zIndex: 7000 } }}
        zIndex={8000}>
        <TextInput label="Project Name" placeholder="Name for the app or prject" value={formData.name} onChange={(event) => handleChange("name", event.target.value)} required />
        <Textarea label="Description" placeholder="Describe what the project does" value={formData.description} onChange={(event) => handleChange("description", event.target.value)} required />
        <TextInput label="Presentation Video URL" placeholder="Youtube or other videoplayer link" value={formData.presentation_video_url} onChange={(event) => handleChange("presentation_video_url", event.target.value)} required />
        <TextInput label="Code Access Link" placeholder="Link to repository or project" value={formData.code_access_link} onChange={(event) => handleChange("code_access_link", event.target.value)} required />
        <MultiSelect label="Coding Languages Used" placeholder="Pick all languages utilized" data={['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Swift', 'PHP', 'Lua', 'Scratch']} value={formData.coding_language} onChange={(value) => handleChange("coding_language", value)} required /> 
        {/* <TextInput label="Project Username????" value={formData.project_username} onChange={(event) => handleChange("project_username", event.target.value)} />
        <TextInput label="Project Password????" value={formData.project_password} onChange={(event) => handleChange("project_password", event.target.value)} type="password" /> */}
        {/* <TagsInput label="Enter all code languages utilized" placeholder="Enter tag" /> */}
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
                    onClick={() => {/*handleDeleteProject(project.id)*/} }
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
