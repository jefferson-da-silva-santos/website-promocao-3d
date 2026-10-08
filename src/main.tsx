import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/figtree";
import "@fontsource-variable/figtree/wght-italic.css";
import "@fontsource-variable/geist-mono";
import "./styles/main.scss";
import App from "./App.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Elemento #root não encontrado no index.html.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
