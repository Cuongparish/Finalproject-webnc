import React, {useState} from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import LeftBanner from "../components/LeftBanner.";
import SignupService from "../service/signup.service";
import { useNavigate } from "react-router-dom";

const ResetPW = () => {
  const [Email, setEmail] = useState();

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await SignupService.resetPw(Email).then(
        (res) => {
          //console.log(res)
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Row className="landing-page vh-100 g-0">
      <Col xs={4} className="left-content text-center vh-100">
        <LeftBanner />
      </Col>
      <Col xs={8} className="right-content vh-100">
        <Container className="navigator d-flex justify-content-between align-items-center">
          <a href="/" className="button btn-back">
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Return Home{" "}
          </a>
          <span>
            <a href="/LOGIN" className="fw-bold">
              {" "}
              LOGIN NOW{" "}
            </a>
          </span>
          <span>
            Not a Member?
            <a href="/signup" className="fw-bold">
              {" "}
              SIGN UP NOW{" "}
            </a>
          </span>
        </Container>
        <Container className="text-center">
          <h3 className="mt-5 fw-bold">FORGOT PASSWORD</h3>
          <h6 style={{ marginTop: "150px" }}>
            Please enter the email of your account!
          </h6>
          <Form>
            <Row
              className="justify-content-md-center mb-4"
              style={{ marginTop: "10px" }}
            >
              <Col lg={4}>
                <InputGroup className="m-2 ml-4">
                  <InputGroup.Text>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicName"
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Button as={Col} lg={1} type="submit" className="bg-dark mb-2" onClick={handleReset}>
              Send
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ResetPW;
