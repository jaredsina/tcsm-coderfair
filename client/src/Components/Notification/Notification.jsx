import React, { useState } from "react"
import { Drawer, Button, Text, List, ListItem, Stack, ScrollArea, Notification } from '@mantine/core';
import "./Notification.css"

function Notifs() {
  const [opened, setOpened] = useState(false)
  const [notifications, setNotifications] = useState([
    <Notification title="Password reset">
      Your password has successfully been reset
    </Notification>,
    <Notification color="green" title="Props">
      when notif is needed lets pass a prop to this file to create a notification. we can use state to make an array of notifications that is then put in here
    </Notification>,
    <Notification color="red" title="This does not save other notifications yet">
      BUT ME AND SINA CAN FIX THAT!!!
    </Notification>
  ]);

  const drawerHandeler = () => {
    setOpened(true);
  };

  return (
    <>
      <Button onClick={drawerHandeler}>Notifications</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)}
        padding="md"
        size="md" 
        offset={8} 
        radius="md"
        position="right"
        zIndex={1000}>
        <ScrollArea style={{ height: 300 }}>
          {/* <List spacing="sm"> {/*yes sina i did use chat gpt for these 2 lines plz dont be mad i dont know how to do this part, ill prove to u i know how it works tho
            {notifications.map((notif, index) => (//this is like a for loop bc it loops through the notification array and creats a mantine list item for each one
              <ListItem key={`notif-${index}`}>{notif}</ListItem>// the  key={`notif-${index}`} makes a key for each item bc react requires it to keep track of chages, and i already knew that {notifs} makes the text inside of it
            ))}
          </List> */}
          <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="center"
            justify="flex-start"
            gap="xl"
          >
            {notifications.map((notif, index) => <Text key={index}>{notif}</Text>)}
          </Stack>
        </ScrollArea>
      </Drawer>
    </>
  )
}

export default Notifs;
