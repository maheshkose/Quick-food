import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import App_State from "./context/App_State.jsx";

createRoot(document.getElementById("root")).render(
  <App_State>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   
  </App_State>
);
