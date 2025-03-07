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

import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../reducers/projectSlice';

export default function SingleProject() {
  const [liked, setLiked] = useState(false); // tells us if the project is liked
  const [shared, setShared] = useState(false);

  const [projectFetched, setProjectFetched] = useState(false); // Track if project data has been fetched
  const { id } = useParams();
 
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !projectFetched) {  // Only dispatch if not already fetched
      dispatch(getProjectById(id));
      setProjectFetched(true);  // Set to true after the first fetch
    }
  }, [id, dispatch, projectFetched]);

  const projectInfo = useSelector(state=>state.projects.singleProject)
  return (
    <Flex
      gap={{ base: '10', md: '90' }}
      direction={{ base: 'column', md: 'row', xs: 'column' }}
      align={'center'}
      justify={'center'}
    >
      <Flex direction={'column'} pl={{ md: '100' }} gap={'25'} flex={1}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={40}
          pt={50}
          justify={'center'}
          align={'center'}
        >
          <Text display={{ md: 'none' }} size="1.75rem" fw={700} >
            {' '}
            {projectInfo.name || "No Project Name Found"}
          </Text>
          <Text size="1.5rem" fw={700} >
            Score/Rank: {projectInfo?.grade?.[0]?.overall_grade * 100 || 0}
          </Text>
          <Flex direction={'column'} ta={'center'}>
            <Anchor href={projectInfo.code_access_link} target="_blank">
              <Button
                variant="light"
                color="green"
                leftSection={<CiShare1 size={40} />}
              >
                <Text fw={700}  ta={'center'}>
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
              <Text fw={700} >
                Like
              </Text>
            </Button>
            <Button
              variant="light"
              color={shared === true ? 'green' : 'red'}
              leftSection={<FaRegShareSquare size={40} />}
              onClick={function () {
                setShared(true);
                navigator.clipboard.writeText(projectInfo.code_access_link);
              }}
            >
              <Text fw={700}  ta={'center'}>
                {shared === true ? 'Copied' : 'Copy'}
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Image
          radius="md"
          src={
            projectInfo.project_image ? projectInfo.project_image :'https://lincolnliontales.com/wp-content/uploads/2014/02/Flappy-Bird-Teaser.jpg'
          }
          h="auto"
          w="100%"
        ></Image>
      </Flex>
      <Flex
        direction={'column'}
        //bg="rgba(0, 145, 7, .8)"
        w={455}
        gap={{ md: '40', base: '20' }}
      >
        <Text size="2rem" fw={700}  tt="uppercase" pl={200} pt={30}>
          Info:
        </Text>
        <Flex direction={'column'}>
          <List withPadding spacing={30}>
            <List.Item ta={'center'}>
              <Text size="1.5rem" fw={600} >
                Name of Project:
              </Text>
                <Text size="1.25rem">{projectInfo.name || "No project name found"}</Text>
            </List.Item>
            <List.Item ta={'center'}>
              <Text size="1.5rem" fw={600} >
                Name of Coder: 
              </Text>
                <Text size="1.25rem">{projectInfo.student?.[0]?.name || "No student name found"}</Text>
            </List.Item>
            <List.Item ta={'center'} size="xl">
              <Text size="1.5rem" fw={600} >
                Coding Language:
              </Text>
                <Text size="1.25rem">{projectInfo.coding_language || "No coding language found" }</Text>
            </List.Item>
            <List.Item ta={'center'} size="xl">
              <Text size="1.5rem" fw={600} >
                Coder Skill Level
              </Text>
                <Text size="1.25rem">{projectInfo.category || "Beginner"}</Text>
            </List.Item>
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
}
