import { Container, Row } from "react-bootstrap";
import Layout from "../../Layout";
import Button from "../ui/button";

const Failed = ({ setCurrentScene }) => {
  return (
    <>
      <Layout>
        <Container className="result_page">
          <img className="brand_logo_top" src="./images/bata.png" alt="" />
          <div className="px-4 my-5">
            <div className="d-flex justify-content-center align-items-center">
              <div style={{ width: 200 }} className="error_icon">
                <img src="./images/error.png" alt="" />
              </div>
            </div>

            <h5 className="show_size_text text-center px-4 my-4">
              Scanning Failed!
              <br /> Please take picture again
            </h5>
          </div>
          <div className="text-center px-4">
            <Button onClick={() => setCurrentScene(0)}>TRY AGAIN</Button>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Failed;
