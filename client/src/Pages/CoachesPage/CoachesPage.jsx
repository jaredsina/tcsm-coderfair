import React, { useState } from "react";
import { Container, Title, Divider, Grid } from "@mantine/core";
import ManageProjects from "../../Components/ManageProjects";
import ManageStudents from "../../Components/ManageStudents";
import ManageGrades from "../../Components/ManageGrades";
import "./CoachesPage.css";

const CoachesPage = () => {
  
  return (
    <Container className="coaches-container">
      <Title className="coaches-title">Coach Dashboard</Title>
      <Divider className="section-divider" />

      <Grid>
        {/* Manage Projects Component */}
        <Grid.Col span={12} md={5} lg={5}>
          <ManageProjects />
        </Grid.Col>

        {/* Manage Students Component */}
        <Grid.Col span={12} md={5} lg={5}>
          <ManageStudents />
        </Grid.Col>
      </Grid>

      <Divider className="section-divider" />

      {/* Manage Grades Component */}
      <ManageGrades />
    </Container>
  );
};

export default CoachesPage;
