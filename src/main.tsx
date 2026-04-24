import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

import App from "./App";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>,
);
