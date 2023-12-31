import { React, useState } from "react";
import { Row, Col, FloatingLabel, Form, Modal, Button, Table } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";

import ClassService from "../service/class.service";

import "../App.css";
import GradeService from "../service/grade.service";


const People = (props) => {
  const DetailClass = props.DetailClass;
  const TeacherInClass = props.TeacherInClass;
  const StudentInClass = props.StudentInClass;

  const malop = DetailClass?.MaLop;

  const [add_teacher, setAddTeacher] = useState(false);
  const handleAddTeacherClose = () => setAddTeacher(false);
  const handleAddTeacherShow = () => setAddTeacher(true);

  const [add_student, setAddStudent] = useState(false);
  const handleAddStudentClose = () => setAddStudent(false);
  const handleAddStudentShow = () => setAddStudent(true);

  const [Email, setEmail] = useState();

  const [Type, setType] = useState("xlsx");
  const [selectedFile, setSelectedFile] = useState(null);

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
  };

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
  };

  const handleDownloadStudentList = async () => {
    try {
      const blobData = await GradeService.ExportToExcel_StudentList(
        DetailClass.idLop,
        Type
      ); // Thay thế idLop và type bằng giá trị thực tế của bạn
      console.log(blobData);
      const url = window.URL.createObjectURL(new Blob([blobData]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `DanhSachHocSinh.${Type}`); // Đặt tên file
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error handling download:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleUploadStudentList = async () => {
    if (selectedFile) {
      console.log("selectedFiled: ", selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log("formdata: ", formData);

      const res = await GradeService.ImportToExcel_StudentList(
        DetailClass.idLop,
        formData
      );
      console.log("File", res);
    } else {
      console.log("Please select a file to upload");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div className="detail-members mt-3">
        <Row className="banner-members mb-4">
          <Col className="d-flex align-items-center border-bottom border-2 border-black">
            <h3>Giáo viên</h3>
          </Col>
          <Col className="text-end border-bottom border-2 border-black">
            <h3>
              <a onClick={handleAddTeacherShow} className="button">
                <FaUserPlus />
              </a>
            </h3>
          </Col>
        </Row>

        <Row className="banner-members mb-4">
          {/* Table Teachers */}
          <Table>
            <tbody>
              <tr>
                {TeacherInClass?.map((Teacher, index) => (
                  <div>
                    <td
                      className="align-middle"
                      style={{ width: "20%", padding: "5px" }}
                    >
                      <input
                        type="checkbox"
                      // value="id_user"
                      // checked={selectedValues.includes('Option 1')}
                      // onChange={() => handleCheckboxChange('Option 1')}
                      />
                    </td>
                    <td
                      className="align-middle"
                      style={{ width: "75%" }}
                    >
                      <h5>{Teacher.FullName}</h5>
                    </td>
                  </div>
                ))}
              </tr>
            </tbody>
          </Table>
          {/* Table Teachers */}
        </Row>

        <Row className="banner-members mb-4">
          <Col className="d-flex align-items-center border-bottom border-2 border-black">
            <h3>Sinh viên</h3>
          </Col>
          <Col className="text-end border-bottom border-2 border-black">
            <h3>
              <a onClick={handleAddStudentShow} className="button">
                <FaUserPlus />
              </a>
            </h3>
          </Col>
        </Row>

        <Row className="banner-members mb-4">
          {/* Table Student */}
          <Table>
            <tbody>
              <tr>
                {StudentInClass?.map((Student, index) => (
                  <div>
                    <td
                      className="align-middle"
                      style={{ width: "20%", padding: "5px" }}
                    >
                      <input
                        type="checkbox"
                      // value="id_user"
                      // checked={selectedValues.includes('Option 1')}
                      // onChange={() => handleCheckboxChange('Option 1')}
                      />
                    </td>
                    <td
                      className="align-middle"
                      style={{ width: "75%" }}
                    >
                      <h5>{Student.FullName}</h5>
                    </td>
                  </div>
                ))}
              </tr>
            </tbody>
          </Table>
          {/* Table Student */}
        </Row>

        <Row className="banner-members mb-4">
          <Col className="text-end border-2">
            <Col sm={3}>
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select file to upload:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleUploadStudentList}
                >
                  Upload StudentList
                </Button>
              </Form>
            </Col>

            <Col sm={3} className="float-end">
              <FloatingLabel
                controlId="type"
                label="FileType"
                className="mb-3"
              >
                <Form.Select
                  defaultValue={Type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>xlsx</option>
                  <option>csv</option>
                </Form.Select>
              </FloatingLabel>

              <Button
                variant="primary"
                onClick={handleDownloadStudentList}
              >
                Download StudentList
              </Button>
            </Col>
          </Col>
        </Row>
      </div>

      {/* Modal Add Teacher */}
      <Modal
        show={add_teacher}
        style={{ top: "10%" }}
        onHide={handleAddTeacherClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Mời giáo viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="add_teacher"
            label="Nhập email của giáo viên"
            className="mb-3"
          >
            <Form.Control
              id="add_teacher"
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
      <Modal
        show={add_student}
        style={{ top: "10%" }}
        onHide={handleAddStudentClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Mời sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="add_student"
            label="Nhập email của học sinh"
            className="mb-3"
          >
            <Form.Control
              id="add_student"
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
};

export default People;