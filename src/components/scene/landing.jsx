import Layout from "../../Layout";
import Button from "../ui/button";

const Landing = ({ setCurrentScene, setGender }) => {
  const onStartHandler = () => {
    setCurrentScene(1);
    setGender("");
  };
  return (
    <Layout>
      <div className="landing_page">
        <div className="brand_logo ">
          <img src="./images/bata.png" alt="" />
        </div>
        <div className="show_lg_wrapper">
          <div className="show_lg">
            <img src="./images/show-lg.png" alt="" />
          </div>
        </div>
        <div className="inner_content px-4">
          <h2 className="title text-light mt-3">Find your shoe size!</h2>
          <p className="text-light mb-4">
            Get your shoe size by uploading or taking an image of your right
            foot on a white A4 sheet of paper. For the best result, please take
            your photo from the top view and capture the whole paper sheet.
          </p>
          <div className="text-center mb-4 mb-5">
            <Button onClick={() => onStartHandler()}> GET STARTED</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Landing;
