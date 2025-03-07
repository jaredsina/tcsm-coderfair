import React from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import {
  Center,
  Button,
  Flex,
  Container,
  Text,
  Avatar,
  Table,
  Badge,
  Grid,
  Paper,
  Title,
  Box,
} from '@mantine/core';
import './HomePage.css';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { fetchCoderFairProjects } from '../../reducers/projectSlice';

const data1 = [
  { rank: 4, name: 'Josh', score: 5000 },
  { rank: 5, name: 'Joshua', score: 4500 },
  { rank: 6, name: 'JS', score: 4200 },
  { rank: 7, name: 'J', score: 4000 },
];


export function Leaderboard() {
  

  const projects = useSelector((state)=>state.projects.projects)

  // Get the grade totals for each project
  const gradeTotals = projects?.map(project=>{
    const totalGrade = project?.grade?.reduce((sum,g)=> sum + (g.overall_grade * 100) , 0)
    return {...project, totalGrade}
  })

  // Get projects in places 4-7
  const leaderboardProjects = gradeTotals.sort((a,b)=>b.totalGrade - a.totalGrade).slice(3)

  const rows = leaderboardProjects.map((project, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Badge color="blue" variant="filled" size="lg">{index+4}</Badge>
      </Table.Td>
      <Table.Td>
        <Link
          className={'link'}
          to={'/account'}
          onClick={() => setOpened(false)}
          style={{ textDecoration: 'none', fontWeight: 600 }}
        >
          {project?.student?.[0]?.name || "Unknown"}
        </Link>
      </Table.Td>
      <Table.Td style={{ fontWeight: 600 }}>{project.totalGrade}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box mt={60} mb={60}>
      <Title order={2} align="center" mb={30}>Leaderboard</Title>
      <Table highlightOnHover striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>Rank</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Coder</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Score</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
}

// * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
export function Podium() {
  const heights = [175, 150, 140];
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  const projects = useSelector((state)=>state.projects.projects)
  const projectStatus = useSelector((state)=>state.projects.status)
  const dispatch = useDispatch();

  useEffect(()=>{
    projectStatus === "idle" ? dispatch(fetchCoderFairProjects('67b4f809f02dfc6eecbeed34')) : null;
  }, [projectStatus, dispatch])

  // Get the grade totals for each project
  const gradeTotals = projects?.map(project=>{
    const totalGrade = project?.grade?.reduce((sum,g)=> sum + (g.overall_grade * 100) , 0)
    return {...project, totalGrade}
  })

  // Get the top 3 students
  const top3Students = gradeTotals.sort((a,b)=>b.totalGrade - a.totalGrade).slice(0,3)

  return (
    <Grid justify="center" align="end" style={{ height: 250, marginTop: 40 }}>
      {top3Students?.map((project, index) => (
        <Grid.Col span={4} key={project._id || index}>
          <Center>
            <Paper
              shadow="lg"
              radius="md"
              p="xs"
              style={{
                height: heights[index],
                width: '100%',
                maxWidth: 180,
                background: `linear-gradient(180deg, ${colors[index]} 0%, ${colors[index]}CC 100%)`,
                textAlign: 'center',
                position: 'relative',
                transform: index === 0 ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Flex direction="column" gap={5} align="center">
                <Badge size="md" variant="filled" color={index === 0 ? "yellow" : index === 1 ? "gray" : "orange"}>
                  #{index + 1}
                </Badge>
                <Avatar src= {project?.student?.[0]?.avatar_image || null} size="md" radius="xl" />
                <Text size="xs" weight={700} color="dark" ta="center" style={{
                  wordBreak: 'break-word',
                  maxWidth: '90%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  <Link
                    className={'link'}
                    to={'/account'}
                    style={{ textDecoration: 'none' }}
                  >
                    {project?.student?.[0]?.name || "Unknown"}
                  </Link>
                </Text>
                <Text size="xs" weight={500}>{project.totalGrade} pts</Text>
              </Flex>
            </Paper>
          </Center>
        </Grid.Col>
      ))}
    </Grid>
  );
}

const HomePage = () => {

  const projects = useSelector((state)=>state.projects.projects)
  //const projectStatus = useSelector((state)=>state.projects.status)
 
  // * If ever Podium is removed make sure the HomePage component fetchesCoderFairProjects
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   projectStatus === "idle" ? dispatch(fetchCoderFairProjects('67b4f809f02dfc6eecbeed34')) : null;
  // }, [projectStatus, dispatch])
 
  return (
    <Container size="xl" py={40}>
      <Box mb={60}>
        <Title order={1} align="center" size="3.2rem">
          The Coder School Fair
        </Title>
        <Text align="center" color="dimmed" mt={10}>
          {new Date().toLocaleString('en-US', { month: 'long' }).match(/March|April|May/) ? 'Spring' :
            new Date().toLocaleString('en-US', { month: 'long' }).match(/June|July|August/) ? 'Summer' :
              new Date().toLocaleString('en-US', { month: 'long' }).match(/September|October|November/) ? 'Fall' :
                'Winter'} {new Date().getFullYear()}
        </Text>
      </Box>

      <Box mb={60}>
        <Title order={2} align="center" mb={30}
          sx={(theme) => ({
            background: theme.fn.linearGradient(61, 'rgba(167, 167, 167, 1)', 'rgba(245, 245, 245, 1)'),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          Featured Projects
        </Title>

        <Carousel
          withIndicators
          slideSize="80%"
          height={'22rem'}
          slideGap="md"
          style={{ width: '100%' }}
          controlSize={'3rem'}
          loop
        >
          {projects?.filter((project)=>{return project.is_featured === "true"}).map((project)=>{
            return(
            <Carousel.Slide style={{ width: '100%' }} key={project._id}>
            <Center>
              <ProjectCard style={{ width: '100%' }} project_id={project._id || ""} title={project.name} language={project.coding_language ? project.coding_language : "Other"} description={project.description} image={project.project_image ? project.project_image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}/>
            </Center>
          </Carousel.Slide>)
          })}
          <Carousel.Slide>
            <Flex mih={300} justify="center" align="center" direction="row">
              <Link to="/projects" onClick={() => setOpened(false)}>
                <Button
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  size="xl"
                >
                  View All Projects
                </Button>
              </Link>
            </Flex>
          </Carousel.Slide>
        </Carousel>
      </Box>

      <Podium />
      <Leaderboard />
    </Container>
  );
};

export default HomePage;
