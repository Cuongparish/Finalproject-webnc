import { React, useState, useEffect } from "react";
import { Row, Col, InputGroup, FloatingLabel, Form, Modal, Button, Card  } from "react-bootstrap";
import Datatable from "react-data-table-component";
import { FaPencilAlt, FaPlus, FaFilter } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { TbDatabaseImport } from "react-icons/tb";

import AccountService from "../service/account.service";
import AdminService from "../service/admin.service";

import "../App.css";

const TableUser = (props) => {
    const admin = props.admin

    const [AllUser, setAllUser] = useState([]);

    const [DetailUser, setDetailUser] = useState();
    const [UserSelected, setUserSelected] = useState();
  
    const [ThoiGianKhoa, setThoiGianKhoa] = useState();
    const [ThoiHanKhoa, setThoiHanKhoa] = useState();
  
    const [show_detail, setShowDetail] = useState(false);
    const handleShowDetailClose = () => setShowDetail(false);
    const handleShowDetailOpen = (idUser) => {
      setUserSelected(idUser);
      GetDataUser(idUser);
      setShowDetail(true);
    }
  
    const [add_user, setAddUser] = useState(false);
    const handleAddUserClose = () => setAddUser(false);
    const handleAddUserOpen = () => setAddUser(true);
  
    const GetDataUser = async (idUser) => {
      try {
        await AccountService.GetAccount(idUser).then(
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
  
    const GetAllUser = async () => {
      try {
        await AdminService.GetUser().then(
          (res) => {
            //console.log("users", res);
            const usersData = res.data.good.map(user => ({ ...user, ban: false }));
            const bannedUsersData = res.data.bad.map(user => ({ ...user, ban: true }));
  
            const alluser = [...usersData, ...bannedUsersData];
            setAllUser(alluser);
          },
          (err) => {
            console.log(err);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      //console.log(admin);
      GetAllUser();
    }, [admin]);
  
    useEffect(() => {
      if (AllUser) {
        setAllUser(AllUser);
        //console.log("get user");
      }
    }, [AllUser]);

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

    // User: ID, FullName, Email, Phone, Gender, DOB, StudentId, Lock/Unlock, Action
    const user_columns = [
        {
            name: "ID",
            center: true,
            width: "5%",
            selector: (row) => row.idUser,
        },
        {
            name: "FullName",
            center: true,
            wrap: true,
            width: "15%",
            selector: (row) => row.FullName,
        },
        {
            name: "Email",
            center: true,
            width: "20%",
            selector: (row) => row.Email,
        },
        {
            name: "Phone",
            center: true,
            width: "10%",
            selector: (row) => row.Phone,
        },
        {
            name: "Gender",
            center: true,
            width: "7%",
            selector: (row) => row.Sex,
        },
        {
            name: "DOB",
            center: true,
            width: "10%",
            selector: (row) => row.DOB,
        },
        {
            name: "StudentId",
            center: true,
            width: "10%",
            selector: (row) => row.StudentId,
        },
        {
            name: "Lock/Unlock",
            center: true,
            width: "10%",
            selector: (row) => (
                <InputGroup.Checkbox
                    aria-label="checkbox"
                    defaultChecked={row.ban}
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

    return (
        <>
            <Datatable
                className="text-center"
                title="Danh sách người dùng"
                columns={user_columns}
                data={AllUser}
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
                paginationRowsPerPage={8}>
            </Datatable>

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

    )
}

export default TableUser;
