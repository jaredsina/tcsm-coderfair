import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import "./ProjectCard.css";

const ProjectCard = ({
  title = "Project Name",
  description = "Project Description",
  language = "Lang.",
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {language && <Badge color="blue">{language}</Badge>}
      </Group>
      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        View Project
      </Button>
    </Card>
  );
};

export default ProjectCard;
