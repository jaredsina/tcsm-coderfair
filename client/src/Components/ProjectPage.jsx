import ProjectCard from './ProjectCard/ProjectCard';
import SearchBar from './SearchBar/SearchBar';
import { Flex, Button } from '@mantine/core';
import ProjectData from '../data/projects.json';

const ProjectPage = () => {
  console.log(ProjectData);

  return (
    <main className="ProjectPageMain">
      <div className="ProjectTitle">
        <h1>Project Gallery</h1>
      </div>

      <SearchBar />
      <div className="ProjectCardList">
        <Flex mih={50} gap="md" direction="row" wrap="wrap">
          {ProjectData.map((project) => (
            <div className="ProjectCard">
              <ProjectCard
                title={project.title}
                description={project.description}
                language={project.language}
              />
            </div>
          ))}
        </Flex>
      </div>
    </main>
  );
};

export default ProjectPage;
