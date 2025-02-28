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
} from '@mantine/core';
import './HomePage.css';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';

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
        <Badge color="blue">{data1.rank}</Badge>
      </Table.Td>
      <Table.Td>
        <Link
          className={'link'}
          to={'/account'}
          onClick={() => setOpened(false)}
        >
          {data1.name}
        </Link>
      </Table.Td>
      <Table.Td>{data1.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table highlightOnHover striped mt={40} mb={40}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Rank</Table.Th>
          <Table.Th>Coder</Table.Th>
          <Table.Th>Score</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
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
  return (
    <>
      <Container>
        <Center className="h1">
          <Text fw={900} size="2.7em">
            The Coder Fair
          </Text>
        </Center>
        <Container width={'100%'}>
          <Center>
            <Text
              size="1.7rem"
              fw={900}
              variant="gradient"
              gradient={{
                from: 'rgba(167, 167, 167, 1)',
                to: 'rgba(245, 245, 245, 1)',
                deg: 61,
              }}
            >
              Featured Projects
            </Text>
          </Center>

          <Carousel
            withIndicators
            slideSize="80%"
            height={'22rem'}
            slideGap="md"
            style={{ width: '100%' }}
            controlSize={'3rem'}
            loop
          >
            <Carousel.Slide style={{ width: '100%' }}>
              <Center>
                <ProjectCard style={{ width: '100%' }} />
              </Center>
            </Carousel.Slide>
            <Carousel.Slide style={{ width: '100%' }}>
              <Center>
                <ProjectCard style={{ width: '100%' }} />
              </Center>
            </Carousel.Slide>
            <Carousel.Slide style={{ width: '100%' }}>
              <Center>
                <ProjectCard style={{ width: '100%' }} />
              </Center>
            </Carousel.Slide>
            <Carousel.Slide style={{ width: '100%' }}>
              <Center>
                <ProjectCard style={{ width: '100%' }} />
              </Center>
            </Carousel.Slide>
            <Carousel.Slide style={{ width: '100%' }}>
              <Center>
                <ProjectCard style={{ width: '100%' }} />
              </Center>
            </Carousel.Slide>
            <Carousel.Slide>
              <Flex mih={300} justify="center" align="center" direction="row">
                <Link to="/projects" onClick={() => setOpened(false)}>
                  <Button
                    href="/projects"
                    variant="filled"
                    color="blue"
                    size="xl"
                  >
                    See More
                  </Button>
                </Link>
              </Flex>
            </Carousel.Slide>
          </Carousel>
        </Container>
        <Podium />
        <Leaderboard />
      </Container>
    </>
  );
};

export default HomePage;
