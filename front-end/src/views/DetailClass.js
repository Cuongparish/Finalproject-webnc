import { React, useState, useEffect } from 'react';
import { Row, Col, Image, Tabs, Tab, Card, FloatingLabel, Form, Modal, Button, Table } from 'react-bootstrap';
import { FaBars, FaRegCopy, FaLink, FaUserPlus } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
//import { CiCircleMore } from "react-icons/ci";
import copy from 'clipboard-copy';

import 'bootstrap/dist/css/bootstrap.min.css';
import MenuLeft from '../components/MenuLeft';

import AuthService from "../service/auth.service";
import ClassService from "../service/class.service";

import '../App.css';

const Client_URL = "http://localhost:3000"

const DetailClass = (props) => {
    const { malop } = useParams();
    //console.log("Ma lop: ",malop);
    //const malop = match.params.malop;
    const user = props.User;

    const link = `${Client_URL}/join-class/${malop}/hs`

    const [add_teacher, setAddTeacher] = useState(false);
    const handleAddTeacherClose = () => setAddTeacher(false);
    const handleAddTeacherShow = () => setAddTeacher(true);

    const [add_student, setAddStudent] = useState(false);
    const handleAddStudentClose = () => setAddStudent(false);
    const handleAddStudentShow = () => setAddStudent(true);

    const [TeacherClasses, setTeacherClasses] = useState([]);
    const [StudentClasses, setStudentClasses] = useState([]);

    const [DetailClass, setDetailClass] = useState();

    const [TeacherInClass, setTeacherInClass] = useState([]);
    const [StudentInClass, setStudentInClass] = useState([]);

    const [Email, setEmail] = useState();

    useEffect(() => {
        console.log("123");
        Promise.all([GetClassList(), GetDetailClass(), GetListUserInClass()]);
    }, [user]);

    function CopyCode(code) {
        const textToCopy = code;

        const copyText = () => {
            copy(textToCopy)
                .then(() => {
                    alert('Đã sao chép!');
                })
                .catch((err) => {
                    alert('Lỗi khi sao chép: ' + err);
                });
        };

        return copyText;
    }

    function CopyLink(link) {
        const textToCopy = link;

        const copyText = () => {
            copy(textToCopy)
                .then(() => {
                    alert('Đã sao chép!');
                })
                .catch((err) => {
                    alert('Lỗi khi sao chép: ' + err);
                });
        };

        return copyText;
    }

    const GetDetailClass = async () => {
        try {
            console.log("1111");
            await ClassService.GetDetailClass(malop).then(
                (res) => {
                    console.log("res-detail-class: ", res[0]);
                    if (res) {
                        setDetailClass(res[0]);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const GetClassList = async () => {
        try {
            //console.log(1111);
            await ClassService.GetClasses(user.idUser).then(
                (res) => {
                    //console.log("res[0].data: ", res[0].data);
                    //console.log("res[1].data: ", res[1].data);
                    if (res[0].data) {
                        setTeacherClasses(res[0].data);
                    }
                    if (res[1].data) {
                        setStudentClasses(res[1].data);
                    }

                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const GetListUserInClass = async () => {
        try {
            //console.log(1111);
            await ClassService.GetListUserInClass(malop).then(
                (res) => {
                    // console.log("res[0].data: ", res.data[0]);
                    // console.log("res[1].data: ", res.data[1]);
                    //console.log("res: ",res[0].data);
                    if (res[0].data) {
                        setTeacherInClass(res[0].data);
                    }
                    if (res[0].data) {
                        setStudentInClass(res[1].data);
                    }

                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const handleSendToTeacher = async (e) => {
        e.preventDefault();

        const role = "gv";

        try {
            await ClassService.SendMailToJoinClass(malop, role, Email).then(
                (res) => {
                    console.log(res);
                    //alert('Đã gửi lời mời');
                    handleAddTeacherClose();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const handleSendToStudent = async (e) => {
        e.preventDefault();

        const role = "hs";

        try {
            await ClassService.SendMailToJoinClass(malop, role, Email).then(
                (res) => {
                    console.log(res);
                    //alert('Đã gửi lời mời');
                    handleAddStudentClose();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

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
                    <a href='/' className='mx-2 btn-member'>{user?.FullName}</a>
                    <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a>
                </Col>
            </Row>

            <Row className='g-0'>
                <MenuLeft TeacherClass={TeacherClasses} StudentClass={StudentClasses} />

                <Col md={10}>
                    <div className='w-100 tab-menu'>
                        <Tabs defaultActiveKey="news" className="border-bottom border-2 px-3 mb-3">
                            <Tab eventKey="news" id='news' title="Bảng tin">
                                <div className='detail-news'>
                                    <Row className='banner-news mb-4'>
                                        <h1>{DetailClass?.TenLop}</h1>
                                    </Row>

                                    <Row>
                                        <Col md={3}>
                                            <Card className="mb-4">
                                                <Card.Header className='fs-6'>Mã lớp</Card.Header>
                                                <Card.Body>
                                                    <Card.Text className='fs-3 fw-bold'>
                                                        {malop}
                                                    </Card.Text>
                                                    <Row className='d-flex g-3'>
                                                        <Col>
                                                            <a onClick={CopyCode(malop)} className='btn-outline-info btn d-flex align-items-center justify-content-center'><FaRegCopy /></a>
                                                        </Col>
                                                        <Col>
                                                            <a onClick={CopyLink(link)} className='btn-outline-success btn d-flex align-items-center justify-content-center'><FaLink /></a>
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
                                                <Form.Control type="text" placeholder="" />
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
                                                    {/* <td className="align-middle" style={{ width: '5%' }}>
                                                        <input
                                                            type="checkbox"
                                                        // value="id_user"
                                                        // checked={selectedValues.includes('Option 1')}
                                                        // onChange={() => handleCheckboxChange('Option 1')}
                                                        />
                                                    </td>
                                                    <td className="align-middle" style={{ width: '75%' }}>Trường Khoa Phạm</td>
                                                    <td className="align-middle text-end" style={{ width: '20%' }}>
                                                        <a onClick="" className='button fs-2 mx-2'>
                                                            <CiCircleMore />
                                                        </a>
                                                    </td> */}
                                                    {TeacherInClass?.map((Teacher, index) => (
                                                        <div>
                                                            <td className="align-middle" style={{ width: '20%', padding: '5px' }}>
                                                                <input
                                                                    type="checkbox"
                                                                // value="id_user"
                                                                // checked={selectedValues.includes('Option 1')}
                                                                // onChange={() => handleCheckboxChange('Option 1')}
                                                                />
                                                            </td>
                                                            <td className="align-middle" style={{ width: '75%' }}><h5>{Teacher.FullName}</h5></td>
                                                        </div>
                                                    ))}
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

                                    <Row className='banner-members mb-4'>
                                        {/* Table Student */}
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    {/* <td className="align-middle" style={{ width: '5%' }}>
                                                        <input
                                                            type="checkbox"
                                                        // value="id_user"
                                                        // checked={selectedValues.includes('Option 1')}
                                                        // onChange={() => handleCheckboxChange('Option 1')}
                                                        />
                                                    </td>
                                                    <td className="align-middle" style={{ width: '75%' }}>Trường Khoa Phạm</td>
                                                    <td className="align-middle text-end" style={{ width: '20%' }}>
                                                        <a onClick="" className='button fs-2 mx-2'>
                                                            <CiCircleMore />
                                                        </a>
                                                    </td> */}
                                                    {StudentInClass?.map((Student, index) => (
                                                        <div>
                                                            <td className="align-middle" style={{ width: '20%', padding: '5px' }}>
                                                                <input
                                                                    type="checkbox"
                                                                // value="id_user"
                                                                // checked={selectedValues.includes('Option 1')}
                                                                // onChange={() => handleCheckboxChange('Option 1')}
                                                                />
                                                            </td>
                                                            <td className="align-middle" style={{ width: '75%' }}><h5>{Student.FullName}</h5></td>
                                                        </div>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </Table>
                                        {/* Table Student */}
                                    </Row>
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
                        label="Nhập email của giáo viên"
                        className="mb-3"
                    >
                        <Form.Control id="add_teacher" type="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddTeacherClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSendToTeacher}>
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
                        label="Nhập email của học sinh"
                        className="mb-3"
                    >
                        <Form.Control id="add_student" type="email" placeholder="name@example.com"  onChange={(e) => {setEmail(e.target.value)}}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddStudentClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSendToStudent}>
                        Mời
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailClass;
