import "./JudgingPage.css";
import {
  Button,
  Flex,
  Textarea,
  Text,
  List,
  TextInput,
  Rating,
  Title,
  Autocomplete,
  MultiSelect,
  Select,
} from "@mantine/core";
import { Podium } from "../../Pages/HomePage/HomePage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGrade, fetchGrades } from "../../reducers/gradeSlice";
import { fetchStudents } from "../../reducers/studentSlice";
import { fetchCoderFairProjects, fetchProjects, resetProjectStatus } from "../../reducers/projectSlice";
import { notifications } from "@mantine/notifications";

const data = ["Sina", "Francis", "David", "Terisa"];
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

    newGrade.judge_id = "67a6204ac5e2b4a4e0bf6df6"
    // const studentId = studentInfo.find((student)=> student.name === selectedStudent)
    const project = projectInfo.find((project)=> project.student_id === selectedStudent._id)
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

  // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
  //const projectStatus = useSelector((state) => state.projects.status);

  const gradeInfo = useSelector((state) => state.grades.grades);
  const studentInfo = useSelector((state) => state.students.studentInfo);
  
  // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
  const projectInfo = useSelector((state) => state.projects.projects);
  //const coachInfo = useSelector((state) => state.coaches.coachInfo);

  useEffect(() => {
    gradeStatus === "idle" ? dispatch(fetchGrades()) : null;
    studentStatus === "idle" ? dispatch(fetchStudents()) : null;

    // * If ever removing Podium make sure the HomePage component fetchesCoderFairProjects
    //projectStatus === "idle" ? dispatch(fetchProjects()) : null;
    //coachStatus === "idle" ? dispatch(fetchCoaches()) : null;
    
  }, [gradeStatus, studentStatus, dispatch])

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
                  <List.Item>
                    <div>Your Name</div>
                    <Select
                      placeholder="Enter Your Response"
                      data={data}
                      searchable
                      clearable
                    />
                  </List.Item>
                  <List.Item>
                    <div>Name of Coder</div>
                    <Select
                      placeholder="Enter Your Response"
                      data={studentInfo?.length > 1 ? studentInfo?.map((student) => student.name): null}
                      searchable
                      clearable
                      value={selectedStudent?.name || null}
                      onChange={(value)=> handleEditStudent(value)}
                    />
                  </List.Item>
                  <List.Item>
                    <div>Concept Tier</div>
                    <Select
                      placeholder="Enter Your Response"
                      data={concept_tiers}
                      searchable
                      clearable
                      value={newGrade.concept_tier}
                      onChange={(value)=> setNewGrade({...newGrade, concept_tier: value})}
                    />
                  </List.Item>
                  <List.Item>
                    <div>Project Name</div>
                    <Text>{projectInfo.find((project)=> project.student_id === selectedStudent?._id)?.name || "ERROR: COULDNT FIND PROJECT, SELECT ANOTHER STUDENT"}</Text>
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
