import { useDropzone } from "react-dropzone";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { dataURLtoFile } from "../helpers";
import LogoOne from "../assets/images/logo.png";
import CameraImage from "../assets/images/camera.svg";
import UploadImg from "../assets/images/upload.svg";
import ResultImg from "../assets/images/result.jpg";
import useMediaDevices from "./../hooks/useMediaDevices";
import CameraModal from "../pages/CameraModal";

const { REACT_APP_SERVER_ROOT: SERVER_ROOT } = process.env;
const { REACT_APP_CAMERA: CAMERA } = process.env;

const UploadPage = ({
  setCurrentScene,
  setLoading,
  setResults,
  setImageUpdated,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [Mode, setMode] = useState("Camera");
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [videoConstraints, SetvideoConstraints] = useState({
    width: 1280,
    height: 720,
  });
  const deviceStatus = useMediaDevices();

  const inputRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, [deviceStatus]);
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
        if (cbErr) {
          cbErr(e);
        }
      });
  };
  const onCameraSubmit = (img) => {
    var formData = new FormData();
    formData.append("file", dataURLtoFile(img));
    submitImage(
      formData,
      (result) => {
        setImageUpdated(true);
        setCurrentScene(2);
        setResults(result);
        setLoading(false);
      },
      () => {}
    );
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setMode("Camera");
  };
  const onDrop = useCallback((acceptedFiles) => {
    let errors = 0;
    setImageUpdated(false);
    acceptedFiles.forEach((file) => {
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.onabort = () => toast.warn("file reading was aborted");
        reader.onerror = () => toast.warn("file reading has failed");
        reader.onload = () => {
          setLoading(true);
          // const binaryStr = reader.result;

          var formData = new FormData();
          formData.append("file", file);
          // formData.append("file", dataURLtoFile(binaryStr));
          setResults();
          submitImage(
            formData,
            (result) => {
              console.log(result);
              setImageUpdated(true);
              setCurrentScene(2);
              setResults(result);
              setLoading(false);
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
      }
    });
    if (errors) {
      setImageUpdated(false);

      toast.error("Can not process non-image files.");
    }
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setMode("Preview");
  }, [webcamRef]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {show && (
        <CameraModal
          show={show}
          handleClose={handleClose}
          webcamRef={webcamRef}
          videoConstraints={videoConstraints}
          capture={capture}
          Mode={Mode}
          setMode={setMode}
          capturedImage={capturedImage}
          onCameraSubmit={onCameraSubmit}
          Loading={loading}
        />
      )}

      {!show && (
        <div
          {...getRootProps({
            role: "unset",
          })}
          onClick={(e) => {}}
        >
          <input {...getInputProps()} ref={inputRef} />
          <div className="scene_three">
            <div className="logo_two">
              <img src={LogoOne} alt="logo" />
            </div>

            {loading ? (
              <div className="scene_three_picture my-5">
                <div className="text-center">
                  <div
                    className="spinner-grow"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <h2 className="">Processing...</h2>
              </div>
            ) : (
              <div className="scene_three_picture my-4 ">
                <h2 className="text-center">Sample Picture</h2>
                <img src={ResultImg} alt="result" />
              </div>
            )}
            {!loading && (
              <div className="btns">
                {deviceStatus.hasWebcam && CAMERA == "ON" && (
                  <button onClick={() => setShow(true)}>
                    <img src={CameraImage} alt="camera " />
                    <p>Camera</p>
                  </button>
                )}

                <button
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <img src={UploadImg} alt="upload file" />

                  <p>Upload</p>
                </button>
              </div>
            )}
            {/* <div className="scene_three_btn">
              <button  className="global_btn">
                Submit{" "}
                {loading && (
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPage;
