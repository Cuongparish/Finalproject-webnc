import {Routes, Route, Navigate, Link} from 'react-router-dom';
import { Navbar, Container, Image, Nav} from 'react-bootstrap';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      {/* <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/home">
              <Image src={process.env.PUBLIC_URL + '/images/logo.png'}
                className="d-inline-block align-top"
                alt=""
                width={200}
            /> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} to="/home">
                  <div className="btn-custom">Home</div>
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <div className="btn-custom">Log In</div>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <div className="btn-custom">Sign Up</div>
                </Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>*/}
      <Routes>
        <Route path="/" element={<Navigate to="/introduction" />} />
        <Route path="/introduction" exact element={<LandingPage />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
