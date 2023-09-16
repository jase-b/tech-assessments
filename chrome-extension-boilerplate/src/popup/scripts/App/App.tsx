import React, { useEffect } from "react";
import "./App.css";

interface AppProps {}

const App = ({}: AppProps): JSX.Element => {
  useEffect(() => {
    console.log("App is mounted!");
  }, []);

  return (
    <main>
      <h1>Welcome to the Popup! 👋</h1>
    </main>
  );
};

export default App;
