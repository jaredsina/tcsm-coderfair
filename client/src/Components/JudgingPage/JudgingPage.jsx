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
} from "@mantine/core";

const data = ["Sina", "Francis", "David", "Terisa"];
const projectsList = ["Project 1", "Project 2", "Project 3", "Project 4"];
export function Judging() {
  return (
    <Title className="PageTitle" ta="center" order={1}>
      Judging
    </Title>
  );
}
export function Form() {
  return (
    <Text size="xl" fw={500} Semibold>
      Judge Form
    </Text>
  );
}

export function Podium() {
  return (
    <Text size="xl" fw={500} Semibold>
      Top Coder
    </Text>
  );
}

function JudgingPage() {
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
          <Podium />
          <Flex direction={"row"} align="flex-end">
            <span className="Rectangle"></span>
            <span className="Podium"></span>
            <span className="Bar"></span>
          </Flex>
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
                    <Autocomplete
                      placeholder="Enter Your Response"
                      data={data}
                      searchable
                      clearable
                    />
                  </List.Item>
                  <List.Item>
                    <div>Project Name</div>
                    <Autocomplete
                      placeholder="Enter Your Response"
                      data={projectsList}
                      searchable
                      clearable
                    />
                  </List.Item>
                  <List.Item>
                    <div>Name of Coder</div>
                    <TextInput placeholder="Enter Your Response" />
                  </List.Item>
                  <List.Item>
                    <div>Programing Language</div>
                    <TextInput placeholder="Enter Your Response" />
                  </List.Item>
                </Flex>
                <Flex direction={"column"} gap={"md"} flex>
                  <List.Item>
                    <div>Quality</div>
                    <Rating defaultValue={0} color="green" />
                  </List.Item>
                  <List.Item>
                    <div>Creativity</div>
                    <Rating defaultValue={0} color="green" />
                  </List.Item>
                  <List.Item>
                    <div>Complexity</div>
                    <Rating defaultValue={0} color="green" />
                  </List.Item>
                  <List.Item>
                    <div>Presentation</div>
                    <Rating defaultValue={0} color="green" />
                  </List.Item>
                  <List.Item>
                    <Textarea size="md" radius="lg" label="Overall Review" />
                  </List.Item>
                  <Button
                    variant="filled"
                    color="green"
                    size="md"
                    className="Submit"
                    w="fit-content"
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </List>
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}

export default JudgingPage;
