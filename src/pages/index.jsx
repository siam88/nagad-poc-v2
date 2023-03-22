import React, { useState } from "react";
import InstructionPage from "../components/InstructionPage";
import LandingPage from "../components/LandingPage";
import UploadPage from "../components/UploadPage";
import ResultPage from "../components/ResultPage";
import ResultImagePreviewPage from "../components/ResultImagePreviewPage";

const Home = ({ isAppInstalled, promptToInstall }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();

  switch (currentScene) {
    case 0:
      return <LandingPage setCurrentScene={setCurrentScene} />;
    case 1:
      return (
        <UploadPage
          setCurrentScene={setCurrentScene}
          setImageUpdated={setImageUpdated}
          loading={loading}
          setLoading={setLoading}
          setResults={setResults}
        />
      );
    case 2:
      return <ResultPage setCurrentScene={setCurrentScene} result={results} />;

    default:
      return <LandingPage setCurrentScene={setCurrentScene} />;
  }
};

export default Home;
