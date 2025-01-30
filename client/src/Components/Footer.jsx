import { Footer, Group, Text, Anchor, Container, Divider } from "@mantine/core";

function CoderFairFooter() {
  return (
    <Footer height="auto" p="md" bg="dark.9" color="gray.2">
      <Container size="lg">
        <Divider color="gray.7" />
        <Group position="apart" mt="md">
          {/* Left Side - Branding */}
          <Text size="sm" color="gray.5">
            © {new Date().getFullYear()} The Coder School | Coder Fair
          </Text>

          {/* Right Side - Links */}
          <Group spacing="sm">
            <Anchor href="/about" color="gray.3" size="sm">
              About
            </Anchor>
            <Anchor href="/faq" color="gray.3" size="sm">
              FAQ
            </Anchor>
            <Anchor href="/contact" color="gray.3" size="sm">
              Contact
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Footer>
  );
}
export default CoderFairFooter