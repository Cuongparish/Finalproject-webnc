import { React, useState, useEffect } from "react";
import {Row, Col, Image, Tabs, Tab, Card, FloatingLabel, Form, Modal, Button, Dropdown} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TbDatabaseImport } from "react-icons/tb";

import "bootstrap/dist/css/bootstrap.min.css";
import MenuLeft from "../components/MenuLeft";
//import AlertBox from "../components/AlertBox";
import News from "../components/News";
import People from "../components/People";
import ScoreTable from "../components/ScoreTable";


import AuthService from "../service/auth.service";
import ClassService from "../service/class.service";

import "../App.css";
import GradeService from "../service/grade.service";

const DetailClass = (props) => {
  const { malop } = useParams();
  const user = props.user;

  const [DetailClass, setDetailClass] = useState();

  const [TeacherInClass, setTeacherInClass] = useState([]);
  const [StudentInClass, setStudentInClass] = useState([]);

  //Thông báo
  // const [showAlert, setShowAlert] = useState(false);
  // const [message, setMessage] = useState();


  const [hasScore, sethasScore] = useState(false);

  const [GradeStructure, setGradeStructure] = useState([
    <Row key={0} className="mb-0 justify-content-center">
      <Card className="p-3 w-50" style={{ borderRadius: "10px 10px 0 0" }}>
        <FloatingLabel
          controlId={`add_score_0`}
          label="Tên cột điểm"
          className="mb-3"
        >
          <Form.Control
            id={`add_score_0`}
            type="text"
            placeholder="Exercise"
            //onChange={(event) => handleInputChange(0, 'tencotdiem', event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId={`add_score_percentage_0`} label="% cột điểm">
          <Form.Control
            id={`add_score_percentage_0`}
            type="number"
            placeholder="5%"
            //onChange={(event) => handleInputChange(0, 'phantramdiem', event.target.value)}
          />
        </FloatingLabel>
      </Card>
    </Row>,
  ]);

  const [add_score, setAddScore] = useState(false);
  const handleAddScoreClose = () => {
    setGradeStructure([
      <Row key={0} className="mb-0 justify-content-center">
        <Card className="p-3 w-50" style={{ borderRadius: "10px 10px 0 0" }}>
          <FloatingLabel
            controlId={`add_score_0`}
            label="Tên cột điểm"
            className="mb-3"
          >
            <Form.Control
              id={`add_score_0`}
              type="text"
              placeholder="Exercise"
              //onChange={(event) => handleInputChange(0, 'tencotdiem', event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={`add_score_percentage_0`}
            label="% cột điểm"
          >
            <Form.Control
              id={`add_score_percentage_0`}
              type="number"
              placeholder="5%"
              //onChange={(event) => handleInputChange(0, 'phantramdiem', event.target.value)}
            />
          </FloatingLabel>
        </Card>
      </Row>,
    ]);

    setAddScore(false);
  };
  const handleAddScoreShow = () => setAddScore(true);

  const [review_score, setReviewScore] = useState(false);
  const handleReviewScoreClose = () => setReviewScore(false);
  const handleReviewScoreShow = () => setReviewScore(true);

  const [DataGradeStructure, setDataGradeStructure] = useState([]);
  const [HadCreateGradeStructer, setHadCreateGradeStructer] = useState(false);
  const [UserRoleInClass, setUserRoleInClass] = useState();

  //----------------------------------------Màn hình bảng tin
  const GetDetailClass = async () => {
    try {
      await ClassService.GetDetailClass(malop, user.idUser).then(
        (res) => {
          console.log("res-detail-class: ", res );
          if (res) {
            setDetailClass(res[0].data[0]);
            setUserRoleInClass(res[1].role);
            console.log("user-role: ", UserRoleInClass);
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

  //----------------------------------------Màn hình mọi người
  const GetListUserInClass = async () => {
    try {
      await ClassService.GetListUserInClass(malop).then(
        (res) => {
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
  };

  //----------------------------------------Box thông báo
  // const handleConfirm = () => {
  //   // Xử lý khi nút xác nhận được nhấn
  //   console.log("Đã xác nhận");
  //   setShowAlert(false); // Đóng box thông báo sau khi xác nhận
  // };

  // const handleCancel = () => {
  //   // Xử lý khi nút hủy được nhấn
  //   console.log("Đã hủy");
  //   setShowAlert(false); // Đóng box thông báo sau khi hủy
  // };

  //-----------------------------------------Tạo grade structure
  const addGradeStructure = () => {
    const newGradeStructure = (
      <Row key={0} className="mb-0 justify-content-center">
        <Card className="p-3 w-50" style={{ borderRadius: "10px 10px 0 0" }}>
          <FloatingLabel
            controlId={`add_score_${GradeStructure.length}`}
            label="Tên cột điểm"
            className="mb-3"
          >
            <Form.Control
              id={`add_score_${GradeStructure.length}`}
              type="text"
              placeholder="Exercise"
              // onChange={(event) => handleInputChange(GradeStructure.length, 'tencotdiem', event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={`add_score_percentage_${GradeStructure.length}`}
            label="% cột điểm"
          >
            <Form.Control
              id={`add_score_percentage_${GradeStructure.length}`}
              type="number"
              placeholder="5%"
              // onChange={(event) => handleInputChange(GradeStructure.length, 'phantramdiem', event.target.value)}
            />
          </FloatingLabel>
        </Card>
      </Row>
    );

    setGradeStructure([...GradeStructure, newGradeStructure]);
  };

  const RemoveGradeStructure = (indexToRemove) => {
    const updatedGradeStructure = GradeStructure.filter(
      (_, index) => index !== indexToRemove
    );
    setGradeStructure(updatedGradeStructure);
  };

  const saveDataGradeStructure = () => {
    setDataGradeStructure(
      GradeStructure.map((item, index) => ({
        TenCotDiem: document.getElementById(`add_score_${index}`).value,
        PhanTramDiem: document.getElementById(`add_score_percentage_${index}`)
          .value,
      }))
    );

    //console.log(DataGradeStructure);
    sethasScore(true);
    setHadCreateGradeStructer(true);
    handleAddScoreClose();
  };

  const handleclick = () => {
    console.log(DataGradeStructure);
  };

  const addGradeStructureToDB = async () => {
    try {
      await GradeService.CreateGradeStructure(
        DetailClass.idLop,
        DataGradeStructure
      ).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const GetGradeStructures = async () => {
    console.log(1111);
    try {
      await GradeService.GetGradeStructure(DetailClass.idLop).then(
        (res) => {
          console.log("gradestructure: ", res);
          if (res.data) {
            const newData = res.data.map((element, index) => {
              return {
                TenCotDiem: element.TenCotDiem,
                PhanTramDiem: element.PhanTramDiem,
              };
            });

            if (newData.length > 0) {
              setDataGradeStructure(newData);
            }
            sethasScore(true);
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

  //----------------------------------------Use effect
  useEffect(() => {
    //console.log("123");
    Promise.all([GetDetailClass(), GetListUserInClass()]);
  }, [user]);

  useEffect(() => {
    Promise.all([GetGradeStructures()]);
  }, [DetailClass]);

  useEffect(() => {
    console.log(DataGradeStructure);
    if (HadCreateGradeStructer) {
      addGradeStructureToDB();
    }
  }, [DataGradeStructure]);

  return (
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
          <Dropdown as={Col}>
            <Dropdown.Toggle split id="dropdown-split-basic">
                <FaBell />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: '350px'}}>
              <Dropdown.Item style={{ height: '65px'}} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px'}} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px'}} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px'}} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px'}} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
            <Tabs
              defaultActiveKey="news"
              className="border-bottom border-2 px-3"
            >
              {/* Màn hình bảng tin */}
              <Tab eventKey="news" id="news" title="Bảng tin">
                <News DetailClass={DetailClass}/>
              </Tab>

              {/* Màn hình bài tập */}
              <Tab eventKey="homework" title="Bài tập trên lớp">
                <div>Bài tập trên lớp</div>
              </Tab>

              {/* Màn hình mọi người */}
              <Tab eventKey="members" title="Mọi người">
                <People DetailClass={DetailClass} TeacherInClass={TeacherInClass} StudentInClass={StudentInClass}></People>
              </Tab>

              {/* Màn hình điểm */}
              <Tab eventKey="score" title="Điểm" className="h-100">
                {hasScore ? (
                  <ScoreTable
                    gradestructure={DataGradeStructure}
                    liststudent={StudentInClass}
                  />
                ) : (
                  <Row className="h-100 g-0 d-flex justify-content-center align-items-center">
                    <Col sm={2}>
                      <Card className="border-0 text-center">
                        <Card.Img
                          variant="top"
                          src={process.env.PUBLIC_URL + "/Images/score_bg.png"}
                        />
                        <Card.Body className="mb-3">
                          <a
                            onClick={handleAddScoreShow}
                            className="btn btn-primary mb-2"
                          >
                            <FaPlus className="mx-1" /> Tạo bảng điểm
                          </a>
                          <a onClick={handleclick} className="btn btn-success">
                            <TbDatabaseImport className="mx-1" /> Import bảng
                            điểm
                          </a>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Tab>

              {/* Màn hình trao đổi */}
              <Tab eventKey="communication" title="Trao đổi" className="h-100 bg-body-secondary p-2">
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-success mb-2 rv_element"
                    onClick={handleReviewScoreShow}
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Đã trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-success mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Đã trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-danger mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Chưa trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-success mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Đã trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-danger mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Chưa trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-danger mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Chưa trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-success mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Đã trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row 
                    className="g-0 d-flex justify-content-center align-items-center bg-danger mb-2 rv_element"
                    onClick={handleReviewScoreShow}  
                  >
                    <Col sm={1} className="p-1 text-white text-center">
                      Chưa trả lời
                    </Col>
                    <Col sm={11}>
                      <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                          <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                          <Card.Text>
                            phúc khảo bởi học sinh xyzabc
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>

      {/* <AlertBox
        show={showAlert}
        message={message}
        onHide={handleCancel}
        onConfirm={handleConfirm}
      /> */}

      {/* Modal Add Score */}
      <Modal show={add_score} size="fullscreen" onHide={handleAddScoreClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Tạo bảng điểm</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-body-secondary">
          <Row className="mb-3 justify-content-center">
            <Card className="p-0 w-50">
              <Card.Header
                style={{ height: "2px" }}
                className="bg-primary"
              ></Card.Header>
              <Card.Body>
                <Form.Control
                  type="text"
                  id="score_name"
                  placeholder="Cấu trúc bảng điểm"
                  className="fs-3 fw-bold border-0 p-0 text-black"
                  value="Cấu trúc bảng điểm"
                />
                {/* <Form.Text muted>
                  Mô tả biểu mẫu
                </Form.Text> */}
              </Card.Body>
            </Card>
          </Row>

          {GradeStructure.map((gradestructure, index) => (
            <div key={index}>
              {gradestructure}
              <Row className="mb-3 justify-content-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => RemoveGradeStructure(index)}
                  style={{
                    borderRadius: "0 0 10px 10px",
                    width: "50%",
                    height: "40px",
                    fontSize: "24px",
                    lineHeight: "24px",
                    fontWeight: "bold",
                    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  -
                </Button>
              </Row>
            </div> // Wrap in a container like div
          ))}

          {/* <Row className="mb-3 justify-content-center">
            {/* <Card className="p-3 w-50">
              <FloatingLabel
                controlId="add_score"
                label="Tên cột điểm"
                className="mb-3"
              >
                <Form.Control
                  id="add_score"
                  type="text"
                  placeholder="Kiểm tra miệng"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="add_score"
                label="% cột điểm"
              >
                <Form.Control
                  id="add_score"
                  type="number"
                  placeholder="5%"
                />
              </FloatingLabel>
            </Card> 
            <Button variant="outline-primary" onClick={addGradeStructure}>
              Thêm cột điểm
            </Button>
          </Row> */}
          <Row className="mb-3 justify-content-center">
            <Col xs={12} className="text-center">
              <Button
                variant="primary"
                size="sm"
                onClick={addGradeStructure}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "24px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                +
              </Button>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddScoreClose}>
            Hủy
          </Button>
          <Button variant="success" onClick={saveDataGradeStructure}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Review Score*/}
      <Modal show={review_score} size="fullscreen" onHide={handleReviewScoreClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Chi tiết phúc khảo</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-body-secondary">
          <Row className="mb-3 justify-content-center">
            <Card className="p-0 w-50 rounded-0">
              <Card.Header className="bg-primary text-white fw-bold fs-3 rounded-0">
                Phúc khảo điểm abcxyz
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-4" controlId="student_info">
                    <Form.Label>Họ và tên - MSSV:</Form.Label>
                    <Form.Control 
                      type="text" 
                      disabled
                      defaultValue="Phạm Trường Khoa - 18120419" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="name_score">
                    <Form.Label>Điểm thi GK - 25%:</Form.Label>
                    <Form.Control
                      disabled
                      type="number"
                      min="0" max="10" step="0.25"
                      id="col_name_score"
                      defaultValue="7.5"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="rv_expected_score">
                    <Form.Label>Điểm mong muốn:</Form.Label>
                    <Form.Control
                      disabled
                      type="number"
                      min="0" max="10" step="0.25"
                      id="col_name_score"
                      defaultValue="9"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="reason">
                    <Form.Label>Lý do:</Form.Label>
                    <Form.Control
                      disabled
                      style={{ height: "100px" }}
                      as="textarea"
                      defaultValue="Làm đúng hết nên được 9 điểm"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Card className="p-0 w-50 rounded-0">
              <Card.Header className="bg-success text-white fw-bold fs-3 rounded-0">
                Đã trả lời
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-4" controlId="student_info">
                    <Form.Label>Giáo viên:</Form.Label>
                    <Form.Control 
                      type="text" 
                      disabled
                      defaultValue="Mai Anh Tuấn" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="reason">
                    <Form.Label>Nội dung phản hồi:</Form.Label>
                    <Form.Control
                      disabled
                      style={{ height: "100px" }}
                      as="textarea"
                      defaultValue="Oke em thích thì tôi chiều"
                    />
                  </Form.Group>
                </Form>
                <Button className="float-end" variant="primary">Gửi</Button>
              </Card.Body>
            </Card>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailClass;
