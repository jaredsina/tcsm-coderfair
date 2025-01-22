import ProjectCard from '../Components/ProjectCard/ProjectCard';
import SearchBar from '../Components/SearchBar/SearchBar';
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
