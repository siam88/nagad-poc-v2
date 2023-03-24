import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Landing from "../components/scene/landing";
import Instruction from "../components/scene/instruction";
import Upload from "../components/scene/upload";
import Result from "../components/scene/result";
import Failed from "../components/scene/failed";
import About from "../components/scene/about";

const Home = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [gender, setGender] = useState();
  const [results, setResults] = useState();

  switch (currentScene) {
    case 0:
      return (
        <Landing setCurrentScene={setCurrentScene} setGender={setGender} />
      );
    case 1:
      return (
        <About
          setCurrentScene={setCurrentScene}
          setGender={setGender}
          gender={gender}
        />
      );
    case 2:
      return <Instruction setCurrentScene={setCurrentScene} />;
    case 3:
      return (
        <Upload
          gender={gender}
          setCurrentScene={setCurrentScene}
          setResults={setResults}
        />
      );
    case 4:
      return <Result results={results} setCurrentScene={setCurrentScene} />;
    case 5:
      return <Failed setCurrentScene={setCurrentScene} />;
    default:
      return (
        <Landing setCurrentScene={setCurrentScene} setGender={setGender} />
      );
  }
};
export default Home;
