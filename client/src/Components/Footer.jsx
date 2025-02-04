import React from "react"
import { Container, Text, Anchor } from "@mantine/core"
function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '20px 0' }}>
      <Container size="md" style={{ textAlign: 'center' }}>
        <Anchor href="https://www.thecoderschool.com/locations/montgomery/" >The Coder School Montgomery</Anchor>
        <Text>Got a question? Email us at <Anchor href="mailto:montgomery@thecoderschool.com" >montgomery@thecoderschool.com</Anchor></Text>

        <Text size="sm">&copy; 2014-2022, the Coder School San Francisco, LLC. All Rights, Alright?
          Don't forget our<Anchor href="https://www.thecoderschool.com/privacy/"> Privacy Policy</Anchor></Text>
      </Container>
    </footer>
  )
}
export default Footer;