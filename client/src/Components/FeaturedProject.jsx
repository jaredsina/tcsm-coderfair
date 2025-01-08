import React from "react"
import './featuredProject.css'
import { Card, Group, Text, ActionIcon, Image, SimpleGrid, rem, CardSection } from '@mantine/core';
const FeaturedProject = ()=>{
    return(
        <>
        <Card withBorder shadow="md" radius="md">
            <CardSection withBorder inheritPadding py="xs">
                <Text fw={500}>Project</Text>
            </CardSection>
            <Card.Section mt="sm">
                <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
            </Card.Section>
        </Card>
        </>
    );
};

export default FeaturedProject;