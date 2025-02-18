import React from "react";
import { Button, Table, Title } from "@mantine/core";

const ManageProjects = ({ projects, setProjects }) => {
  const addProject = () => {
    const newProject = { id: projects.length + 1, name: "New Project", student: "New Student" };
    setProjects([...projects, newProject]);
  };

  const editProject = (id) => {
    setProjects(projects.map((proj) => (proj.id === id ? { ...proj, name: "Updated Project" } : proj)));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  return (
    <div className="section">
      <Title order={2}>Manage Projects</Title>
      <Button onClick={addProject} className="action-button">Upload New Project</Button>
      <div className="table-container">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Student</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.student}</td>
                <td>
                  <Button onClick={() => editProject(project.id)}>Edit</Button>
                  <Button color="red" onClick={() => deleteProject(project.id)}>Delete</Button>
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
