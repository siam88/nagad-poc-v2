import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../Layout";
import Button from "../ui/button";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { dataURLtoFile } from "../../helpers";
import useMediaDevices from "../../hooks/useMediaDevices";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
const { REACT_APP_SERVER_ROOT: SERVER_ROOT } = process.env;
const { REACT_APP_CAMERA: CAMERA } = process.env;

const Upload = ({ setCurrentScene, setResults, gender }) => {
  //Ref variables
  const inputRef = useRef(null);
  const webcamRef = useRef(null);
  const camera = useRef(null);
  const deviceStatus = useMediaDevices();

  //states
  const [show, setShow] = useState(false);
  const [Mode, setMode] = useState("Camera");
  const [capturedImage, setCapturedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImgSrc, setUploadedImgSrc] = useState();
  const [hasWebcamUserMedia, setHasWebcamUserMedia] = useState(false);
  const [cameraError, setcameraError] = useState(false);

  const [videoConstraints, SetvideoConstraints] = useState({
    // width: 300,
    // height: 340,
    width: { min: 320 },
    height: { min: 340 },
    aspectRatio: 0.6666666667,
  });
  //submit image func
  const submitImage = (formData, cbOk, cbErr) => {
    setMode("Camera");
    setLoading(true);
    setResults();
    fetch(`${SERVER_ROOT}/feet_size`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (cbOk) {
          cbOk(result);
        }
      })
      .catch((e) => {
        setLoading(false);
        setCurrentScene(5);
        if (cbErr) {
          cbErr(e);
        }
      });
  };

  //on image upload

  const onImageUploadFromGallery = useCallback((acceptedFiles) => {
    let errors = 0;
    acceptedFiles.forEach((file) => {
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.onabort = () => toast.warn("file reading was aborted");
        reader.onerror = () => toast.warn("file reading has failed");
        reader.onload = () => {
          setLoading(true);
          const binaryStr = reader.result;

          var formData = new FormData();
          formData.append("file", dataURLtoFile(binaryStr));
          formData.append("gender", gender);
          // formData.append("file", dataURLtoFile(binaryStr));
          setResults();
          setShow(false);
          setCapturedImage();
          setUploadedImgSrc(binaryStr);
          submitImage(
            formData,
            (result) => {
              if (result?.Show_size && result?.feet_size_cm) {
                setCurrentScene(4);
                setResults(result);
              } else {
                setCurrentScene(5);
              }

              setLoading(false);
              setShow(false);
              setCapturedImage("");
              setUploadedImgSrc("");
              // setResults((prev) => {

              //   return { input: binaryStr, out: result };
              // });

              //
            },
            () => {}
          );
        };
        reader.readAsDataURL(file);
      } else {
        errors++;
        setCurrentScene(5);
      }
    });
    if (errors) {
      setCurrentScene(5);
    }
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    let errors = 0;
    acceptedFiles.forEach((file) => {
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.onabort = () => toast.warn("file reading was aborted");
        reader.onerror = () => toast.warn("file reading has failed");
        reader.onload = () => {
          setLoading(true);
          const binaryStr = reader.result;

          var formData = new FormData();
          formData.append("file", dataURLtoFile(binaryStr));
          formData.append("gender", gender);
          // formData.append("file", dataURLtoFile(binaryStr));
          setResults();
          setShow(false);
          setCapturedImage();
          setUploadedImgSrc(binaryStr);
          submitImage(
            formData,
            (result) => {
              if (result?.Show_size && result?.feet_size_cm) {
                setCurrentScene(4);
                setResults(result);
              } else {
                setCurrentScene(5);
              }

              setLoading(false);
              setShow(false);
              setCapturedImage("");
              setUploadedImgSrc("");
              // setResults((prev) => {

              //   return { input: binaryStr, out: result };
              // });

              //
            },
            () => {}
          );
        };
        reader.readAsDataURL(file);
      } else {
        errors++;
        setCurrentScene(5);
      }
    });
    if (errors) {
      setCurrentScene(5);
    }
  }, []);
  const onCameraSubmit = (img) => {
    var formData = new FormData();
    formData.append("file", dataURLtoFile(img));
    formData.append("gender", gender);
    submitImage(
      formData,
      (result) => {
        if (result?.Show_size && result?.feet_size_cm) {
          setCurrentScene(4);
          setResults(result);
        } else {
          setCurrentScene(5);
        }

        setLoading(false);
        setShow(false);
        setCapturedImage("");
        setUploadedImgSrc("");

        // setResults((prev) => {
        //   return [...prev, { input: img, out: result }];
        // });
      },
      () => {}
    );
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setMode("Preview");
  }, [webcamRef]);
  //useEffect
  useEffect(() => {
    return () => {};
  }, [deviceStatus]);

  const Loader = () => {
    return (
      <div className="overlay_loading">
        <div class="spinner-grow text-light" role="status" />

        <div className="text-light">loading...</div>
        <p className="text-light px-4 mt-4 text-center">
          We're scanning your foot. Please have patience
        </p>
      </div>
    );
  };

  const capturedImageTogglerHandler = (captImg) => {
    if (captImg) {
      setMode("Camera");
      setCapturedImage("");
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <Layout>
        <div></div>
        <Container
          className="instruction_page"
          {...getRootProps({
            role: "unset",
          })}
          onClick={(e) => {}}
        >
          <img className="brand_logo_top" src="./images/bata.png" alt="" />
          <Row className="px-4 pb-3">
            <h2 className="title_2 mt-3 mb-3">Now take your picture</h2>
            <Col xs={show ? 10 : 8} className="mx-auto p-0 align-self-start">
              <div className="sample_img">
                {show ? (
                  // /////////////////////////////////////////////////////////////
                  <>
                    {Mode == "Camera" ? (
                      <div className="camera">
                        <Webcam
                          style={{ width: "100" }}
                          audio={false}
                          ref={webcamRef}
                          className="camera_content"
                          screenshotFormat="image/jpeg"
                          screenshotQuality={1}
                          forceScreenshotSourceSize={true}
                          mirrored={false}
                          videoConstraints={videoConstraints}
                          onUserMedia={(media) => {
                            setHasWebcamUserMedia(true);
                            setcameraError(false);
                          }}
                          onUserMediaError={(error) => {
                            setcameraError(error.message);
                          }}
                        />
                        {Mode === "Camera" && hasWebcamUserMedia && (
                          <div
                            onClick={() => capture()}
                            className="camera_icon"
                            rel="noopener noreferrer"
                          >
                            <img src="./images/camera.png" alt="" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <img src={capturedImage} alt="" />
                    )}
                  </>
                ) : (
                  //////////////////////////////////////////////////////////
                  <>
                    <a
                      href={"#"}
                      className="camera_icon"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/camera.png" alt="" />
                    </a>
                    <img
                      src={
                        uploadedImgSrc
                          ? uploadedImgSrc
                          : "./images/sample-2.png"
                      }
                      alt=""
                    />
                  </>
                )}
                {/* ==== overlay_loading ==== */}
                {loading && <Loader />}
              </div>
            </Col>
            <div className="d-flex justify-content-center my-4">
              <a
                href={"#"}
                className="d-flex justify-content-center flex-column me-5"
              >
                <h5>Gallery</h5>
                <div
                  style={{ width: "70px" }}
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <img src="./images/gellery-img.png" alt="" />
                </div>
              </a>

              {deviceStatus.hasWebcam && CAMERA == "ON" && (
                <a
                  href={"#"}
                  className="d-flex justify-content-center flex-column"
                >
                  <h5>{capturedImage ? "Retake" : "Camera"}</h5>
                  <div
                    style={{ width: "70px" }}
                    onClick={() => capturedImageTogglerHandler(capturedImage)}
                  >
                    <img src="./images/gellery-img.png" alt="" />
                  </div>
                </a>
              )}
            </div>
            <div className="text-center">
              <Button
                onClick={() => onCameraSubmit(capturedImage)}
                disabled={!capturedImage}
              >
                Get your size!
              </Button>
            </div>
            <input {...getInputProps()} ref={inputRef} />
          </Row>
        </Container>
      </Layout>
    </>
  );
};
export default Upload;
