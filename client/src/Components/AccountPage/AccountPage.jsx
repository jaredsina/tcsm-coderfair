import React from "react"
import ProjectCard from "../ProjectCard/ProjectCard";
import {  Center, Flex, Container, Text, Avatar } from '@mantine/core';
import "./AccountPage.css"

const AccountPage = ()=>{
  return(
    <>
      <Container bg="rgba(0, 0, 0, .3)">
        <Flex
        mih={50}
        
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap">
          <Avatar src="Sina.png" size="lg"></Avatar>
          <Text size="xl">Name</Text>
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
        wrap="wrap">
        <Text
      size="3rem"
      fw={900}
      variant="gradient"
      gradient={{ from: 'rgb(251, 255, 0)', to: 'rgb(51, 116, 54)', deg: 303 }}
    >
      Featured Project
    </Text>
    <ProjectCard/>
    </Flex>
      </Container>
    </>
  )
}
export default AccountPage;