import React from "react"
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { Center, Button, Flex, rem, Select, SimpleGrid, Container, Text, Avatar, Space, Table, Badge, Grid, Card, Group, Anchor } from '@mantine/core';
import "./HomePage.css"
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
      <Table.Td><Badge color="blue">{data1.rank}</Badge></Table.Td>
      <Table.Td><Link className={"link"} to={"/account"} onClick={() => setOpened(false)}>{data1.name}</Link></Table.Td>
      <Table.Td>{data1.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table highlightOnHover striped>
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
  const heights = [175, 150, 120]; // Different heights for 1st, 2nd, 3rd place

  return (
    <Grid justify="center" align="end" style={{ height: 200 }}>
      {podium.map((player, index) => (
        <Grid.Col span={4} key={player.name}>
          <Center>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              style={{
                height: heights[index],
                background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                textAlign: 'center',
              }}
            >
              <Flex mih={300} align="center" direction="column"><Avatar />
                <Text weight={700}><Link className={"link"} to={"/account"} onClick={() => setOpened(false)}>{player.name}</Link></Text>
                <Text>{player.score} pts</Text>
              </Flex>
            </Card>
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
        <Center className="h1"><Text fw={900} size="2.7em">The Coder Fair</Text></Center>
        <Container width={'100%'}>
          <Center>
            <Text
              size="1.7rem"
              fw={900}
              variant="gradient"
              gradient={{ from: 'rgba(167, 167, 167, 1)', to: 'rgba(245, 245, 245, 1)', deg: 61 }}>
              Featured Projects
            </Text>
          </Center>

          <Carousel withIndicators slideSize="80%" height={"30rem"} slideGap="md" style={{ width: "100%" }} controlSize={"3rem"} loop>

            <Carousel.Slide style={{ width: "100%" }}><Center><ProjectCard style={{ width: "100%" }} /></Center></Carousel.Slide>
            <Carousel.Slide style={{ width: "100%" }}><Center><ProjectCard style={{ width: "100%" }} /></Center></Carousel.Slide>
            <Carousel.Slide style={{ width: "100%" }}><Center><ProjectCard style={{ width: "100%" }} /></Center></Carousel.Slide>
            <Carousel.Slide style={{ width: "100%" }}><Center><ProjectCard style={{ width: "100%" }} /></Center></Carousel.Slide>
            <Carousel.Slide>
              <Flex mih={300} justify="center" align="center" direction="row">
                <Link to="/projects" onClick={() => setOpened(false)}>
                  <Button href="/projects" variant="filled" color="blue" size="xl">
                    See More

                  </Button>
                </Link>

              </Flex>
            </Carousel.Slide>
            <Carousel.Slide style={{ width: "100%" }}><Center><ProjectCard style={{ width: "100%" }} /></Center></Carousel.Slide>
          </Carousel>
        </Container>
        <Podium />
        <Leaderboard />


      </Container >
    </>
  )
}

export default HomePage
