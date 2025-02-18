import React, { useState } from "react";
import { Container, Title, Divider, Grid } from "@mantine/core";
import ManageProjects from "../../Components/ManageProjects";
import ManageStudents from "../../Components/ManageStudents";
import ManageGrades from "../../Components/ManageGrades";
import "./CoachesPage.css";

const CoachesPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", student: "John Doe" },
    { id: 2, name: "Project Beta", student: "Jane Smith" }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "A", bio: "Great student!" },
    { id: 2, name: "Jane Smith", grade: "B", bio: "Needs improvement." }
  ]);

  const [grades, setGrades] = useState([
    { id: 1, project: "Project Alpha", grade: "A" },
    { id: 2, project: "Project Beta", grade: "B" }
  ]);

  return (
    <Container className="coaches-container">
      <Title className="coaches-title">Coach Dashboard</Title>
      <Divider className="section-divider" />

      <Grid>
        <Grid.Col span={12} md={5} lg={5}>
          <ManageProjects projects={projects} setProjects={setProjects} />
        </Grid.Col>

        <Grid.Col span={12} md={5} lg={5}>
          <ManageStudents students={students} setStudents={setStudents} />
        </Grid.Col>
      </Grid>

      <Divider className="section-divider" />

      <ManageGrades grades={grades} setGrades={setGrades} />
    </Container>
  );
};

export default CoachesPage;
