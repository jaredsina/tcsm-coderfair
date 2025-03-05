import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Title, TextInput, Textarea, MultiSelect, Modal, TagsInput, Autocomplete, FileInput, Select } from "@mantine/core";
import Delete from "./Delete";
import { fetchProjects, createProject, deleteProject, updateProject } from "../reducers/projectSlice";

const ManageProjects = () => {
  const [newProjectName, setNewProjectName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoURL, setNewVideoURL] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCodeLink, setNewCodeLink] = useState("");
  const [newLanguages, setNewLanguages] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newProjectImage, setNewProjectImage] = useState(null);
  const [newStudentName, setNewStudentName] = useState(""); // New field for student name
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projects, setProjects] = useState([{}]);

  const dispatch = useDispatch();

  const projectsInfo = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);
  
  console.log(newLanguages)
  useEffect(() => {
    status === "idle" ? dispatch(fetchProjects()) : setProjects([{}]);
    setProjects(projectsInfo);
  }, [status, dispatch]);

  const handleChange = (field, value) => {
    setProjects((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  const handleAddProject = () => {
    if (!newProjectName.trim() || !newStudentName.trim()) return;
  
    const formData = new FormData();

    // Append text fields
    formData.append("name", newProjectName);
    formData.append("student_id", "67afabf22a48fbe8a0448ca8"); // Dynamically change this value
    formData.append("coderfair_id", "67b4f809f02dfc6eecbeed34"); // Dynamically change this value
    formData.append("description", newDescription);
    formData.append("presentation_video_url", newVideoURL);
    formData.append("code_access_link", newCodeLink);
    formData.append("coding_language", newLanguages);
    formData.append("category", "");
    formData.append("project_username", newUsername);
    formData.append("project_password", newPassword);
    formData.append("notes", newNotes);
    
    // Append the image file (assuming `newProjectImage` is a file input)
    formData.append("project_image", newProjectImage);
    

    try {
      dispatch(createProject(formData));
    }
    catch (error) {
      console.log(error);
    }
    resetForm();
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project._id === id);
    setNewProjectName(projectToEdit.name);
    setNewDescription(projectToEdit.description);
    setNewVideoURL(projectToEdit.presentation_video_url);
    setNewCodeLink(projectToEdit.code_access_link);
    console.log(projectToEdit.coding_language);
    // Fix project trying to split an empty array
    setNewLanguages(projectToEdit.coding_language);
    setNewUsername(projectToEdit.project_username);
    setNewPassword(projectToEdit.project_password);
    setNewNotes(projectToEdit.notes);
    setEditingProjectId(id);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!newProjectName.trim()) return;
    //if (!projects.student_id.trim() || !projects.coderfair_id.trim()) return;
    // !! activate these when dynaminc student and coderfair ids are available
    const formData = new FormData();

    // Append text fields
    formData.append("name", newProjectName);
    formData.append("student_id", "67afabf22a48fbe8a0448ca8"); // Dynamically change this value
    formData.append("coderfair_id", "67b4f809f02dfc6eecbeed34"); // Dynamically change this value
    formData.append("description", newDescription);
    formData.append("presentation_video_url", newVideoURL);
    formData.append("code_access_link", newCodeLink);
    formData.append("coding_language", newLanguages);
    formData.append("category", "");
    formData.append("project_username", newUsername);
    formData.append("project_password", newPassword);
    formData.append("notes", newNotes);
    
    // Append the image file (assuming `newProjectImage` is a file input)
    formData.append("project_image", newProjectImage);

    dispatch(updateProject({"_id": editingProjectId, "updatedProjectData": formData}));
    resetForm();
  };

  const resetForm = () => {
    setNewProjectName("");
    setNewStudentName("");
    setNewDescription("");
    setNewVideoURL("");
    setNewCodeLink("");
    setNewLanguages("");
    setNewNotes("");
    setNewUsername("");
    setNewPassword("");
    setNewProjectImage(null);
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
            <FileInput 
            size="md"
            radius="xl"
            label="Project Image"
            placeholder="Click to upload image"
            onChange={(file) => setNewProjectImage(file)}
            accept="image/*"
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
            <Select
              label="Coding Languages Used"
              data={['HTML/CSS/Javascript','React', 'Python', 'Java', 'C++', 'C#', 'C', 'Ruby', 'PHP', 'Swift', 'TypeScript', 'Rust', 'Kotlin', 'R', 'Scratch/Block Based', 'SQL',]}
              value={newLanguages ? newLanguages : null}
              onChange={setNewLanguages}
              styles={{dropdown: { zIndex: 10000 }}}
              clearable
              searchable
              required
            />
            
            <TextInput
            label="Project Username"
            placeholder="Enter username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            />
            <TextInput
            label="Project Password"
            placeholder="Enter password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
            {projects ? projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.student?.[0]?.name || "Can't Find Student Name"}</td>
                <td className="actions-column">
                  <Button
                    color="blue"
                    size="s"
                    onClick={() => handleEditProject(project._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="s"
                    color="red"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Delete
                  </Button>
                  
                </td>
              </tr>
            )):null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjects;
