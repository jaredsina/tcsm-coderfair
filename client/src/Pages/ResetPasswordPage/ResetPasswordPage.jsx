import React from 'react';
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

const ResetPasswordPage = () => {
  return (
    <Container
      h="85%"
      maw="100%"
      pt="100px"
      bg="linear-gradient(to right, #4caf50, #2e7d32)"
    >
      <Center>
        <Paper shadow="xs" p="xl" w="400px" h="fit-content">
          <Title pb="20px">Reset Password</Title>
          <TextInput
            pb="20px"
            label="Create Password"
            placeholder="Enter a new password"
          />
          <TextInput
            pb="0px"
            label="Confirm Password"
            placeholder="Re-enter password"
          />
          <Center>
            <Stack align="center">
              <Button variant="filled" w="135px" h="40px">
                Reset Password
              </Button>
              <Link to="/">Log In</Link>
            </Stack>
          </Center>
        </Paper>
      </Center>
    </Container>
  );
};

export default ResetPasswordPage;
