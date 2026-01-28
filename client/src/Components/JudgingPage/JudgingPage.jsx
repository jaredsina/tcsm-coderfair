import "./JudgingPage.css";
import {
  Button,
  Flex,
  Textarea,
  Text,
  List,
  Rating,
  Title,
  Select,
  Alert,
} from "@mantine/core";
import { Podium } from "../../Pages/HomePage/HomePage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGrade } from "../../reducers/gradeSlice";
import { fetchStudents } from "../../reducers/studentSlice";
import {  resetProjectStatus } from "../../reducers/projectSlice";
import { notifications } from "@mantine/notifications";


const concept_tiers = ["Beginner", "Intermediate", "Advanced"];

export function Judging() {
  return (
    <Title className="PageTitle" ta="center" order={1}>
      Judging
    </Title>
  );
}
export function Form() {
  return (
    <Text size="xl" fw={500}>
      Judge Form
    </Text>
  );
}


function JudgingPage() {
  const [newGrade, setNewGrade] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(null)

  const dispatch = useDispatch()
  
  const handleAddGrade = () => {
    if (!selectedStudent || !newGrade.concept_mastery || !newGrade.creativity || !newGrade.presentation || !newGrade.overall_comments || !newGrade.concept_tier){
      return notifications.show({
        title: 'Error',
        message:
          'Missing form information',
        color: 'red',
      });
    } 
  
    if(!user_id) return

    // const studentId = studentInfo.find((student)=> student.name === selectedStudent)
    const project = projectInfo.find((project)=> project.student_id === selectedStudent._id && project.coderfair_id === "69335b9cd90bafe5defe5e8e")
    newGrade.user_id = user_id
    newGrade.project_id = project?._id
    newGrade.student_id = selectedStudent?._id
    newGrade.overall_grade = (newGrade.concept_mastery + newGrade.creativity + newGrade.presentation)
    dispatch(createGrade(newGrade))
    setNewGrade({name:null, concept_tier:null, concept_mastery:0, creativity: 0, presentation:0, overall_comments:""})
    setSelectedStudent(null)
    dispatch(resetProjectStatus())
  }

  const handleEditStudent = (value) =>{
    const studentId = studentInfo.find((student)=> student.name === value)
    setSelectedStudent(studentId)
  }

  const gradeStatus = useSelector((state) => state.grades.status);
  const studentStatus = useSelector((state) => state.students.status);
  const judgeStatus = useSelector((state)=>state.judges.status)

  // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
  //const projectStatus = useSelector((state) => state.projects.status);

  const studentInfo = useSelector((state) => state.students.studentInfo);
  const user = useSelector((state)=>state.auth.user)
  const user_id = user._id
  

  // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
  const projectInfo = useSelector((state) => state.projects.projects);
  //const coachInfo = useSelector((state) => state.coaches.coachInfo);

  useEffect(() => {
    studentStatus === "idle" ? dispatch(fetchStudents()) : null;


    // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
    //projectStatus === "idle" ? dispatch(fetchProjects()) : null;    
  }, [studentStatus, dispatch])

  return (
    <main>
      <Judging />
      <Flex
        direction={"row-reverse"}
        gap="md"
        justify="center"
        align="center"
        wrap={"wrap-reverse"}
      >
        <Flex direction={"column"} gap="md">
          <Text size="xl" fw={500} ta="center">Top Coders</Text>
          <Podium />
        </Flex>
        <Flex direction={"column"} gap="md">
          <Form />
          <Flex direction={"row"} gap={"md"}>
            <List type="ordered">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: "15", md: "50px" }}
              >
                <Flex direction={"column"} gap={"md"}>
                {user_id ? <Alert variant="light" color="green" title="Judge Info:">
                  <Text>Name: {user.first_name} {user.last_name}</Text>
                  <Text>Username: {user.username}</Text>
                  <Text>Email: {user.email}</Text>
                  </Alert>: <Alert variant="light" color="red" title="Warning">Can't find your judge info!</Alert>}
                  <List.Item>
                    <div>Name of Coder</div>
                    <Select
                      placeholder="Enter Your Response"
                      data={studentInfo?.length > 1 ? studentInfo?.map((student) => student.name): null}
                      searchable
                      clearable
                      value={selectedStudent?.name ?? null}
                      onChange={(value)=> handleEditStudent(value)}
                    />
                  </List.Item>
                  <List.Item>
                    <div>Concept Tier</div>
                    <Select
                      placeholder="Enter Your Response"
                      data={concept_tiers ?? null}
                      searchable
                      clearable
                      value={newGrade.concept_tier ?? null}
                      onChange={(value)=> setNewGrade({...newGrade, concept_tier: value})}
                    />
                  </List.Item>
                  <List.Item>
                    <div>Project Name</div>
                    {
                      projectInfo.find((project)=> project.student_id === selectedStudent?._id)?.name ? <Alert variant="light" color="green" title="Project Name Found:">{projectInfo.find((project)=> project.student_id === selectedStudent?._id && project.coderfair_id === "69335b9cd90bafe5defe5e8e")?.name}</Alert>: <Alert variant="light" color="red" title="Warning">ERROR: No project found for this student. Select another student!</Alert>
                    }
                  </List.Item>
                </Flex>
                <Flex direction={"column"} gap={"md"} flex>
                  <List.Item>
                    <div>Concept Mastery</div>
                    <Rating defaultValue={0} color="green" value={newGrade.concept_mastery} onChange={(value)=>setNewGrade({...newGrade, concept_mastery: value})} />
                  </List.Item>
                  <List.Item>
                    <div>Creativity</div>
                    <Rating defaultValue={0} color="green" value={newGrade.creativity} onChange={(value)=> setNewGrade({...newGrade, creativity: value})}/>
                  </List.Item>
                  <List.Item>
                    <div>Presentation</div>
                    <Rating defaultValue={0} color="green" value={newGrade.presentation} onChange={(value)=> setNewGrade({...newGrade, presentation: value})}/>
                  </List.Item>
                  <List.Item>
                    <Textarea size="md" radius="lg" label="Overall Review" value={newGrade.overall_comments} onChange={(e)=> setNewGrade({...newGrade, overall_comments: e.target.value})} />
                  </List.Item>
                  <Button
                    variant="filled"
                    color="green"
                    size="md"
                    className="Submit"
                    w="fit-content"
                    onClick={handleAddGrade
                    }
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </List>
          </Flex>
        </Flex>
      </Flex >
    </main>
  );
}

export default JudgingPage;
