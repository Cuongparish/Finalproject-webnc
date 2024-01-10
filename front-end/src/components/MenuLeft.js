import { React, useState, useEffect } from "react";
import { Col, Nav, Accordion } from 'react-bootstrap';
import { FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { MdClass } from "react-icons/md";

import ClassService from "../service/class.service";

import '../App.css';

const MenuLeft = (props) => {
  const user = props.user;

  const [TeacherClasses, setTeacherClasses] = useState([]);
  const [StudentClasses, setStudentClasses] = useState([]);

  const GetClassList = async () => {
    try {
      //console.log(1111);
      await ClassService.GetClasses(user?.idUser).then(
        (res) => {
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
  };

  const handleClick = () => {
    sessionStorage.setItem("Tab", "news");
  }

  useEffect(() => {
    //console.log("123");
    GetClassList();
  }, [user]);

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
                {TeacherClasses.map((classItem) => (
                  <Nav.Link href={`/detail-class/${classItem.MaLop}`} onClick={handleClick} className='body-item d-flex align-items-center'>
                    <MdClass className='mx-2' /> {classItem.TenLop}
                  </Nav.Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <hr />

            <Accordion.Item className='list-item' eventKey="1">
              <Accordion.Header className='list-header'>
                <FaChalkboardTeacher className='mx-2' /> Đã tham gia
              </Accordion.Header>
              <Accordion.Body className='list-body'>
                {StudentClasses.map((classItem) => (
                  <Nav.Link href={`/detail-class/${classItem.MaLop}`} onClick={handleClick} className='body-item d-flex align-items-center'>
                    <MdClass className='mx-2' /> {classItem.TenLop}
                  </Nav.Link>
                ))}
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