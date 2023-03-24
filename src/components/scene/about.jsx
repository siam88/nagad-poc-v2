import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../Layout";
import Button from "../../components/ui/button";

const About = ({ setCurrentScene,gender, setGender }) => {
  return (
    <>
      <Layout>
        <Container className="about_page">
          <img className="brand_logo_top" src="./images/bata.png" alt="" />
          <h2 className="title_2 py-4">About You</h2>{" "}
          <form action="" className="mx-4">
            <Row className=" mx-4">
              <Col xs={6}>
                <div className="mb-5" onClick={() => setGender("m")}>
                  <input type="radio" name="gender" id="male" value="male" />
                  <label
                    htmlFor="male"
                    className=" d-flex justify-content-center align-items-center flex-column"
                  >
                    Male
                    <div
                      style={{ width: 80, height: 80 }}
                      className="usr-icon mt-2"
                    >
                      <img
                        className="black_white_img"
                        src="./images/male.png"
                        alt=""
                      />
                      <img
                        className="color_img"
                        src="./images/male-color.png"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="mb-5" onClick={() => setGender("f")}>
                  <input
                    type="radio"
                    name="gender"
                    id="femail"
                    value="femail"
                  />
                  <label
                    htmlFor="femail"
                    className=" d-flex justify-content-center align-items-center flex-column"
                  >
                    Female
                    <div
                      style={{ width: 80, height: 80 }}
                      className="usr-icon mt-2"
                    >
                      <img
                        className="black_white_img"
                        src="./images/female.png"
                        alt=""
                      />
                      <img
                        className="color_img"
                        src="./images/female-color.png"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="" onClick={() => setGender("km")}>
                  <input
                    type="radio"
                    name="gender"
                    id="male-kids"
                    value="male-kids"
                  />
                  <label
                    htmlFor="male-kids"
                    className=" d-flex justify-content-center align-items-center flex-column"
                  >
                    Male-Kids
                    <div
                      style={{ width: 80, height: 80 }}
                      className="usr-icon mt-2"
                    >
                      <img
                        className="black_white_img"
                        src="./images/male-kids.png"
                        alt=""
                      />
                      <img
                        className="color_img"
                        src="./images/male-kids-color.png"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </Col>
              <Col xs={6}>
                <div className="" onClick={() => setGender("kf")}>
                  <input
                    type="radio"
                    name="gender"
                    id="femail-kids"
                    value="femail-kids"
                  />
                  <label
                    htmlFor="femail-kids"
                    className=" d-flex justify-content-center align-items-center flex-column"
                  >
                    Female Kids
                    <div
                      style={{ width: 80, height: 80 }}
                      className="usr-icon mt-2"
                    >
                      <img
                        className="black_white_img"
                        src="./images/female-kids.png"
                        alt=""
                      />
                      <img
                        className="color_img"
                        src="./images/female-kids-color.png"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </Col>
            </Row>{" "}
          </form>
          <div className="text-center mt-5 px-4">
            <Button onClick={() => setCurrentScene(2)} disabled={!gender}>NEXT</Button>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default About;
