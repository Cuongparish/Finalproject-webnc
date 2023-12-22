import { React, useState, useEffect } from "react";
import { Row, Col, Image, Tabs, Tab, Card, FloatingLabel, Form, Table } from "react-bootstrap";
import { FaBars, FaRegCopy, FaLink } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import MenuLeft from "../components/MenuLeft";
import ScoreTable from "../components/ScoreTable";
import AuthService from "../service/auth.service";
import ClassService from "../service/class.service";


import "../App.css";

//const Client_URL = "http://localhost:3000"
// const Client_URL = "https://finalproject-webnc.vercel.app";

const Profile = (props) => {

  const user = props.User;

  const [TeacherClasses, setTeacherClasses] = useState([]);
  const [StudentClasses, setStudentClasses] = useState([]);

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
  };

  useEffect(() => {
    console.log("123");
    Promise.all([GetClassList()]);
  }, [user]);

  return (
    <>
      <Row className="justify-`content`-center py-3 menu-top align-items-center">
        <Col xs md={1}>
          <a href="/home" className="fs-3 btn-menu">
            <FaBars />
          </a>
        </Col>
        <Col
          xs
          md={{ span: 4, offset: 3 }}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            src={process.env.PUBLIC_URL + "/Images/logo.png"}
            className="d-inline-block mx-2"
            alt=""
            width={50}
          />
          <h3 className="mb-0">Grade Management</h3>
        </Col>
        <Col
          xs
          md={{ span: 2, offset: 1 }}
          className="d-flex justify-content-end align-items-center"
        >
          <a href="/profile" className="mx-2 btn-member">
            Phạm Trường Khoa
            {/* {user?.FullName} */}
          </a>
          <a
            href="/logout"
            className="button btn-logout"
            // onClick={AuthService.logout}
          >
            Log Out
          </a>
        </Col>
      </Row>

      <Row className="g-0">
        <MenuLeft TeacherClass={TeacherClasses} StudentClass={StudentClasses} />

        <Col md={10}>
          <div className="w-100 h-100 tab-menu">
            <Tabs defaultActiveKey="info" className="border-bottom border-2 px-3">
              <Tab eventKey="info" id="info" title="Thông tin">
                <Row className="p-3">
                  <h1>Thông tin cá nhân</h1>
                </Row>
                <Row className="mb-0 justify-content-center">
                  <Card className="p-3 w-75 border-0">
                    <FloatingLabel
                      controlId="fullname"
                      label="Fullname"
                      className="mb-3"
                    >
                      <Form.Control
                        disabled
                        id="fullname"
                        type="text"
                        defaultValue="Phạm Trường Khoa"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="gender"
                      label="Gender"
                      className="mb-3"
                    >
                      <Form.Select
                        disabled
                        defaultValue="Male"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="mail"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        disabled
                        id="mail"
                        type="text"
                        defaultValue="phamtruongkhoa2000@gmail.com"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="dob"
                      label="Date of Birth"
                      className="mb-3"
                    >
                      <Form.Control
                        disabled
                        id="dob"
                        type="date"
                        defaultValue="2000-07-31"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        disabled
                        id="password"
                        type="password"
                        defaultValue="***********"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="phone"
                      label="Phone"
                      className="mb-3"
                    >
                      <Form.Control
                        disabled
                        id="phone"
                        type="tel"
                        defaultValue="0123456789"
                      />
                    </FloatingLabel>
                  </Card>
                </Row>
              </Tab>

              <Tab eventKey="score" title="Điểm" className="h-100">
                <ScoreTable />
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
