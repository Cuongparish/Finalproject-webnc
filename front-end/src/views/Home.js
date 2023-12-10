import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Image, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FaBars, FaPlus } from "react-icons/fa";
import '../App.css';


import ClassList from '../components/ClassList';
import MenuLeft from '../components/MenuLeft';

import AuthService from "../service/auth.service";
import ClassService from "../service/class.service";

const Home = (props) => {
    const user = props.user;
    //console.log(user);

    const [TenLop, setTenLop] = useState();
    const [ChuDe, setChuDe] = useState();
    const [Phong, setPhong] = useState();

    const [MaLop, setMaLop] = useState();

    const [TeacherClasses, setTeacherClasses] = useState([]);
    const [StudentClasses, setStudentClasses] = useState([]);

    const [Classes, setClasses] = useState([]);

    const navigate = useNavigate();

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            await ClassService.CreateClass(user.idUser, TenLop, ChuDe, Phong).then(
                (res) => {
                    //console.log("res: ", res);
                    navigate(`/detail-class/${res}`);
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const handleJoinClass = async (e) => {
        e.preventDefault();
        try {
            await ClassService.JoinClassByCode(user.idUser, MaLop).then(
                (res) => {
                    console.log("res: ", res);
                    navigate(`/detail-class/${MaLop}`);
                    window.location.reload();
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

    useEffect(() => {
        GetClassList();

        if (TeacherClasses && StudentClasses) {
            // Merge arrays when both TeacherClasses and StudentClasses are not null
            const merged = [...TeacherClasses, ...StudentClasses];
            setClasses(merged);
        } else if (TeacherClasses) {
            // If TeacherClasses exists and StudentClasses is null, set mergedArray to TeacherClasses
            setClasses(TeacherClasses);
        } else if (StudentClasses) {
            // If StudentClasses exists and TeacherClasses is null, set mergedArray to StudentClasses
            setClasses(StudentClasses);
        } else {
            // If both arrays are null, set mergedArray to an empty array
            setClasses([]);
        }

        console.log(Classes);
    }, []);

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

                    <a href='/home' className='mx-2 btn-member'>{user.FullName}</a>
                    <a href='/logout' className='button btn-logout' onClick={AuthService.logout}>Log Out</a>
                </Col>
            </Row>

            <Row className='h-100 g-0'>
                <MenuLeft TeacherClass={TeacherClasses} StudentClass={StudentClasses} />

                <Col as={Row} md={10} className='d-flex g-0 p-3 right-content'>
                    <ClassList ClassData={Classes} />
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
                            <Form.Control type="text" onChange={(e) => setMaLop(e.target.value)} />
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
                    <Button variant="secondary" onClick={handleJoinClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleJoinClass}>
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
                            <Form.Control type="text" onChange={(e) => setTenLop(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="topic">
                            <Form.Label>Chủ đề</Form.Label>
                            <Form.Control type="text" onChange={(e) => setChuDe(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="room_name">
                            <Form.Label>Phòng</Form.Label>
                            <Form.Control type="text" onChange={(e) => setPhong(e.target.value)} />
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
