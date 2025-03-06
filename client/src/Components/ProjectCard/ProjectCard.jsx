import { Card, Image, Text, Badge, Button, Flex } from '@mantine/core';
import './ProjectCard.css';

const ProjectCard = ({
  title = 'Project Name',
  description = 'Project Description',
  language = 'Other',
  image,
  style,
}) => {
  return (
    <Card
      style={{ ...style, width: style?.width || 310 }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src={image}
          height={160}
          alt="Project Image"
        />
      </Card.Section>

      <Flex justify="space-between" align="center" mt="md" mb="xs">
        <Text fw={500}style={{ whiteSpace:'nowrap', overflow:'scroll', maxWidth:140}}>{title}</Text>
        {/* {language && <Badge color="blue">{language}</Badge>} */}
          <Badge color="blue">{language}</Badge>
      </Flex>
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
