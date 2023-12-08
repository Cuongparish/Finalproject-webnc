import { React, useState } from 'react';
import { Row, Col, Image, Nav, NavDropdown, Tabs, Tab, Card, FloatingLabel, Form, Modal, Button, Table } from 'react-bootstrap';
import { FaBars, FaHome, FaRegCopy, FaLink, FaUserPlus } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const DetailClass = () => {
    const [add_teacher, setAddTeacher] = useState(false);
    const handleAddTeacherClose = () => setAddTeacher(false);
    const handleAddTeacherShow = () => setAddTeacher(true);
    
    const [add_student, setAddStudent] = useState(false);
    const handleAddStudentClose = () => setAddStudent(false);
    const handleAddStudentShow = () => setAddStudent(true);

    return (
        <>
            <Row className='justify-`content`-center py-3 menu-top align-items-center'>
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
                    <a href='/' className='mx-2 btn-member'>Member</a>
                    <a href='/logout' className='button btn-logout'>Log Out</a>
                    {/* <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a> */}
                </Col>
            </Row>

            <Row className='g-0'>
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

                <Col md={10}>
                    <div className='w-100 tab-menu'>
                        <Tabs defaultActiveKey="news" className="border-bottom border-2 px-3 mb-3">
                            <Tab eventKey="news" id='news' title="Bảng tin">
                                <div className='detail-news'>
                                    <Row className='banner-news mb-4'>
                                        <h1>Class Name</h1>
                                    </Row>

                                    <Row>
                                        <Col md={3}>
                                            <Card className="mb-4">
                                                <Card.Header className='fs-6'>Mã lớp</Card.Header>
                                                <Card.Body>
                                                    <Card.Text className='fs-3 fw-bold'>
                                                        gib5tyx
                                                    </Card.Text>
                                                    <Row className='d-flex g-3'>
                                                        <Col>
                                                            <a className='btn-outline-info btn d-flex align-items-center justify-content-center'><FaRegCopy /></a>
                                                        </Col>
                                                        <Col>
                                                            <a className='btn-outline-success btn d-flex align-items-center justify-content-center'><FaLink /></a>      
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>


                                            <Card>
                                                <Card.Header className='fs-6'>Sắp đến hạn</Card.Header>
                                                <Card.Body>
                                                    <Card.Text className='text-muted'>
                                                        Không có bài tập nào sắp đến hạn
                                                    </Card.Text>
                                                    <Row className='text-end'>
                                                        <a href='/' className='button'>Xem tất cả</a>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={9}>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Thông báo nội dung nào đó cho lớp học của ban"
                                                className="mb-4"
                                            >
                                                <Form.Control type="text" placeholder=""/>
                                            </FloatingLabel>

                                            <Card style={{ width: '100%' }}>
                                                <Card.Body>
                                                    <Card.Title>Đây là nơi bạn giao tiếp với cả lớp học của mình</Card.Title>
                                                    <Card.Subtitle className="mb-4 fs-6 fw-bold text-muted">
                                                        Sử dụng bảng tin để thông báo, đăng bài tập và trả lời câu hỏi của học viên
                                                    </Card.Subtitle>
                                                    <a className='btn-outline-dark float-end btn d-flex align-items-center justify-content-center'>
                                                        <IoSettingsOutline className='mx-1' /> Cài đặt bảng tin
                                                    </a>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                </div>
                            </Tab>
                            <Tab eventKey="homework" title="Bài tập trên lớp">
                                <div>Bài tập trên lớp</div>
                            </Tab>
                            <Tab eventKey="members" title="Mọi người">
                                <div className='detail-members'>
                                    <Row className='banner-members mb-4'>
                                        <Col className="d-flex align-items-center border-bottom border-2 border-black">
                                            <h3>Giáo viên</h3>
                                        </Col>
                                        <Col className='text-end border-bottom border-2 border-black'>
                                            <h3>
                                                <a onClick={handleAddTeacherShow} className='button'><FaUserPlus /></a>
                                            </h3>
                                        </Col>
                                    </Row>

                                    <Row className='banner-members mb-4'>
                                        {/* Table Teachers */}
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td className="align-middle"  style={{ width: '5%' }}>
                                                        <input
                                                            type="checkbox"
                                                            // value="id_user"
                                                            // checked={selectedValues.includes('Option 1')}
                                                            // onChange={() => handleCheckboxChange('Option 1')}
                                                        />
                                                    </td>
                                                    <td className="align-middle"  style={{ width: '75%' }}>Trường Khoa Phạm</td>
                                                    <td className="align-middle text-end"  style={{ width: '20%' }}>
                                                        <a onClick="" className='button fs-2 mx-2'>
                                                            <CiCircleMore />
                                                        </a>
                                                    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        {/* Table Teachers */}
                                    </Row>

                                    <Row className='banner-members mb-4'>
                                        <Col className="d-flex align-items-center border-bottom border-2 border-black">
                                            <h3>Sinh viên</h3>
                                        </Col>
                                        <Col className='text-end border-bottom border-2 border-black'>
                                            <h3>
                                                <a onClick={handleAddStudentShow} className='button'><FaUserPlus /></a>
                                            </h3>
                                        </Col>
                                    </Row>

                                    {/* Table Students */}
                                    {/* Data */}
                                    {/* Table Students */}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>

            {/* Modal Add Teacher */}
            <Modal show={add_teacher} style={{ top: '10%' }} onHide={handleAddTeacherClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Mời giáo viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="add_teacher"
                        label="Nhập tên hoặc email"
                        className="mb-3"
                    >
                        <Form.Control id="add_teacher" type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddTeacherClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAddTeacherClose}>
                        Mời
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Modal Add Student */}
            <Modal show={add_student} style={{ top: '10%' }} onHide={handleAddStudentClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Mời sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="add_student"
                        label="Nhập tên hoặc email"
                        className="mb-3"
                    >
                        <Form.Control id="add_student" type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddStudentClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAddStudentClose}>
                        Mời
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailClass;
