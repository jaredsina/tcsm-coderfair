import React from "react";
import { Card, Text, Group, Badge, Button, Box } from "@mantine/core";
import "./ResultCard.css";
import { Link } from "react-router-dom";

const ResultCard = ({
  awardName = "Award Name",
  projects = ["Project 1", "Project 2", "Project 3"],
}) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="result-card"
    >
      {/* Award Name */}
      <Group position="apart" mt="md" mb="xs">
        <Text fw={600} size="1.5rem">
          {awardName}
        </Text>
        <Badge color="green" size="lg">
          Top 3
        </Badge>
      </Group>

      {/* Project Boxes */}
      <Box mt="lg" className="project-boxes">
        {projects?.map((project, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="md"
            radius="md"
            className="project-box"
          >
            <Text size="md" fw={500}>
              {project}
            </Text>
          </Card>
        ))}
      </Box>

      {/* View More Button */}
      <Link to="/projects" className="link">
      <Button color="green" fullWidth mt="xl" radius="md" size="md">
        View All Projects
      </Button>
      </Link>
    </Card>
  );
};

export default ResultCard;
