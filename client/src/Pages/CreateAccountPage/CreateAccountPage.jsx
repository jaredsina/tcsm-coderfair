import React from 'react';
import './CreateAccountPage.css';
import {
  TextInput,
  Paper,
  Title,
  Container,
  Center,
  Button,
  Stack,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
  return (
    <Container
      h="85%"
      maw="100%"
      pt="50px"
      bg="linear-gradient(to right, #4caf50, #2e7d32)"
    >
      <Center>
        <Paper shadow="xs" p="xl" w="400px" h="fit-content">
          <Title>Create Account</Title>
          <div ClassName="input-group-name">
            <TextInput
              pb="10px"
              label="Account Name"
              placeholder="Enter your name"
            />
            <TextInput pb="20px" label="Email" placeholder="Enter your email" />
          </div>

          <div ClassName="input-group-password">
            <TextInput
              pb="10px"
              label="Create Password"
              placeholder="Enter a password"
            />
            <TextInput
              pb="20px"
              label="Confirm Password"
              placeholder="Re-enter password"
            />
          </div>
          <Center>
            <Stack align="center">
              <Button variant="filled" w="125px" h="40px">
                Sign Up
              </Button>
              <Link to="/">Log In</Link>
            </Stack>
          </Center>
        </Paper>
      </Center>
    </Container>
  );
};

export default CreateAccountPage;
