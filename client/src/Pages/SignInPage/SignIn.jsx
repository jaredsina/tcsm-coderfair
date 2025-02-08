import { Center, TextInput, Title, Button, Flex, Anchor } from '@mantine/core';

function SignInPage() {
  return (
    <Center pt={40}>
      <Flex
        justify="center"
        align="center"
        direction="column"
        bg="rgba(142, 142, 142, .35)"
        className="Flexbox"
        style={{
          width: '350px',
          height: '350px',
          borderRadius: '20px',
        }}
      >
        <Title order={1} ta={'center'}>
          Sign In
        </Title>
        <Flex justify="center" align="center" direction="column" gap={7} ta={'center'}>
          <TextInput
            label="Email:"
            type="email"
            placeholder="Abc12345@gmail.com"
          />
          <TextInput
            label="Password:"
            type="password"
            placeholder="CoderPro123"
          />
          <Anchor
            href="http://localhost:5173/sign-in"
            target="_blank"
            underline="always"
          >
            Reset Password
          </Anchor>
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 90 }}
            data-block
          >
            Sign-In
          </Button>
          <Anchor
            href="http://localhost:5173/sign-in"
            target="_blank"
            underline="always"
          >
            Create Account
          </Anchor>
        </Flex>
      </Flex>
    </Center>
  );
}

export default SignInPage;
