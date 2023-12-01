/* eslint-disable jsx-a11y/img-redundant-alt */
import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel, Row, Image } from 'react-bootstrap';
//import { Link } from 'react-router-dom'; 

const Home = () => {
    return (
        <Row className='pt-5'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <Image
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + '/images/slide_1.jpg'}
                        height={670}
                        alt=""
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <Image
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + '/images/slide_1.jpg'}
                        height={670}
                        alt=""
                    />
                </Carousel.Item>
            </Carousel>
        </Row>
    );
}

export default Home;
