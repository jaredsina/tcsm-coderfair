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

const HomePage = () => {
  return (
    <>
      <Container bg="rgba(0, 0, 0, .3)">
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
