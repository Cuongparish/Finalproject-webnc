import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import LeftBanner from "../components/LeftBanner.";

const Signup = () => {
  return (

    <Row className="landing-page vh-100 g-0">
      <Col xs={4} className='left-content text-center vh-100'>
          <LeftBanner />
      </Col>
      <Col xs={8} className='right-content vh-100'>
        <Container className="navigator d-flex justify-content-between align-items-center">
          <a href="/" className="button btn-back"><i class="fa fa-chevron-left" aria-hidden="true"></i> Return Home </a>
          <span>Already a Member?<a href="/" className="fw-bold"> LOGIN NOW </a></span>
        </Container>
        <Container className="text-center">
          <h3 className="mt-5 fw-bold">BECOME AN EXCLUSIVE MEMBERS</h3>
          <h6 className="mb-5">SIGN UP AND JOIN OUR MEMBER</h6>
          <Form>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2 ml-4">
                  <InputGroup.Text><i class="fa fa-user-o" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicName" type="text" placeholder="Johnson Doe"/>
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text><i class="fa fa-venus-mars" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicGender" type="text" placeholder="Male"/>
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text><i class="fa fa-user-o" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicEmail" type="email" placeholder="example@email.com"/>
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text><i class="fa fa-calendar" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicDOB" type="date" />
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text><i class="fa fa-key" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicPassword" type="password" placeholder="Password"/>
                </InputGroup>
              </Col>
              <Col lg={1}></Col>
              <Col lg={4}>
                <InputGroup className="m-2">
                  <InputGroup.Text><i class="fa fa-phone" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control controlId="formBasicEmail" type="number" placeholder="0123456789"/>
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-md-center my-4">
              <Col lg={4}>
                <Form.Group controlId="formBasicCheckbox" className='p-2'>
                  <Form.Check type="checkbox" label="I Accept The Terms & Conditions" />
                </Form.Group>
              </Col>
            </Row>
            <Button as={Col} lg={4} type="submit" className='bg-dark mb-2'>
              Become a Member
            </Button>
          </Form>

          <p>OR</p>
          <Row className="justify-content-md-center my-4">
            <Button as={Col} lg={2} type="submit" className='bg-dark p-2'>
              Google
            </Button>
            <Col lg={1}></Col>
            <Button as={Col} lg={2} type="submit" className='bg-dark p-2'>
              Facebook
            </Button>
            </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default Signup;
