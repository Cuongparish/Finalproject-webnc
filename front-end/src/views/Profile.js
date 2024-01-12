import { React, useState, useEffect } from "react";
import { Row, Col, Image, Tabs, Tab, Card, FloatingLabel, Form, Table, Modal, Button } from "react-bootstrap";
import { FaBars, FaPen } from "react-icons/fa";

import MenuLeft from "../components/MenuLeft";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import Notification from "../components/Notification";

import AuthService from "../service/auth.service";
import AccountService from "../service/account.service";

import "../App.css";

const Profile = (props) => {

  const user = props.user;

  const [show_request, setShowRequest] = useState(false);
  const handleShowRequestClose = () => setShowRequest(false);
  const handleShowRequestOpen = () => setShowRequest(true);

  const parts = user.DOB.split('-');
  let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  const [newuser, setnewuser] = useState();
  const [Sex, setSex] = useState(user.Sex);
  const [DOB, setDOB] = useState(formattedDate);
  const [Phone, setPhone] = useState(user.Phone);
  const [FullName, setFullName] = useState(user.FullName);
  const [StudentId, setStudentId] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await AccountService.UpdateAccount(user.idUser, user.Email, user.Pw, FullName, DOB, Sex, Phone, StudentId).then(
        (res) => {
          //console.log(res);
          if(res.msg === "Ok")
          {
            setnewuser(() => {
              const partss = DOB.split('-');
              const formatDate = `${partss[2]}-${partss[1]}-${partss[0]}`;
              newuser.DOB = formatDate;
              newuser.Sex = Sex;
              newuser.Phone = Phone;
              newuser.StudentId = StudentId;
            })
            //console.log(newuser);
            localStorage.setItem("user", JSON.stringify(newuser));
            setMessage("Update thành công");
            setShowAlert(true);
          }
          else if(res.msg === "StudentId nãy đã có người sử dụng") {
            setMessage("StudentId nãy đã có người sử dụng");
            setShowAlert(true);
          }
        },
        (err) => {
          setMessage("Update thất bại");
          setShowAlert(true);
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  const GetDataUser = async () => {
    try {
      await AccountService.GetAccount(user.idUser).then(
        (res) => {
          console.log(res.data[0]);
          setnewuser(res.data[0]);
          //console.log(newuser);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirm = () => {
    // Xử lý khi nút xác nhận được nhấn
    console.log('Đã xác nhận');
    //window.location.reload();
    setShowAlert(false); // Đóng box thông báo sau khi xác nhận
  };

  const handleCancel = () => {
    // Xử lý khi nút hủy được nhấn
    console.log('Đã hủy');
    //window.location.reload();
    setShowAlert(false); // Đóng box thông báo sau khi hủy
  };

  useEffect(() => {
    GetDataUser();
  }, [user]);

  useEffect(() => {
    if (newuser) {
      console.log(newuser);
      setStudentId(newuser.StudentId);
      setLoading(false);
    }
  }, [newuser]);

  return (
    <>
      <AlertBox
        show={showAlert}
        message={message}
        onHide={handleCancel}
        onConfirm={handleConfirm}
      />

      {loading ? (
        <Loader /> // Hiển thị Loader khi loading là true
      ) : (
        <>
          <Row className="justify-content-center py-3 menu-top align-items-center">
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
              <Notification user={user}/>

              <a href="/profile" className="mx-2 btn-member">
                {user?.FullName}
              </a>
              <a
                href="/logout"
                className="button btn-logout"
                onClick={AuthService.logout}
              >
                Log Out
              </a>
            </Col>
          </Row>

          <Row className="g-0">
            <MenuLeft user={user} />

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
                            id="fullname"
                            type="text"
                            defaultValue={user.FullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="gender"
                          label="Gender"
                          className="mb-3"
                        >
                          <Form.Select
                            defaultValue={Sex}
                            onChange={(e) => setSex(e.target.value)}
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
                            defaultValue={user.Email}
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="dob"
                          label="Date of Birth"
                          className="mb-3"
                        >
                          <Form.Control
                            id="dob"
                            type="date"
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="phone"
                          label="Phone"
                          className="mb-3"
                        >
                          <Form.Control
                            id="phone"
                            type="tel"
                            defaultValue={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="studentid"
                          label="StudentID"
                          className="mb-3"
                        >
                          <Form.Control
                            id="studentid"
                            type="text"
                            defaultValue={StudentId}
                            onChange={(e) => setStudentId(e.target.value)}
                          />
                        </FloatingLabel>
                      </Card>
                    </Row>

                    <Row className="d-flex align-items-end justify-content-end my-5">
                      <Col sm={2}>
                        <Button variant="primary" onClick={handleUpdate}>
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="score" title="Điểm" className="h-100">
                    <Row className="g-0 px-0">
                      {/* Table Score */}
                      <Table className="m-0" bordered hover>
                        <thead>
                          <tr style={{ height: '100px' }} className="text-center fw-bold table-secondary">
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 1</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 2</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 3</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 4</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 5</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 6</td>
                            {/* {GradeStructures?.map((GradeStructure, index) => (
                                          <td className="align-middle" style={{ width: '7%' }}>
                                              <div>{GradeStructure.TenCotDiem}</div>
                                              <div>{GradeStructure.PhanTramDiem}%</div>
                                          </td>
                                      ))} */}
                            <td className="align-middle" style={{ width: '10%' }}>Tổng kết</td> {/* input nothing */}
                          </tr>
                        </thead>
                        <tbody>
                          {/* data start */}
                          <tr>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                            <td className="text-center">8</td>
                          </tr>
                          {/* data end */}
                        </tbody>
                      </Table>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-end my-5">
                      <Col sm={2} className="text-end mx-3">
                        <Button variant="success" onClick={handleShowRequestOpen}>
                          <FaPen className="mx-1" /> Phúc khảo
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>

          {/* Modal Show Detail */}
          <Modal show={show_request} size="lg" onHide={handleShowRequestClose}>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">Thông tin phúc khảo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-0 justify-content-center">
                <Card className="border-0">
                  <FloatingLabel controlId="gender" label="Cột điểm" className="mb-3">
                    <Form.Select
                    //disabled
                    // defaultValue={Sex}
                    // onChange={(e) => setSex(e.target.value)}
                    >
                      <option>Điểm 1</option>
                      <option>Điểm 2</option>
                      <option>Điểm 3</option>
                      <option>Điểm 4</option>
                      <option>Điểm 5</option>
                      <option>Điểm 6</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="expected_score"
                    label="Điểm kỳ vọng"
                    className="mb-3"
                  >
                    <Form.Control
                      //disabled
                      id="expected_score"
                      type="number"
                      min="0"
                      max="10"
                      step="0.25"
                    // defaultValue={StudentId}
                    // onChange={(e) => setStudentId(e.target.value)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="reason"
                    label="Lý do"
                    className="mb-3"
                  >
                    <Form.Control
                      //disabled
                      id="reason"
                      type="text"
                    />
                  </FloatingLabel>
                </Card>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleShowRequestClose}>
                Hủy
              </Button>
              <Button variant="primary">
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default Profile;
