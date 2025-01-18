import ProjectCard from './ProjectCard/ProjectCard';
import SearchBar from './SearchBar/SearchBar';
import { Flex, Button } from '@mantine/core';
import ProjectData from '../data/projects.json';

const ProjectPage = () => {
  console.log(ProjectData);

  return (
    <main className="ProjectPageMain">
      <SearchBar />
      <div className="ProjectCardList">
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {ProjectData.map((project) => (
            <ProjectCard
              title={project.title}
              description={project.description}
              language={project.language}
            />
          ))}
        </Flex>
      </div>
    </main>
  );
};

export default ProjectPage;
