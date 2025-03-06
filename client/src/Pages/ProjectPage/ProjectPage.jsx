import { Flex, Button, Title } from '@mantine/core';
import ProjectData from '../../data/projects.json';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { fetchProjects } from '../../reducers/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProjectPage = () => {

  const [shownProjects,setShownProjects] = useState([])

  const projects = useSelector((state)=>state.projects.projects)
  const projectStatus = useSelector((state)=>state.projects.status)
  const dispatch = useDispatch();

  useEffect(()=>{
    projectStatus === "idle" ? dispatch(fetchProjects()) : null;
    setShownProjects(projects)
  }, [projectStatus, dispatch])

  return (
    <main className="ProjectPageMain">
      <div className="ProjectTitle">
        <Title order={1}>Project Gallery</Title>
      </div>

      <SearchBar setShownProjects={setShownProjects}/>

      <Flex mih={50} gap="md" direction="row" justify="center" wrap="wrap">
        {shownProjects?.map((project, index) => (
          <div className="ProjectCard" key={index}>
            <ProjectCard title={project.name} language={project.coding_language ? project.coding_language : "Other"} description={project.description} image={project.project_image ? project.project_image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}/>
          </div>
        ))}
      </Flex>
    </main>
  );
};

export default ProjectPage;
