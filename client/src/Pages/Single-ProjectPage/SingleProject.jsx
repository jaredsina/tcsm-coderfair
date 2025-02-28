import {
  Flex,
  Text,
  List,
  ListItem,
  Image,
  Button,
  Anchor,
} from '@mantine/core';
import { CiShare1 } from 'react-icons/ci';
import { BiLike } from 'react-icons/bi';
import { FaRegShareSquare } from 'react-icons/fa';

import { useState } from 'react';

export default function SingleProject() {
  const [liked, setLiked] = useState(false); // tells us if the project is liked
  const [shared, setShared] = useState(false);

  return (
    <Flex gap={90} direction={{base:'column', md:'row', xs:"column"}} align={'center'} justify={'center'}>
      <Flex direction={'column'} pl={{md:'100'}} gap={'25'} flex={1}>
        <Flex direction={{base:'column', md:'row'}} gap={40} pt={50} justify={'center'} align={'center'}>
          <Text size="1.5rem" fw={700} Bold>
            Score/Rank
          </Text>
          <Flex direction={'column'} ta={'center'}>
            <Anchor href={'https://flappybird.io/'} target="_blank">
              <Button
                variant="light"
                color="green"
                leftSection={<CiShare1 size={40} />}
              >
                <Text fw={700} Bold ta={'center'}>
                  Open in New Tab
                </Text>
              </Button>
            </Anchor>
          </Flex>
          <Flex direction={'row'} gap={40}>
            <Button
              variant="light"
              color={liked === true ? 'green' : 'red'}
              leftSection={<BiLike size={40} />}
              onClick={function () {
                console.log('pressed');
                setLiked(true);
              }}
            >
              <Text fw={700} Bold>
                Like
              </Text>
            </Button>
            <Button
              variant="light"
              color={shared === true ? 'green' : 'red'}
              leftSection={<FaRegShareSquare size={40} />}
              onClick={function () {
                setShared(true);
                navigator.clipboard.writeText('https://flappybird.io/');
              }}
            >
              <Text fw={700} Bold ta={'center'}>
                {shared === true ? 'Copied' : 'Copy'}
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Image
          radius="md"
          src={
            'https://lincolnliontales.com/wp-content/uploads/2014/02/Flappy-Bird-Teaser.jpg'
          }
          h="auto"
          w="100%"
        ></Image>
      </Flex>
      <Flex
        direction={'column'}
        //bg="rgba(0, 145, 7, .8)"
        w={455}
        gap={40}
      >
        <Text size="2rem" fw={700} Bold tt="uppercase" pl={200} pt={30}>
          Info:
        </Text>
        <Flex direction={'column'}>
          <List withPadding spacing={30}>
            <List.Item ta={'center'}>
              <Text size="1.5rem" fw={600} Bold>
                Name of Project:
              </Text>
              <ListItem>
                <Text size="1.25rem">Flappy Bird</Text>
              </ListItem>
            </List.Item>
            <List.Item ta={'center'}>
              <Text size="1.5rem" fw={600} Bold>
                Name of Coder:
              </Text>
              <ListItem>
                <Text size="1.25rem">Sid</Text>
              </ListItem>
            </List.Item>
            <List.Item ta={'center'} size="xl">
              <Text size="1.5rem" fw={600} Bold>
                Coding Language:
              </Text>
              <ListItem>
                <Text size="1.25rem">Python</Text>
              </ListItem>
            </List.Item>
            <List.Item ta={'center'} size="xl">
              <Text size="1.5rem" fw={600} Bold>
                Coder Skill Level
              </Text>
              <ListItem>
                <Text size="1.25rem">Pro</Text>
              </ListItem>
            </List.Item>
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
}
