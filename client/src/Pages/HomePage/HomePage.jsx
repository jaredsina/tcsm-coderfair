<<<<<<< HEAD
import React from "react"
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { Center, Button, Flex, rem, Select, SimpleGrid, Container, Text, Avatar, Space } from '@mantine/core';
import "./HomePage.css"
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
=======
import React from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import {
  Center,
  Flex,
  rem,
  Select,
  SimpleGrid,
  Container,
  Text,
  Avatar,
  Space,
} from '@mantine/core';
import './HomePage.css';

>>>>>>> development
const HomePage = () => {
  return (
    <>
      <Container bg="rgba(0, 0, 0, .3)">
<<<<<<< HEAD
        <Center className="h1"><Text fw={900} size="3em">The Coder Fair</Text></Center>
        <Container bg={'rgba(120, 120, 120)'} width={'100%'}>
          <Center>
            <Text
              size="1.7rem"
              fw={900}
              variant="gradient"
              gradient={{ from: 'rgba(167, 167, 167, 1)', to: 'rgba(245, 245, 245, 1)', deg: 61 }}>
              Featured Projects
            </Text>
          </Center>

          <Carousel withIndicators slideSize="70%" height={350} slideGap="md" controlSize={30} controlsOffset="75" loop>
            <Carousel.Slide><Center><ProjectCard style={{ width: "30rem" }} /></Center></Carousel.Slide>
            <Carousel.Slide><Center><ProjectCard style={{ width: "30rem" }} /></Center></Carousel.Slide>
            <Carousel.Slide><Center><ProjectCard style={{ width: "30rem" }} /></Center></Carousel.Slide>
            <Carousel.Slide><Center><ProjectCard style={{ width: "30rem" }} /></Center></Carousel.Slide>
            <Carousel.Slide><Center><ProjectCard style={{ width: "30rem" }} /></Center></Carousel.Slide>
            <Carousel.Slide>
              <Flex mih={300} justify="center" align="center" direction="row">
                <Button href="./Pages/ProjectPage" variant="filled" color="blue" size="xl">
                  <Link className="carousel-link" to="/projects">See More</Link>
                </Button>
              </Flex>
            </Carousel.Slide>
          </Carousel>
        </Container>
      </Container>
    </>
  )
}

export default HomePage
=======
        <Text>The Coder Fair</Text>
        <Text
          size="1.7rem"
          fw={{ xs: 100, sm: 300, md: 500, lg: 900 }}
          variant="gradient"
          gradient={{ from: '#0c4d0b', to: '#0000', deg: 199 }}
        >
          Spring '25
        </Text>
      </Container>
    </>
  );
};


export default HomePage;
>>>>>>> development
