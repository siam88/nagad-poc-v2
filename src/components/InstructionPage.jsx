import LogoOne from "../assets/images/logo.png";
import TrainedImg from "../assets/images/trained_image.png";

const InstructionPage = ({ setCurrentScene }) => {
  return (
    <div className="scene_two pb-3">
    <div className="logo_two">
      <img src={LogoOne} alt="logo" />
    </div>
    <div className="scene_one_tagLine">
      <h1 className="pb-2">Trained Image</h1>
    </div>
    <div className="trained_img">
      <img src={TrainedImg} alt="trained result" />
    </div>
    <div className="scene_two_tc px-5 mt-3">
      <p>*We are selected the above types of POSM for POC of SOV</p>
    </div>
    <div className="scene_two_btn">
      <button className="global_btn" onClick={() => setCurrentScene(2)}>
        Trial the POC
      </button>
    </div>
  </div>
  );
};

export default InstructionPage;
