import LogoOne from "../assets/images/logo.png";
import TrainedImg from "../assets/images/trained_image.png";

const InstructionPage = ({ setCurrentScene, setGender }) => {
  const onSelectGender = (type) => {
    setGender(type);
    setCurrentScene(2);
  };
  return (
    <div className="scene_two pb-3">
      <div className="logo_two">
        <img src={LogoOne} alt="logo" />
      </div>
      <div className="scene_one_tagLine">
        <h1 className="pb-2">About You </h1>
      </div>

      <div className="scene_two_btn">
        <button
          className="global_btn my-2 py-4  w-100 "
          onClick={() => onSelectGender("m")}
        >
          Male(Adult)
        </button>
        <button
          className="global_btn my-2 py-4 w-100"
          onClick={() => onSelectGender("f")}
        >
          Female(Adult)
        </button>
        <button
          className="global_btn my-2 py-4 w-100"
          onClick={() => onSelectGender("km")}
        >
          Male(child)
        </button>
        <button
          className="global_btn my-2 py-4 w-100"
          onClick={() => onSelectGender("kf")}
        >
          Female(child)
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
