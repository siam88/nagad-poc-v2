import React, { useState, useEffect } from "react";

import { useAddToHomescreenPrompt } from "./AddToHomeScreen";
import Home from "./pages/index";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleInstall = () => {
    handleClose();
    promptToInstall();
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    isPWAInstalled();
  }, []);
  // useEffect(() => {
  //   !isAppInstalled && promptToInstall();
  // }, [isAppInstalled]);

  const isPWAInstalled = async () => {
    if ("getInstalledRelatedApps" in window.navigator) {
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      console.log("relatedApps", navigator);

      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed

        console.log(app.platform, app.url);
        if (app.url === "https://nagad-poc-v2.vercel.app/manifest.json") {
          installed = true;
        } else {
          promptToInstall();
        }
      });
      setIsAppInstalled(installed);

      !installed && handleShow();
    }
  };
  return (
    <>
      <Home />

      {/* {!isAppInstalled && (
        <Modal size="sm" centered show={show} onHide={handleClose}>
          <Modal.Body>
            <h4>Install Nagad Poc</h4>
            <p>
              Install this application on your home screen for quick and easy
              access{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} size="sm">
              Close
            </Button>
            <Button variant="primary" onClick={handleInstall} size="sm">
              Install
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}
    </>
  );
}

export default App;
