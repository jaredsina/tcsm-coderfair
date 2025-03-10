import { Card, Image, Text, Badge, Button, Flex } from '@mantine/core';
import './ProjectCard.css';
import { Link } from 'react-router-dom';

const ProjectCard = ({
  title = 'Project Name',
  description = 'Project Description',
  language = 'Other',
  image,
  project_id,
  classname,
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
        <Image src={image} className={classname} height={160} alt="Project Image" />
      </Card.Section>

      <Flex
        justify="space-between"
        align="center"
        mt="md"
        mb="xs"
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 10 }}
      >
        <Text
          fw={500}
          maw="100%"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'auto',
          }}
        >
          {title}
        </Text>
        {/* {language && <Badge color="blue">{language}</Badge>} */}
        <Badge color="blue" miw="fit-content">
          {language}
        </Badge>
      </Flex>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
      <Link className="link" to={`/single-project/${project_id}`}>
        <Button color="blue" fullWidth mt="md" radius="md">
          View Project
        </Button>
      </Link>
    </Card>
  );
};

export default ProjectCard;
