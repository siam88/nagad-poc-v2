import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../Layout";
import Button from "../../components/ui/button";

const Instruction = ({ setCurrentScene }) => {
  return (
    <>
      <Layout>
        <Container className="instruction_page">
          <img className="brand_logo_top" src="./images/bata.png" alt="" />

          <Row className="px-4 pb-3 ">
            <h2 className="title_2 mt-3 mb-3">Picture Sample</h2>
            <Col xs={8} className="mx-auto p-0 mb-3">
              <div className="sample_img">
                <img src="./images/sample.png" alt="" />
              </div>
            </Col>
            <p className="text-light text-center px-4 mb-4">
              Place your right foot like the photo given above.
            </p>
            <div className="text-center">
              <Button onClick={() => setCurrentScene(3)}>NEXT</Button>
            </div>
          </Row>
        </Container>
      </Layout>
    </>
  );
};
export default Instruction;
