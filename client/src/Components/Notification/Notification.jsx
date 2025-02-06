import React from "react"
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
//import {  } from '@mantine/core';
import { Notification } from "@mantine/notifications";
import "./Notification.css"
import { Link } from 'react-router-dom';
import { IconInbox } from '@tabler/icons-react';
import { IconLockPassword } from '@tabler/icons-react';

const Notification = () => {
  const passIcon = <IconLockPassword stroke={2} />
  return (
    <>
      <Notification title="Password reset" xIcon={passIcon}>
        Your password has successfully been reset.
      </Notification>
    </>
  )
}

export default Notification;