import { Menu, Button, Text, rem, TextInput, Flex, Select } from '@mantine/core';
import './SearchBar.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SearchBar = ({setShownProjects}) => {
  const [searchedProject, setSearchedProject] = useState({})
  const projects = useSelector(state=>state.projects.projects)
  const [sortOption, setSortOption] = useState(null);

  // Get the grade totals for each project
  const gradeTotals = projects?.map(project=>{
    const totalGrade = project?.grade?.reduce((sum,g)=> sum + (g.overall_grade * 100) , 0)
    return {...project, totalGrade}
  })


  const handleSearch = (value)=>{
    setSearchedProject(value)

    // If a search value is selected, filter projects by name
    if (value) {
      const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(value.toLowerCase()));
      setShownProjects(filteredProjects); // Show filtered projects
    } else {
      setShownProjects(projects); // Show all projects if no search value
    }
  }

  // Handle sorting logic based on selected option
  const handleSort = (option) => {
    setSortOption(option);
    let sortedProjects = [...gradeTotals]; // Create a shallow copy of the projects array
    
    switch (option) {
      case 'Rank':
        // Sort by rank (assuming rank is a numerical value; adjust if needed)
        sortedProjects.sort((a, b) => b.totalGrade - a.totalGrade); // Replace with your actual ranking logic
        break;
      case 'Project A-Z':
        // Sort alphabetically by project name
        sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setShownProjects(sortedProjects); // Update the sorted projects in parent component
  };


  return (
    <Flex justify="center" align="center" gap="10px">
      <div className="SearchBar">
        <Select 
          searchable 
          clearable 
          placeholder="Search project" 
          data={projects && projects.filter(project => Object.keys(project).length > 0).map(project => project.name) || []}
          value={searchedProject ?? null}
          onChange={(value)=>handleSearch(value)}
        />
      </div>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Sort</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Sort By:</Menu.Label>
          <Menu.Item onClick={() => handleSort('Rank')}>Rank</Menu.Item>
        <Menu.Item onClick={() => handleSort('Project A-Z')}>Project A-Z</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default SearchBar;
