import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAddToHomescreenPrompt } from "./AddToHomeScreen";

function App() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  React.useEffect(() => {
    isPWAInstalled();
  }, []);
  const isPWAInstalled = async () => {
    if ("getInstalledRelatedApps" in window.navigator) {
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed
        console.log(app.platform, app.url);
        if (app.url === "https://nagad-poc-v2.netlify.app/manifest.json") {
          installed = true;
        }
      });
      setIsAppInstalled(installed);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {!isAppInstalled ? (
          <button onClick={promptToInstall}>Add to Home Screen</button>
        ) : (
          <div>Thanks for installing our app</div>
        )}
      </header>
    </div>
  );
}

export default App;
