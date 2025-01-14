import ProjectCard from './ProjectCard/ProjectCard';
import SearchBar from './SearchBar/SearchBar';
const ProjectPage = () => {
  return (
    <main className="ProjectPageMain">
      <SearchBar />
      <div className="ProjectCardList">
        <ProjectCard />
      </div>
    </main>
  );
};

export default ProjectPage;
