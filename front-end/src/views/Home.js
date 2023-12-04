import '../App.css';
import React from 'react';
import { Row, Col, Image, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
import { FaBars, FaHome } from "react-icons/fa";
import { RxEnter } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import AuthService from "../service/auth.service";
import '../App.css';

const Home = () => {
    return (
        <>
            <Row className='justify-content-center py-3 menu-top align-items-center'>
                <Col xs md={1}>
                    <a href="/home" className="fs-3 btn-menu"><FaBars /></a>
                </Col>
                <Col xs md={{ span: 4, offset: 3 }} className='d-flex justify-content-center align-items-center'>
                    <Image src={process.env.PUBLIC_URL + '/images/logo.png'}
                    className="d-inline-block mx-2"
                    alt=""
                    width={50}
                    />
                    <h3 className='mb-0'>Grade Management</h3>
                </Col>
                <Col xs md={{ span: 2, offset: 1 }} className='text-end'>
                    <a href='/' className='mx-4 btn-member'>Member</a>
                    <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a>
                </Col>
            </Row>

            <Row className='vh-100 g-0'>
                <Col md={2} className="menu-left">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home" className="element-left">
                            <FaHome className='mx-2' /> Màn hình chính
                        </Nav.Link>
                        {/* <Nav.Link eventKey="link-1">Các</Nav.Link>
                        <Nav.Link eventKey="link-2">Link</Nav.Link> */}
                        <NavDropdown title={<span><FaHome className='mx-2' /> Các lớp tham gia </span>} id="nav-dropdown">
                            <NavDropdown.Item eventKey="2.1">Web nâng cao</NavDropdown.Item>
                            <NavDropdown.Item eventKey="2.2">Web cơ bản</NavDropdown.Item>
                            <NavDropdown.Item eventKey="2.3">Cơ sở dữ liệu</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Col>

                <Col as={Row} md={10} className='d-flex g-0 p-3 right-content'>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                    <Card className="class-item">
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + '/images/class_bg.png'}
                            height={80}
                        />
                        <Card.Body>
                            <Card.Title>2309-PTUDWNC-20_3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
                            <Card.Text>Khánh Nguyễn Huy</Card.Text>
                            <Button variant="primary">Truy cập <RxEnter /></Button>
                            <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Home;
