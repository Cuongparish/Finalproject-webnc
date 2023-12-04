import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import LeftBanner from "../components/LeftBanner.";
import SignupService from "../service/signup.service";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [Email, setEmail] = useState();
  const [Pw, setPw] = useState();
  const [Role, setRole] = useState();
  const [Verify, setVerify] = useState();
  const [VerifyMail, setVerifyMail] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const hanldeSignup = async (e) => {
    e.preventDefault();
    try {
      await SignupService.signup(Email, Pw, Role).then(
        (res) => {
          console.log("Verify mail: ", res);
          setVerifyMail(res);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    if (Verify === VerifyMail) {
      try {
        await SignupService.verify(Email, Pw, Role).then(
          (res) => {
            console.log(res)
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
    else {
      setShowAlert(true);
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
            Already a Member?
            <a href="/login" className="fw-bold">
              {" "}
              LOGIN NOW{" "}
            </a>
          </span>
        </Container>
        <Container className="text-center">
          <h3 className="mt-5 fw-bold">BECOME AN EXCLUSIVE MEMBERS</h3>
          <h6 className="mb-5">SIGN UP AND JOIN OUR MEMBER</h6>
          <Form>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2 ml-4">
                  <InputGroup.Text>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicName"
                    type="text"
                    placeholder="Johnson Doe"
                  />
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-venus-mars" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicGender"
                    type="text"
                    placeholder="Male"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicEmail"
                    type="email"
                    placeholder="example@email.com"
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control controlId="formBasicDOB" type="date" />
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-key" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicPassword"
                    type="password"
                    placeholder="Password"
                    onChange={e => setPw(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicEmail"
                    type="number"
                    placeholder="0123456789"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center my-4">
              <Col lg={4}>
                <Form.Group controlId="formBasicCheckbox" className="p-2">
                  <Form.Check
                    type="checkbox"
                    label="I Accept The Terms & Conditions"
                  />
                </Form.Group>
              </Col>
            </Row>

            <h9>
              The confirmation code will be sent to the email you registered
              with as soon as you click the "Become a Member".
            </h9>

            <Button
              style={{ marginTop: "20px" }}
              as={Col}
              lg={4}
              type="submit"
              className="bg-dark mb-2"
              onClick={hanldeSignup}
            >
              Become a Member
            </Button>
          </Form>

          <Row className="justify-content-md-center my-4">
            <Col lg={-1}></Col>
            <Button as={Col} lg={1} type="submit" className="bg-dark p-3" onClick={handleVerify}>
              Verify
            </Button>

            <Col lg={4}>
              <InputGroup className="m-2">
                <InputGroup.Text>
                  <i class="fa fa-user-o" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control 
                  controlId="formBasicVerify" 
                  type="text" 
                  placeholder="Verify code"
                  onChange={e => setVerify(e.target.value)} 
                />
              </InputGroup>
            </Col>
          </Row>

          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Mã xác thực không đúng
            </Alert>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default Signup;
