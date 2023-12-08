import { React, useState } from 'react';
import { Row, Col, Image, Nav, NavDropdown, Dropdown, Modal, Button, Form, Accordion } from 'react-bootstrap';
import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import ClassRoom from '../components/ClassRoom';
import AuthService from "../service/auth.service";
import ClassService from "../service/class.service";
import '../App.css';

const Home = (props) => {
    const user = props.user;
    //console.log(user);

    const [TenLop, setTenLop] = useState();
    const [ChuDe, setChuDe] = useState();
    const [Phong, setPhong] = useState();

    const handleCreateClass = async (e) => {
        e.preventDefault();
    try {
      await ClassService.CreateClass(user.idUser, TenLop, ChuDe, Phong).then(
        (res) => {
          console.log("res: ", res);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
    }

    const [join_show, setJoinShow] = useState(false);
    const handleJoinClose = () => setJoinShow(false);
    const handleJoinShow = () => setJoinShow(true);

    const [create_show, setCreateShow] = useState(false);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    return (
        <>
            <Row className='justify-content-center py-3 menu-top align-items-center'>
                <Col xs md={1}>
                    <a href="/home" className="fs-3 btn-menu"><FaBars /></a>
                </Col>
                <Col xs md={{ span: 4, offset: 3 }} className='d-flex justify-content-center align-items-center'>
                    <Image src={process.env.PUBLIC_URL + '/Images/logo.png'}
                        className="d-inline-block mx-2"
                        alt=""
                        width={50}
                    />
                    <h3 className='mb-0'>Grade Management</h3>
                </Col>
                <Col xs md={{ span: 2, offset: 1 }} className='d-flex justify-content-end align-items-center'>
                    <Dropdown as={Col}>
                        <Dropdown.Toggle split id="dropdown-split-basic">
                            <FaPlus />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleJoinShow} >Tham gia lớp học</Dropdown.Item>
                            <Dropdown.Item onClick={handleCreateShow}>Tạo lớp học</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <a href='/home' className='mx-2 btn-member'>Member</a>
                    <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a>
                    {/* <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a> */}
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
                        {/* <NavDropdown title={<span><FaHome className='mx-2' /> Các lớp tham gia </span>} id="nav-dropdown">
                            <NavDropdown.Item eventKey="2.1">Web nâng cao</NavDropdown.Item>
                            <NavDropdown.Item eventKey="2.2">Web cơ bản</NavDropdown.Item>
                            <NavDropdown.Item eventKey="2.3">Cơ sở dữ liệu</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item> 
                        </NavDropdown> */}

                        <Accordion defaultActiveKey={['0', '1']} alwaysOpen flush>
                            <Accordion.Item className='menu-left text-white' eventKey="0">
                                <Accordion.Header>Giảng dạy</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <div>Hello</div>
                                        <div>World</div>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className='menu-left text-white' eventKey="1">
                                <Accordion.Header>Theo học</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <div>Hello</div>
                                        <div>World</div>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Nav>
                </Col>

                <Col as={Row} md={10} className='d-flex g-0 p-3 right-content'>
                    <ClassRoom />
                    <ClassRoom />
                    <ClassRoom />
                    <ClassRoom />
                    <ClassRoom />
                </Col>
            </Row>

            {/* Modal Join Class */}
            <Modal show={join_show} onHide={handleJoinClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Tham gia lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label className='mb-0' style={{ fontSize: '20px' }}>Mã lớp</Form.Label>
                            <Form.Text className='mb-2' style={{ display: 'block' }} muted>
                                Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
                            </Form.Text>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Text className='mb-2' style={{ display: 'block' }} muted>
                            <span className='fw-bold'>Cách đăng nhập bằng mã lớp học:</span>
                            <ul>
                                <li>Sử dụng tài khoản được cấp phép</li>
                                <li>Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu cách hoặc ký hiệu</li>
                            </ul>
                        </Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleJoinClose}>
                        Tham gia
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Create Class */}
            <Modal show={create_show} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Tạo lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên lớp học (bắt buộc)</Form.Label>
                            <Form.Control type="text"  onChange={(e) => setTenLop(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="topic">
                            <Form.Label>Chủ đề</Form.Label>
                            <Form.Control type="text" onChange={(e) => setChuDe(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="room_name">
                            <Form.Label>Phòng</Form.Label>
                            <Form.Control type="text" onChange={(e) => setPhong(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleCreateClass}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;
