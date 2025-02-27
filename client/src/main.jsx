import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import '@mantine/notifications/styles.css';
import App from "./App.jsx";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import {store} from "./store/store.js";
import '@mantine/carousel/styles.css';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/dropzone/styles.css';

import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
