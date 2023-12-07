import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import LeftBanner from "../components/LeftBanner.";
import SignupService from "../service/signup.service";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const Signup = () => {
  const [Email, setEmail] = useState();
  const [Pw, setPw] = useState();
  //const [Role, setRole] = useState();
  const [FullName, setFullName] = useState();
  const [Sex, setSex] = useState();
  const [DOB, setDOB] = useState();
  const [Phone, setPhone] = useState();
  const [Verify, setVerify] = useState();
  const [VerifyMail, setVerifyMail] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const hanldeSignup = async (e) => {
    e.preventDefault();
    try {
      await SignupService.signup(Email, Pw, FullName, Sex, DOB, Phone).then(
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
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (Verify === VerifyMail) {
      try {
        await SignupService.verify(Email, Pw, FullName, Sex, DOB, Phone).then(
          (res) => {
            console.log(res);
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
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Row className="landing-page vh-100 g-0">
      <Col xs={4} className="left-content text-center vh-100">
        <LeftBanner />
      </Col>
      <Col xs={8} className="right-content vh-100">
        <Container className="navigator d-flex justify-content-between align-items-center">
          <a href="/" className="button btn-back">
            <FaChevronLeft /> Return Home{" "}
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
          <h3 className="mt-3 fw-bold">BECOME AN EXCLUSIVE MEMBERS</h3>
          <h6 className="mb-3">SIGN UP AND JOIN OUR MEMBER</h6>
          <Form>
            <Row className="justify-content-md-center text-start mb-2">
              <Col lg={4}>
                <Form.Group className="m-2" controlId="fullname">
                  <Form.Label className="fw-bold">Fullname:</Form.Label>
                  <Form.Control
                    controlId="formBasicName"
                    type="text"
                    placeholder="Johnson Doe"
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-2 border-black"
                  />
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <Form.Group className="m-2" controlId="gender">
                  <Form.Label className="fw-bold">Gender:</Form.Label>
                  {/* <Form.Control
                    controlId="formBasicGender"
                    type="text"
                    placeholder="Male"
                    onChange={(e) => setSex(e.target.value)}
                    className="border-2 border-black"
                  /> */}
                   <Form.Select
                    defaultValue="Male"
                    className="border-2 border-black"
                    value={Sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center text-start mb-2">
              <Col lg={4}>
                <Form.Group className="m-2" controlId="mail">
                  <Form.Label className="fw-bold">Mail:</Form.Label>
                  <Form.Control
                    controlId="formBasicEmail"
                    type="email"
                    placeholder="example@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-black"
                  />
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <Form.Group className="m-2" controlId="dob">
                  <Form.Label className="fw-bold">Date of Birth:</Form.Label>
                  <Form.Control
                    controlId="formBasicDOB"
                    type="date"
                    className="border-2 border-black"
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center text-start mb-2">
              <Col lg={4}>
                <Form.Group className="m-2" controlId="password">
                  <Form.Label className="fw-bold">Password:</Form.Label>
                  <Form.Control
                    controlId="formBasicPassword"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPw(e.target.value)}
                    className="border-2 border-black"
                  />
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <Form.Group className="m-2" controlId="phone">
                  <Form.Label className="fw-bold">Phone number:</Form.Label>
                  <Form.Control
                    controlId="formBasicphone"
                    type="tel"
                    placeholder="0123456789"
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 border-black"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center text-start my-4">
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
          <Row className="justify-content-md-center my-4 align-items-center">
            <Form.Label as={Col} lg={2} className="fw-bold mb-0 p-0">
              Your Code:
            </Form.Label>
            <Col lg={4}>
              <Form.Group controlId="phone">
                <Form.Control
                  controlId="formBasicVerify"
                  type="text"
                  placeholder="Verify code"
                  onChange={(e) => setVerify(e.target.value)}
                  className="border-2 border-black"
                />
              </Form.Group>
            </Col>
            <Button
              as={Col}
              lg={1}
              type="submit"
              className="bg-dark p-3"
              onClick={handleVerify}
            >
              Verify
            </Button>
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
