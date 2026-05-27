import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import i18n from "./lib/i18n";
import App from "./App";

void i18n;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
