import React from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import {
  Center,
  Button,
  Flex,
  rem,
  Select,
  SimpleGrid,
  Container,
  Text,
  Avatar,
  Space,
  Table,
  Badge,
  Grid,
  Card,
  Group,
  Anchor,
  Paper,
  Title,
  Box,
} from '@mantine/core';
import './HomePage.css';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchCoderFairProjects } from '../../reducers/projectSlice';

const data1 = [
  { rank: 4, name: 'Josh', score: 5000 },
  { rank: 5, name: 'Joshua', score: 4500 },
  { rank: 6, name: 'JS', score: 4200 },
  { rank: 7, name: 'J', score: 4000 },
];
const data = [
  { rank: 1, name: 'Josh', score: 5000 },
  { rank: 2, name: 'Joshua', score: 4500 },
  { rank: 3, name: 'JS', score: 4200 },
];

export function Leaderboard() {
  const rows = data1.map((data1) => (
    <Table.Tr>
      <Table.Td>
        <Badge color="blue" variant="filled" size="lg">{data1.rank}</Badge>
      </Table.Td>
      <Table.Td>
        <Link
          className={'link'}
          to={'/account'}
          onClick={() => setOpened(false)}
          style={{ textDecoration: 'none', fontWeight: 600 }}
        >
          {data1.name}
        </Link>
      </Table.Td>
      <Table.Td style={{ fontWeight: 600 }}>{data1.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Box mt={60} mb={60}>
      <Title order={2} align="center" mb={30}>Leaderboard</Title>
      <Table highlightOnHover striped withBorder withColumnBorders>
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

// Sort by score
const podium = [...data].sort((a, b) => b.score - a.score);

export function Podium() {
  const heights = [175, 150, 120];
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  return (
    <Grid justify="center" align="end" style={{ height: 250, marginTop: 40 }}>
      {podium.map((player, index) => (
        <Grid.Col span={4} key={player.name}>
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
                <Avatar size="md" radius="xl" />
                <Text size="xs" weight={700} color="dark" ta="center" style={{
                  wordBreak: 'break-word',
                  maxWidth: '90%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  <Link
                    className={'link'}
                    to={'/account'}
                    onClick={() => setOpened(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    {player.name}
                  </Link>
                </Text>
                <Text size="xs" weight={500}>{player.score} pts</Text>
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
  const projectStatus = useSelector((state)=>state.projects.status)
 
  const dispatch = useDispatch();

  useEffect(()=>{
    projectStatus === "idle" ? dispatch(fetchCoderFairProjects('67b4f809f02dfc6eecbeed34')) : null;
  }, [projectStatus, dispatch])
  console.log(projects)
  console.log(projectStatus)
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
            <Carousel.Slide style={{ width: '100%' }}>
            <Center>
              <ProjectCard style={{ width: '100%' }} title={project.name} language={project.coding_language ? project.coding_language : "Other"} description={project.description} image={project.project_image ? project.project_image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}/>
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
