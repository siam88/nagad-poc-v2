import { Container } from "react-bootstrap";
import Layout from "../../Layout";
import Button from "../ui/button";

const Result = ({ results, setCurrentScene }) => {
  return (
    <>
      <Layout>
        <Container className="result_page">
          <img className="brand_logo_top" src="./images/bata.png" alt="" />
          <div className="px-4 my-5">
            <div className="d-flex justify-content-center align-items-center">
              <div style={{ width: 280, height: 280 }} className="result_img">
                <img src="./images/result-img.png" alt="" />
              </div>
            </div>

            <h5 className="show_size_text text-light text-center px-4 my-4">
              You can try Shoe <br /> <br />
              Size {results.Show_size} ({results.feet_size_cm.toFixed(2)}cm)
            </h5>
          </div>
          <div className="text-center px-4">
            <Button onClick={() => setCurrentScene(0)}>Go Home</Button>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Result;
