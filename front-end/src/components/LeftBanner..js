import React from 'react';
import { Image } from 'react-bootstrap';
import '../App.css';

const LeftBanner = () => {
    return (
        <>
            <Image src={process.env.PUBLIC_URL + '/images/logo.png'}
              className="d-inline-block top-logo"
              alt=""
              fluid
            />
            <h1 id='brand_name'>Grade Management</h1>
            {/* <div className='background-img'></div> */}
            <Image src={process.env.PUBLIC_URL + '/images/shake-hand.png'}
                className="d-inline-block middle-logo"
                alt=""
                fluid
            />
            <div className='info-text'>
                <h1>Your class partner</h1>
                <p>Reduce the time spent managing your class grades</p>
            </div>
        </>
    );
}

export default LeftBanner;