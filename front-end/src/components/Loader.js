import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" role="status">
      </Spinner>
      <h3 className="sr-only">Loading...</h3>
      {/* <Image
        src={process.env.PUBLIC_URL + "Images/Spin-1s-200px.gif"}
        alt="Loading..."
      /> */}
    </div>
  );
};

export default Loader;