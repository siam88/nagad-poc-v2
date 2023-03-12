import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import Webcam from "react-webcam";
// import { useClickAway } from "react-use";
import { FiAlertOctagon, FiCheck } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
const CameraModal = ({
  show,
  handleClose,
  webcamRef,
  videoConstraints,
  capture,
  Mode,
  setMode,
  capturedImage,
  onCameraSubmit,
}) => {
  const [hasWebcamUserMedia, setHasWebcamUserMedia] = useState(false);
  const [cameraError, setcameraError] = useState(false);
  const [cameraMode, setcameraMode] = useState({
    all: [
      { value: "user", name: "Front" },
      { value: "environment", name: "Back" },
    ],
    current: "environment",
  });
  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        {/* <Modal.Header closeButton>
          <ButtonGroup>
            {cameraMode.all.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-light" : "outline-light"}
                name="radio"
                value={radio.value}
                checked={cameraMode.current === radio.value}
                onChange={(e) =>
                  setcameraMode((prev) => {
                    return { ...prev, current: e.target.value };
                  })
                }
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Modal.Header> */}
        <Modal.Body>
          {Mode == "Camera" ? (
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              className="camera_content"
              screenshotFormat="image/jpeg"
              width={"100%"}
              mirrored={cameraMode.current == "user" ? true : false}
              videoConstraints={
                window.screen.width < 769
                  ? {
                      ...videoConstraints,
                      facingMode: cameraMode.current,
                    }
                  : videoConstraints
              }
              onUserMedia={(media) => {
                setHasWebcamUserMedia(true);
                setcameraError(false);
              }}
              onUserMediaError={(error) => {
                setcameraError(error.message);
              }}
            />
          ) : (
            <img
              src={capturedImage}
              style={{ maxHeight: "80vh", maxWidth: "100vw" }}
            ></img>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row class="justify-content-center">
            {Mode === "Camera" ? (
              <>
                {hasWebcamUserMedia && (
                  <button className="global_btn my-1" onClick={capture}>
                    <BsFillCameraFill />
                    &nbsp; Capture
                  </button>
                )}
                <button
                  className="global_btn my-1"
                  variant="danger"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <IoClose />
                  &nbsp; Close
                </button>
              </>
            ) : (
              <>
                <button
                  className="global_btn my-1"
                  onClick={() => {
                    onCameraSubmit(capturedImage);
                  }}
                  variant="success"
                >
                  <FiCheck />
                  Submit
                </button>
                <button
                  className="global_btn my-1"
                  variant="danger"
                  onClick={() => {
                    setMode("Camera");
                  }}
                >
                  <IoClose />
                  Retake
                </button>
              </>
            )}
          </Row>
        </Modal.Footer>
      </Modal>
      {hasWebcamUserMedia && (
        <Row className="camera_actions_top">
          <Col className="flex_center gap-4" md={4}></Col>
        </Row>
      )}
      {!hasWebcamUserMedia && !cameraError && (
        <Spinner animation="border" variant="light" className="loader" />
      )}
      {cameraError && (
        <div className="camera-error">
          <FiAlertOctagon />
          <h5>{cameraError}</h5>
        </div>
      )}
    </>
  );
};
export default CameraModal;
