import React, { useState } from "react";
import { Button, Table, TextInput, Select, Container, Title, Divider, Grid, Textarea } from "@mantine/core";
import "./CoachesPage.css";
import { modals } from "@mantine/modals";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
const CoachesPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", student: "John Doe" },
    { id: 2, name: "Project Beta", student: "Jane Smith" }
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "A" },
    { id: 2, name: "Jane Smith", grade: "B" }
  ]);
  const [grades, setGrades] = useState([
    { id: 1, project: "Project Alpha", grade: "A" },
    { id: 2, project: "Project Beta", grade: "B" }
  ]);
  const [studentName, setStudentName] = useState("")
  const [studentBio, setStudentBio] = useState("")
  const handleSubmit = () => {
    if (!studentName.trim()) return; // Prevent empty entries

    setStudents([...students, { name: studentName, bio: studentBio, image }]);

    // Reset inputs
    setStudentName("");
    setStudentBio("");
    setImage(null);

    modals.closeAll(); // Close after state updates
  };
  const addProject = () => {
    const newProject = { id: projects.length + 1, name: "New Project", student: "New Student" };
    setProjects([...projects, newProject]);
  };

  const editProject = (id) => {
    const updatedProjects = projects.map((proj) =>
      proj.id === id ? { ...proj, name: "Updated Project" } : proj
    );
    setProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const addStudent = () => {
    modals.open({
      title: 'Create student account',
      children: (
        <>
          <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <TextInput label="Student Name" placeholder="Student Name" data-autofocus value={newStudent} />
          <Textarea label="Student Bio" placeholder="Student Bio" data-autofocu></Textarea>
          <Button fullWidth onClick={() => modals.closeAll()} mt="md">
            Submit
          </Button>
        </>
      )
    })
    const newStudent = { id: students.length + 1, name: "New Student", grade: "C" };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id) => {
    const updatedStudents = students.map((stu) =>
      stu.id === id ? { ...stu, name: "Updated Student" } : stu
    );
    setStudents(updatedStudents);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((stu) => stu.id !== id));
  };

  const updateGrade = (id, newGrade) => {
    const updatedGrades = grades.map((grade) =>
      grade.id === id ? { ...grade, grade: newGrade } : grade
    );
    setGrades(updatedGrades);
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  return (
    <Container className="coaches-container">
      <Title className="coaches-title">Coach Dashboard</Title>
      <Divider className="section-divider" />

      <Grid>
        <Grid.Col span={12} md={5} lg={5}>  {/* Adjusting span for wider columns */}
          <div className="section">
            <Title order={2}>Manage Projects</Title>
            <Button onClick={addProject} className="action-button">Upload New Project</Button>
            <div className="table-container">
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Student</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.student}</td>
                      <td>
                        <Button onClick={() => editProject(project.id)}>Edit</Button>
                        <Button color="red" onClick={() => deleteProject(project.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col span={12} md={5} lg={5}> {/* Adjusting span for wider columns */}
          <div className="section">
            <Title order={2}>Manage Students</Title>
            <Button
              onClick={() => {
                modals.open({
                  centered: true,
                  title: 'Create student account',
                  children: (
                    <>
                      {/* <Dropzone
                        onDrop={(files) => console.log('accepted files', files)}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE} // Ensure this is imported
                      >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                          <div>
                            <Text size="xl" inline>
                              Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                              Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                          </div>
                        </Group>
                      </Dropzone> */}
                      <TextInput
                        label="Student Name"
                        placeholder="Student Name"
                        data-autofocus
                      />
                      <Textarea
                        label="Student Bio"
                        placeholder="Student Bio"
                        data-autofocus
                      />
                      <Button fullWidth mt="md">
                        Submit
                      </Button>
                    </>
                  ),
                });
              }}
              className="action-button"
            >
              Create Student Account
            </Button>

            <div className="table-container">
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Actions</th>
                    <th>Bio</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>

                      <td>{student.name}</td>
                      <td>{student.bio}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Grid.Col>
      </Grid>


      <Divider className="section-divider" />

      <div className="section">
        <Title order={2}>Manage Grades</Title>
        <div className="table-container">
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Project</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.project}</td>
                  <td>
                    <Select
                      data={["A", "B", "C", "D", "F"]}
                      value={grade.grade}
                      onChange={(value) => updateGrade(grade.id, value)}
                    />
                  </td>
                  <td>
                    <Button color="red" onClick={() => deleteGrade(grade.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default CoachesPage;