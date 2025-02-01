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
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleSignOut = () => {
    navigate('/'); // Redirect to the sign-in page
  };

  return (
    <>
      <Container>
        <Flex
          mih={50}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Flex gap="md" align="center">
            <Avatar src={'Sina.png'} size="lg"></Avatar>
            <Text size="2em" fw={700}>
              Joshua Sambol
            </Text>
          </Flex>
          <Button color="red" size="md" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Flex>
        <Center>
          <Text>Bio</Text>
        </Center>
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="olumn"
          wrap="wrap"
        >
          <Text
            size="1.7rem"
            fw={{ xs: 100, sm: 300, md: 500, lg: 900 }}
            variant="gradient"
            gradient={{
              from: 'rgba(186, 186, 186, 1)',
              to: 'rgba(0, 0, 0, 1)',
              deg: 199,
            }}
          >
            Featured Project
          </Text>
          <ProjectCard style={{ width: '50rem' }} />

          <Text size="1.5em" fw={700}>
            Other Projects
          </Text>
          <Select
            label="Select Year"
            placeholder="Choose Value"
            data={['Current', '2024', '2023', '2022', '2021']}
          ></Select>

          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </SimpleGrid>
        </Flex>
      </Container>
    </>
  );
};

export default AccountPage;
