import { React, useState, useEffect } from "react";
import { Row, Col, InputGroup, FloatingLabel, Form, Modal, Button, Card } from "react-bootstrap";
import Datatable from "react-data-table-component";
import { FaPencilAlt, FaPlus, FaFilter } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { TbDatabaseImport } from "react-icons/tb";

import AlertBox from "./AlertBox";

import AdminService from "../service/admin.service";

import "../App.css";

const TableUser = (props) => {
    const admin = props.admin

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

    const [AllUser, setAllUser] = useState([]);

    const [DetailUser, setDetailUser] = useState();

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserBan, setSelectedUserBan] = useState(false);

    const ThoiGianKhoa = new Date();
    const ThoiHanKhoa = new Date();

    const [showAlert, setShowAlert] = useState(false);
    const [Message, setMessage] = useState();

    const [Sex, setSex] = useState();
    const [DOB, setDOB] = useState();
    const [Phone, setPhone] = useState();
    const [FullName, setFullName] = useState();
    const [StudentId, setStudentId] = useState();

    const [studentIdError, setStudentIdError] = useState(false);

    const [show_detail, setShowDetail] = useState(false);
    const handleShowDetailClose = () => setShowDetail(false);

    const [add_user, setAddUser] = useState(false);
    const handleAddUserClose = () => setAddUser(false);
    const handleAddUserOpen = () => setAddUser(true);

    const [searchTerm, setSearchTerm] = useState('');

    const handleShowDetailOpen = (idUser) => {

        const userSelect = AllUser.find(user => user.idUser === idUser);
        setDetailUser(userSelect);

        const parts = userSelect.DOB.split('-');
        let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        setDetailUser((prevDetailUser) => ({
            ...prevDetailUser,
            DOB: formattedDate
        }));

        setSex(userSelect.Sex);
        setDOB(userSelect.DOB);
        setFullName(userSelect.FullName);
        setStudentId(userSelect.StudentId);
        setPhone(userSelect.Phone);

        setShowDetail(true);
    }

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
    };

    const handleConfirm = async () => {
        if (!selectedUserBan) {
            try {
                await AdminService.BanAccount(selectedUserId, ThoiGianKhoa, ThoiHanKhoa).then(
                    (res) => {
                        console.log(res);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                const updatedCheckboxStatus = AllUser.map(user => {
                    if (user.idUser === selectedUserId) {
                        return { ...user, ban: true };
                    }
                    return user;
                });
                setAllUser(updatedCheckboxStatus);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await AdminService.UnBanAccount(selectedUserId).then(
                    (res) => {
                        console.log(res);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                const updatedCheckboxStatus = AllUser.map(user => {
                    if (user.idUser === selectedUserId) {
                        return { ...user, ban: false };
                    }
                    return user;
                });
                setAllUser(updatedCheckboxStatus);
            } catch (error) {
                console.log(error);
            }
        }

        setShowAlert(false);
    };

    const handleCancel = () => {
        setSelectedUserId(null);
        setSelectedUserBan(false);
        setShowAlert(false);
    };

    const handleCheckboxChange = (idUser, ban) => {
        setSelectedUserId(idUser);
        setSelectedUserBan(ban);
        if (!ban) {
            setMessage(`Bạn có muốn Lock tài khoản có id: ${idUser} không?`);
        }
        else {
            setMessage(`Bạn có muốn UnLock tài khoản có id: ${idUser} không?`);
        }
        setShowAlert(true); // Hiển thị modal khi checkbox thay đổi
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        // Kiểm tra StudentId mới với danh sách người dùng
        const isStudentIdDuplicate = AllUser.some(user => 
            user.StudentId === StudentId &&
            user.idUser !== DetailUser.idUser &&
            user.StudentId !== "" &&
            user.StudentId !== null
        );

        if (isStudentIdDuplicate) {
            // Nếu StudentId mới trùng lặp với người dùng khác, hiển thị thông báo lỗi và không đóng modal
            setStudentIdError(true);
            return;
        }

        if (DetailUser.idUser === null) {
            setShowDetail(false);
            return;
        }

        try {
            await AdminService.ManualMapping(DetailUser.idUser, DetailUser.Email, DetailUser.Pw, FullName, DOB, Sex, Phone, StudentId).then(
                (res) => {
                    console.log(res);
                    const updatedUser = AllUser.map(user => {
                        if (user.idUser === DetailUser.idUser) {
                            return {
                                ...user,
                                FullName: FullName,
                                DOB: DOB,
                                Sex: Sex,
                                Phone: Phone,
                                StudentId: StudentId
                            };
                        }
                        return user;
                    });
                    setAllUser(updatedUser);
                    setShowDetail(false);
                },
                (err) => {
                    console.log(err);
                }
            );
        } catch (error) {
            console.log(error)
        }
    };

    const filteredUsers = searchTerm
        ? AllUser.filter((user) =>
            user.Email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : AllUser;

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
                    checked={row.ban}
                    onChange={() => handleCheckboxChange(row.idUser, row.ban)}
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
                        <Button
                            variant="primary"
                            className="btn d-flex align-items-center justify-content-center btn-edit"
                            onClick={() => handleShowDetailOpen(row.idUser)}
                        >
                            <FaPencilAlt />
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            className="btn d-flex align-items-center justify-content-center btn-delete"
                        // onClick={() => handleDelete(row.id)}
                        >
                            <ImBin />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];

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

    return (
        <>
            <Datatable
                className="text-center"
                title="Danh sách người dùng"
                columns={user_columns}
                data={filteredUsers}
                customStyles={customUserStyles}
                highlightOnHover
                pagination
                subHeader
                subHeaderComponent={
                    <Row className="w-100 d-flex g-0 align-items-center justify-content-between px-2 mb-3">
                        <Col sm={5}>
                            <input
                                type="text"
                                placeholder="Search email here"
                                className="form-control mx-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col sm={1}>
                            <Button
                                variant="warning"
                                className="btn d-flex align-items-center justify-content-center text-white btn-filter-user"
                            >
                                <FaFilter className="mx-2" /> Search
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button
                                variant="success"
                                className="btn d-flex align-items-center justify-content-center text-white btn-upload-user"
                            // onClick={handleUpload}
                            >
                                <TbDatabaseImport className="mx-2" /> Upload CSV/XLSX
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button
                                variant="info"
                                className="btn d-flex align-items-center justify-content-center text-white btn-add-user"
                                onClick={handleAddUserOpen}
                            >
                                <FaPlus className="mx-2" /> Thêm mới
                            </Button>
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
                                    id="fullname"
                                    type="text"
                                    defaultValue={DetailUser?.FullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="gender" label="Gender" className="mb-3">
                                <Form.Select
                                    defaultValue={DetailUser?.Sex}
                                    onChange={(e) => setSex(e.target.value)}
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
                                    defaultValue={DetailUser?.Email}
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
                                    defaultValue={DetailUser?.DOB}
                                    onChange={(e) => setDOB(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                                <Form.Control
                                    id="phone"
                                    type="tel"
                                    defaultValue={DetailUser?.Phone}
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
                                    defaultValue={DetailUser?.StudentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                />
                                {studentIdError && <p style={{ color: 'red' }}>StudentId đã tồn tại</p>}
                            </FloatingLabel>
                        </Card>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowDetailClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
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

            <AlertBox
                show={showAlert}
                message={Message}
                onHide={handleCancel}
                onConfirm={handleConfirm}
            />
        </>

    )
}

export default TableUser;
