import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <main>
      <h1>Welcome to the Popup! 👋</h1>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("react-app")
);
