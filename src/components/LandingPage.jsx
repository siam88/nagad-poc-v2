import LogoOne from "../assets/images/logo_1.png";

const LandingPage = ({ setCurrentScene, isAppInstalled, promptToInstall }) => {
  return (
    <div className="app_wrapper">
      <div className="scene_one">
        <div className="logo_one">
          <img src={LogoOne} alt="logo" />
        </div>
        <div className="scene_brand">
          <h1>Welcome to POC of Share of Visibility </h1>
        </div>

        <div className="scene_one_btn">
          <btton className="global_btn" onClick={() => setCurrentScene(1)}>
            Start
          </btton>
        </div>
       
      </div>
    </div>
  );
};

export default LandingPage;
