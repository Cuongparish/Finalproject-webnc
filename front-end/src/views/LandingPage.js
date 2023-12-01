import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import LeftBanner from '../components/LeftBanner.';
import '../App.css';

const LandingPage = () => {
  return (
    <Row className="landing-page vh-100 g-0">
      <Col xs={4} className='left-content text-center vh-100'>
          <LeftBanner />
      </Col>
      <Col xs={8} className='right-content text-center vh-100'>
        <Image src={process.env.PUBLIC_URL + '/images/content.png'}
          className="d-inline-block"
          alt=""
          fluid
        />
        <div className='text-content fw-bold'>
          <h1>MAKE YOUR GRADE SUMMARY EASIER AND FASTER</h1>
          <p>The application supports easily restructuring scores, creating scoreboards, easily tracking scores, and quickly receiving appeal requests from students</p>
          <a className="button btn-get-started" href='/login'>Get Started</a>
        </div>
      </Col>
    </Row>
  );
};

export default LandingPage;