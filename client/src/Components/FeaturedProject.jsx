import React from "react"
import './featuredProject.css'
import { Card, Image, Text, CardSection} from '@mantine/core';
const FeaturedProject = ()=>{
    return(
        <>
        <div classname="wrapper">
        <Card withBorder  shadow="md" radius="md">
            <CardSection withBorder inheritPadding py="xs">
                <Text weight={100} fw={500}>Project</Text>
            </CardSection>
            <Card.Section __size="sm" mt="sm">
                <Image weight={100}height={100} src="" />
            </Card.Section>
        </Card>
        </div>
        </>
    );
};

//I tried everything, cannot adjust the width. Maybe it has to do with making some sort of wrapper
//so far all that has worked with sizing is using height={int} on image component, but nowhere else.
export default FeaturedProject;
