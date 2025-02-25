import React, { useState } from "react";
import { Button, Table, Title, TextInput, Textarea, MultiSelect, Modal, TagsInput} from "@mantine/core";

const ManageProjects = ({ project, setProject }) => {
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
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProject = () => {
    if (!formData.name.trim()) return;

    const newProject = {
      id: project.length + 1,
      ...formData,
    };

    setProject([...project, newProject]);
    resetForm();
  };

  const handleEditProject = (id) => {
    const projectToEdit = project.find((proj) => proj.id === id);
    if (!projectToEdit) return;

    setFormData(projectToEdit);
    setEditingProjectId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!formData.name.trim()) return;

    const updatedProjects = project.map((proj) =>
      proj.id === editingProjectId ? { ...proj, ...formData } : proj
    );

    setProject(updatedProjects);
    resetForm();
  };

  const handleDeleteProject = (id) => {
    setProject(project.filter((proj) => proj.id !== id));
  };

  const resetForm = () => {
    setFormData({
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
    setEditingProjectId(null);
    setShowForm(false);
  };

  return (
    <div className="section">
      <Title order={2}>Manage Projects</Title>
      <Button onClick={() => setShowForm(true)} className="action-button">Upload New Project</Button>

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
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {project.map((proj) => (
              <tr key={proj.id}>
                <td>{proj.name}</td>
                <td>{proj.description}</td>
                <td>
                  <Button onClick={() => handleEditProject(proj.id)}>Edit</Button>
                  <Button color="red" onClick={() => handleDeleteProject(proj.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageProjects;
