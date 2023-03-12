import React, { useEffect, useState } from "react";
import LogoOne from "../assets/images/logo_1.png";

const { REACT_APP_SERVER_ROOT: SERVER_ROOT } = process.env;

const ResultImagePreviewPage = ({ setCurrentScene, result }) => {
  const [image, setImage] = useState();
  const [finalResult, setFinalResult] = useState();
  const [calculatedValues, setCalculatedValues] = useState([]);

  useEffect(() => {
    const { out } = result;

    setImage(`${SERVER_ROOT}/${out.path.preview}`);
  }, []);

  return (
    <div className="app_wrapper">
      <div className="scene_three">
        <div className="logo_two">
          <img src={LogoOne} alt="logo" />
        </div>

        <div className="scene_three_picture mb-3">
          <h2 className="text-center mb-3">Result Image</h2>

          <div className="result_img">
            <img src={image} alt="result " />
          </div>
        </div>
        <div className="scene_three_btn mb-3">
          <button
            className="global_btn"
            onClick={() => setCurrentScene((prev) => prev - 1)}
          >
            Retry
          </button>
        </div>
        <div className="scene_three_btn">
          <button
            className="global_btn"
            onClick={() => setCurrentScene((prev) => prev + 1)}
          >
            See Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultImagePreviewPage;
