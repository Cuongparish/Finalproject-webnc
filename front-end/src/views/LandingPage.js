import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import LeftBanner from "../components/LeftBanner.";
import "../App.css";

const LandingPage = () => {
  return (
    <Row className="landing-page vh-100 g-0">
      <Col xs={4} className="left-content text-center vh-100">
        <LeftBanner />
      </Col>
      <Col xs={8} className="right-content text-center vh-100">
        <Image
          src={process.env.PUBLIC_URL + "Images/content.png"}
          className="d-inline-block"
          alt=""
          fluid
          // style={{ maxHeight: "40px", maxWidth: "1000px" }}
        />
        <div className="text-content fw-bold">
          <h3 style={{ marginTop: "20px" }}>
            MAKE YOUR GRADE SUMMARY EASIER AND FASTER
          </h3>

          <p5 style={{ marginTop: "20px" }}>
            The application supports easily restructuring scores, creating
            scoreboards, easily tracking scores, and quickly receiving appeal
            requests from students
          </p5>
        </div>
        <a
          className="button btn-get-started "
          href="/login"
          style={{ marginTop: "20px" }}
        >
          Get Started
        </a>
      </Col>
    </Row>
  );
};

export default LandingPage;
