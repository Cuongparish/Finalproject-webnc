import React, {useState} from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import LeftBanner from "../components/LeftBanner.";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.localAuth(Email, Pw).then(
        (res) => {
          //console.log(res)
          const user = res;
          console.log(JSON.stringify(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
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
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Return Home{" "}
          </a>
          <span>
            Not a Member?
            <a href="/signup" className="fw-bold">
              {" "}
              SIGN UP NOW{" "}
            </a>
          </span>
        </Container>
        <Container className="text-center">
          <h3 className="mt-5 fw-bold">WELCOME BACK EXCLUSIVE MEMBER</h3>
          <h6 className="mb-5">LOGIN TO CONTINUE</h6>
          <Form>
            <Row className="justify-content-md-center mb-2">
              <Col lg={4}>
                <InputGroup className="m-2 ml-4">
                  <InputGroup.Text>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicEmail"
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center mb-2">
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text>
                    <i class="fa fa-venus-mars" aria-hidden="true"></i>
                  </InputGroup.Text>
                  <Form.Control
                    controlId="formBasicPassword"
                    type="password"
                    placeholder="Password"
                    onChange={e => setPw(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Button as={Col} lg={3} type="submit" className="bg-dark mb-2" onClick={handleLogin}>
              Log in
            </Button>
          </Form>
          <a href="/ResetPW">
            <p>Having Issues with your Password?</p>
          </a>

          <p className="fs-5">OR LOGIN WITH</p>
          <Row className="justify-content-md-center my-4">
            <Button
              as={Col}
              lg={2}
              type="submit"
              className="bg-dark p-2"
              onClick={AuthService.googleAuth}
            >
              Google
            </Button>
            <Col lg={1}></Col>
            <Button
              as={Col}
              lg={2}
              type="submit"
              className="bg-dark p-2"
              onClick={AuthService.facebookAuth}
            >
              Facebook
            </Button>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default Login;
