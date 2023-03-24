import React, { Children } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Layout(props) {
  return (
    <>
      <Container fluid="true">
        <div className="bg_img"></div>
        {props.children}
      </Container>
    </>
  );
}

export default Layout;
