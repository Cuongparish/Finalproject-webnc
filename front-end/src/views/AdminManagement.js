import { React, useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Tabs,
  Tab,
  InputGroup,
  FloatingLabel,
  Form,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import Datatable from "react-data-table-component";
import { FaBars, FaPencilAlt, FaPlus, FaFilter } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { TbDatabaseImport } from "react-icons/tb";

import AuthService from "../service/auth.service";
import AccountService from "../service/account.service";

import "../App.css";

const AdminManagement = (props) => {
  const user = props.User;

  const [show_detail, setShowDetail] = useState(false);
  const handleShowDetailClose = () => setShowDetail(false);
  const handleShowDetailOpen = () => setShowDetail(true);

  const [add_user, setAddUser] = useState(false);
  const handleAddUserClose = () => setAddUser(false);
  const handleAddUserOpen = () => setAddUser(true);

  const GetDataUser = async () => {
    try {
      await AccountService.GetAccount(user.idUser).then(
        (res) => {
          console.log(res.data[0]);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataUser();
  }, [user]);

  const customUserStyles = {
    table: {
      style: {
        border: "1px solid black",
      },
    },
    headRow: {
      style: {
        fontSize: "17px",
        fontWeight: "bold",
        backgroundColor: "#cccccc",
      },
    },
    subHeader: {
      style: {
        padding: "0",
      },
    },
    headCells: {
      style: {
        border: "1px solid black",
      },
    },
    cells: {
      style: {
        border: "1px solid black",
      },
    },
  };

  const customClassStyles = {
    table: {
      style: {
        border: "1px solid black",
      },
    },
    headRow: {
      style: {
        fontSize: "17px",
        fontWeight: "bold",
        backgroundColor: "#cccccc",
      },
    },
    subHeader: {
      style: {
        padding: "0",
      },
    },
    headCells: {
      style: {
        border: "1px solid black",
      },
    },
    cells: {
      style: {
        border: "1px solid black",
      },
    },
  };

  // User: ID, FullName, Email, Phone, Gender, DOB, StudentId, Lock/Unlock, Action
  const user_columns = [
    {
      name: "ID",
      center: true,
      width: "5%",
      selector: (row) => row.id,
    },
    {
      name: "FullName",
      center: true,
      wrap: true,
      width: "15%",
      selector: (row) => row.fullname,
    },
    {
      name: "Email",
      center: true,
      width: "20%",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      center: true,
      width: "10%",
      selector: (row) => row.phone,
    },
    {
      name: "Gender",
      center: true,
      width: "7%",
      selector: (row) => row.gender,
    },
    {
      name: "DOB",
      center: true,
      width: "10%",
      selector: (row) => row.dob,
    },
    {
      name: "StudentId",
      center: true,
      width: "10%",
      selector: (row) => row.student_id,
    },
    {
      name: "Lock/Unlock",
      center: true,
      width: "10%",
      selector: (row) => (
        <InputGroup.Checkbox
          aria-label="checkbox"
          defaultChecked={row.checked}
        />
      ),
    },
    {
      name: "Action",
      center: true,
      width: "13%",
      cell: (row) => (
        <Row className="d-flex g-3">
          <Col>
            <a
              href="javascript:void(0)"
              onClick={handleShowDetailOpen}
              className="btn-primary btn d-flex align-items-center justify-content-center btn-edit"
              data-id={row.id}
            >
              <FaPencilAlt />
            </a>
          </Col>
          <Col>
            <a
              href="javascript:void(0)"
              className="btn-danger btn d-flex align-items-center justify-content-center btn-delete"
              data-id={row.id}
            >
              <ImBin />
            </a>
          </Col>
        </Row>
      ),
    },
  ];
  // Class: ID, TenLop, ChuDe, Phong, TenGiaoVien, Active/Inactive
  const class_columns = [
    {
      name: "ID",
      center: true,
      width: "5%",
      selector: (row) => row.id,
    },
    {
      name: "Tên lớp",
      center: true,
      wrap: true,
      width: "35%",
      selector: (row) => row.TenLop,
    },
    {
      name: "Chủ đề",
      center: true,
      width: "10%",
      selector: (row) => row.ChuDe,
    },
    {
      name: "Phòng",
      center: true,
      width: "15%",
      selector: (row) => row.Phong,
    },
    {
      name: "Tên giáo viên",
      center: true,
      width: "25%",
      selector: (row) => row.TenGiaoVien,
    },
    {
      name: "Trạng thái",
      center: true,
      width: "10%",
      selector: (row) => (
        <InputGroup.Checkbox
          aria-label="checkbox"
          defaultChecked={row.TrangThai}
        />
      ),
    },
  ];

  const users = [
    {
      id: 1,
      fullname: "Pham Truong Khoa Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: false,
    },
    {
      id: 2,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: false,
    },
    {
      id: 3,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: false,
    },
    {
      id: 4,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: false,
    },
    {
      id: 5,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 6,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 7,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 8,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 9,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 10,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 11,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 12,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 13,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 14,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 15,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 16,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 17,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 18,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 19,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 20,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
    {
      id: 21,
      fullname: "Pham Truong Khoa",
      email: "phamtruongkhoa2000@gmail.com",
      phone: "0123456789",
      gender: "Male",
      dob: "31/07/2000",
      student_id: "18120419",
      checked: true,
    },
  ];
  const classes = [
    {
      id: 1,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 2,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 3,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 4,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 5,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 6,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 7,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 8,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 9,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 10,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 11,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 12,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 13,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 14,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
  ];

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

      <Row className="g-0 w-100 h-100 tab-menu">
        <Tabs defaultActiveKey="info" className="border-bottom border-2 px-3">
          <Tab
            eventKey="info"
            id="info"
            title="User Management"
            className="h-100"
          >
            <Datatable
              className="text-center"
              title="Danh sách người dùng"
              columns={user_columns}
              data={users}
              customStyles={customUserStyles}
              highlightOnHover
              pagination
              subHeader
              subHeaderComponent={
                <Row className="w-100 d-flex g-0 align-items-center justify-content-between px-2 mb-3">
                  <Col sm={5}>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="form-control mx-2"
                    />
                  </Col>
                  <Col sm={1}>
                    <a
                      href="javascript:void(0)"
                      className="btn-warning btn d-flex align-items-center justify-content-center text-white btn-filter-user"
                    >
                      <FaFilter className="mx-2" /> Lọc
                    </a>
                  </Col>
                  <Col sm={2}>
                    <a
                      href="javascript:void(0)"
                      className="btn-success btn d-flex align-items-center justify-content-center text-white btn-upload-user"
                    >
                      <TbDatabaseImport className="mx-2" /> Upload CSV/XLSX
                    </a>
                  </Col>
                  <Col sm={2}>
                    <a
                      href="javascript:void(0)"
                      onClick={handleAddUserOpen}
                      className="btn-info btn d-flex align-items-center justify-content-center text-white btn-add-user"
                    >
                      <FaPlus className="mx-2" /> Thêm mới
                    </a>
                  </Col>
                </Row>
              }
              paginationRowsPerPage={8}
            ></Datatable>
          </Tab>

          <Tab eventKey="score" title="Class Management" className="h-100">
            <Datatable
              className="text-center"
              title="Danh sách lớp học"
              columns={class_columns}
              data={classes}
              customStyles={customClassStyles}
              highlightOnHover
              pagination
              subHeader
              subHeaderComponent={
                <Row className="w-100 d-flex g-0 align-items-center justify-content-between px-2 mb-3">
                  <Col sm={5}>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="form-control mx-2"
                    />
                  </Col>
                  <Col sm={1}>
                    <a
                      href="javascript:void(0)"
                      className="btn-warning btn d-flex align-items-center justify-content-center text-white btn-filter-class"
                    >
                      <FaFilter className="mx-2" /> Lọc
                    </a>
                  </Col>
                </Row>
              }
            ></Datatable>
          </Tab>
        </Tabs>
      </Row>

      {/* Modal Show Detail */}
      <Modal show={show_detail} size="lg" onHide={handleShowDetailClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-0 justify-content-center">
            <Card className="border-0">
              <FloatingLabel
                controlId="fullname"
                label="Fullname"
                className="mb-3"
              >
                <Form.Control
                  disabled
                  id="fullname"
                  type="text"
                  // defaultValue={user.FullName}
                />
              </FloatingLabel>
              <FloatingLabel controlId="gender" label="Gender" className="mb-3">
                <Form.Select
                //disabled
                // defaultValue={Sex}
                // onChange={(e) => setSex(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="mail" label="Email" className="mb-3">
                <Form.Control
                  disabled
                  id="mail"
                  type="text"
                  // defaultValue={user.Email}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="dob"
                label="Date of Birth"
                className="mb-3"
              >
                <Form.Control
                  //disabled
                  id="dob"
                  type="date"
                  // value={DOB}
                  // onChange={(e) => setDOB(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                <Form.Control
                  //disabled
                  id="phone"
                  type="tel"
                  // defaultValue={Phone}
                  // onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="studentid"
                label="StudentID"
                className="mb-3"
              >
                <Form.Control
                  //disabled
                  id="studentid"
                  type="text"
                  // defaultValue={StudentId}
                  // onChange={(e) => setStudentId(e.target.value)}
                />
              </FloatingLabel>
            </Card>
          </Row>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleShowDetailClose}>
              Hủy
            </Button>
            <Button variant="primary">
              Mời
            </Button>
          </Modal.Footer> */}
      </Modal>

      {/* Modal Add User */}
      <Modal show={add_user} size="lg" onHide={handleAddUserClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-0 justify-content-center">
            <Card className="border-0">
              <FloatingLabel
                controlId="fullname"
                label="Fullname"
                className="mb-3"
              >
                <Form.Control id="fullname" type="text" />
              </FloatingLabel>
              <FloatingLabel controlId="gender" label="Gender" className="mb-3">
                <Form.Select
                // onChange={(e) => setSex(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="mail" label="Email" className="mb-3">
                <Form.Control id="mail" type="text" />
              </FloatingLabel>
              <FloatingLabel
                controlId="dob"
                label="Date of Birth"
                className="mb-3"
              >
                <Form.Control
                  id="dob"
                  type="date"
                  // onChange={(e) => setDOB(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                <Form.Control
                  id="phone"
                  type="tel"
                  // onChange={(e) => setPhone(e.target.value)}
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
                  // onChange={(e) => setStudentId(e.target.value)}
                />
              </FloatingLabel>
            </Card>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddUserClose}>
            Hủy
          </Button>
          <Button variant="primary">Thêm mới</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminManagement;
