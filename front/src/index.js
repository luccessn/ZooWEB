import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </Router>
);
