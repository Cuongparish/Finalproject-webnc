import React from 'react';
import { Col, Nav, Accordion } from 'react-bootstrap';
import {  FaHome, FaChalkboardTeacher  } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import '../App.css';

const MenuLeft = () => {
    return (
        <>
            <Col md={2} className="menu-left">
                <Nav defaultActiveKey="/home" className="flex-column pt-3">
                    <Nav.Link href="/home" className="element-left">
                        <FaHome className='mx-2' /> Màn hình chính
                    </Nav.Link>
                    <hr />
                    <Accordion defaultActiveKey={['0', '1']} alwaysOpen flush>
                        <Accordion.Item className='list-item' eventKey="0">
                            <Accordion.Header className='list-header'>
                                <FaChalkboardTeacher className='mx-2' /> Giảng dạy
                            </Accordion.Header>
                            <Accordion.Body className='list-body'>
                                <Nav.Link href="/" className='body-item d-flex align-items-center'>
                                    <MdClass className='mx-2' /> Web nâng cao
                                </Nav.Link>
                                <Nav.Link href="/" className='body-item d-flex align-items-center'>
                                    <MdClass className='mx-2' /> Web cơ bản
                                </Nav.Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <hr />
                        
                        <Accordion.Item className='list-item' eventKey="1">
                            <Accordion.Header className='list-header'>
                                <FaChalkboardTeacher className='mx-2' /> Đã tham gia
                            </Accordion.Header>
                            <Accordion.Body className='list-body'>
                                <Nav.Link href="/" className='body-item d-flex align-items-center'>
                                    <MdClass className='mx-2' /> Cơ sở dữ liệu
                                </Nav.Link>
                                <Nav.Link href="/" className='body-item d-flex align-items-center'>
                                    <MdClass className='mx-2' /> Khởi nghiệp
                                </Nav.Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <hr />
                    </Accordion>
                </Nav>
            </Col>
        </>
    )
}

export default MenuLeft;