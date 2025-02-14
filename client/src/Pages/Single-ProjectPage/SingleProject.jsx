import { Flex, Text, List, ListItem, ActionIcon } from '@mantine/core';

export default function SingleProject() {
  return (
    <Flex pl={875}>
      <Flex direction={'column'} bg="rgba(0, 148, 7, .8)" w={540} h={527}>
        <Text size="xl" fw={700} Bold tt="uppercase" pl={185}>
          Info:
        </Text>
        <List withPadding>
          <List.Item ta={'center'} fw={1000}>
            Name of Project:
            <ListItem> Flappy Bird</ListItem>
          </List.Item>
          <List.Item ta={'center'} size="xl" fw={1000}>
            Name of Coder:
            <ListItem>Sid</ListItem>
          </List.Item>
          <List.Item ta={'center'} size="xl" fw={1000}>
            Coding Language:
            <ListItem>Python</ListItem>
          </List.Item>
          <List.Item ta={'center'} size="xl" fw={1000}>
            Coder Skill Level
            <ListItem>Pro</ListItem>
          </List.Item>
        </List>
      </Flex>
    </Flex>
  );
}
