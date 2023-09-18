import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";

createRoot(document.querySelector("#react-app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept();
}