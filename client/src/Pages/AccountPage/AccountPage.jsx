import React, { useEffect, useState } from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import {
  Center,
  Flex,
  Select,
  SimpleGrid,
  Container,
  Text,
  Avatar,
  Alert,
} from '@mantine/core';
import './AccountPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentById } from '../../reducers/studentSlice';

const AccountPage = () => {
  const { id } = useParams();
  const [userFetched, setUserFetched] = useState(false); // Track if project data has been fetched

  const dispatch = useDispatch();

  // const 
  useEffect(() => {
      if (id && !userFetched) {  // Only dispatch if not already fetched
        dispatch(getStudentById(id));
        setUserFetched(true);  // Set to true after the first fetch
      }
    }, [id, dispatch, userFetched]);


  let userInfo = useSelector(state=>state.students.singleStudent)
  // userInfo={}
  return (

    <Container mt={50}>
      {/* User Profile Section */}
      <Flex mih={50} gap="md" justify="center" align="center" direction="row">
        <Avatar src={userInfo?.avatar_image || ''} size="lg" />
        <Text size="2em" fw={700} className="user-name">
          {userInfo?.name || "No student found"}
        </Text>
      </Flex>

      <Center>
        <Text ta={"center"}>{userInfo?.bio || "Great student that loves coding"}</Text>
      </Center>

      <Flex mih={50} gap="md" justify="center" align="center" direction="column">
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
          {userInfo?.project?.[0]?.name || "No Featured Project"}
        </Text>
        <ProjectCard style={{ base: '50rem', sm: '25rem' }} project_id={userInfo?.project?.[0]?._id || ""} title={userInfo?.project?.[0]?.name || "Good name"} language={userInfo?.project?.[0]?.coding_language ? userInfo?.project?.[0]?.coding_language : "Other"} description={userInfo?.project?.[0]?.description || "No Description"} image={userInfo?.project?.[0]?.project_image ? userInfo?.project?.[0]?.project_image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}/>
        <Text size="1.5em" fw={700}>
          Other Projects
        </Text>
        {/* <Select
          label="Select Year"
          placeholder="Choose Value"
          data={['Current', '2024', '2023', '2022', '2021']}
        ></Select> */}
        {userInfo?.project?.length > 1 ?
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            {userInfo?.project?.slice(1).map((p)=>{
              return(<ProjectCard style={{ base: '50rem', sm: '25rem' }} project_id={p._id || ""} title={p.name || "Good name"} language={p.coding_language ? p.coding_language : "Other"} description={p.description || " Great project."} image={p.project_image ? p.project_image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}/>
              )
            }) }
          </SimpleGrid>
          :
          <Text>No other projects... yet!</Text>
        }
      </Flex>
    </Container>
  );
};

export default AccountPage;
