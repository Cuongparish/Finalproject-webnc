import { React, useState, useEffect } from "react";
import { Row, Col, Table, Modal, FloatingLabel, Card, Button, Form } from "react-bootstrap";

import AlertBox from "./AlertBox";

import GradeService from "../service/grade.service";
import ReviewService from "../service/review.service";

import '../App.css';

const ScoreTable_Student = (props) => {
    const user = props.user;
    const StudentId = props.studentid;
    const GradeStructures = props.gradestructure;

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();

    const [StudentHaveScore, setStudentHaveScore] = useState();
    const [GradeStructuresPublic, setGradeStructuresPublic] = useState([]);

    const [TotalPercent, setTotalPercent] = useState(0);

    const [show_request, setShowRequest] = useState(false);
    const handleShowRequestClose = () => setShowRequest(false);
    const handleShowRequestOpen = () => setShowRequest(true);

    const [SelectGradeColumn, setSelectGradeColumn] = useState("");
    const [GradeCurrent, setGradeCurrent] = useState(0);
    const [GradeExpect, setGradeExpect] = useState();
    const [Reason, setReason] = useState("");

    const [gradeErrors, setGradeErrors] = useState(false);

    const CaculateTotalPercent = () => {
        let total = 0;
        GradeStructures?.forEach(GradeStructure => {
            total += parseInt(GradeStructure.PhanTramDiem, 10);
        });
        setTotalPercent(total);
    }

    const GetGradeBoard = async () => {
        try {
            await GradeService.GetGradeBoard(GradeStructures[0].idLop, user.idUser).then(
                (res) => {
                    if (res.data) {
                        if (res.data && res.data[0]?.data) {
                            setGradeStructuresPublic(res.data[0].data)
                            setSelectGradeColumn(res.data[0].data[0]);
                        }

                        if (res.data && res.data[1]?.data) {
                            const studentWithScore = res.data[1].data.find(item => item.StudentId === StudentId);
                            setStudentHaveScore(studentWithScore);  
                            setGradeCurrent(studentWithScore.Diem[0]);
                        }
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

    const handleSendReview = async () => {
        try {
            await ReviewService.CreateReview(user.idUser, GradeStructures[0].idLop, SelectGradeColumn.idCotDiem, GradeExpect, Reason)
                .then(
                    (res) => {
                        if(res.msg === "Success")
                        {
                            setMessage("Gửi thành công");
                            setShowAlert(true);
                        }
                        else
                        {
                            setMessage("Có lỗi xảy ra, vui lòng thử lại");
                            setShowAlert(true);
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

    const handleConfirm = () => {
        // Xử lý khi nút xác nhận được nhấn
        setShowAlert(false); // Đóng box thông báo sau khi xác nhận
        setShowRequest(false);
    };

    const handleCancel = () => {
        // Xử lý khi nút hủy được nhấn
        setShowAlert(false); // Đóng box thông báo sau khi hủy
        setShowRequest(false);
    };

    useEffect(() => {
        CaculateTotalPercent();
        GetGradeBoard();
    }, [props.gradestructure[0].idLop]);

    return (
        <>
            <Row className="g-0 px-0 mb-5">
                <h2>Bảng điểm học sinh</h2>
                {/* Table Score */}
                <Table className="m-0" bordered hover>
                    <thead>
                        <tr style={{ height: '100px' }} className="text-center fw-bold table-secondary">
                            <td className="align-middle border-2 border-start-0" style={{ width: '15%' }}>Họ và tên</td>
                            <td className="align-middle" style={{ width: '10%' }}>MSSV</td>
                            {GradeStructures?.map((GradeStructure, index) => (
                                <td className="align-middle" style={{ width: '7%' }}>
                                    <div>{GradeStructure.TenCotDiem}</div>
                                    <div>{GradeStructure.PhanTramDiem}%</div>
                                </td>
                            ))}
                            <td className="align-middle" style={{ width: '10%' }}>
                                <div>Tổng kết</div>
                                <div>{TotalPercent}%</div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{StudentHaveScore?.FullName}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{StudentHaveScore?.StudentId}</td>
                            {StudentHaveScore && StudentHaveScore.Diem ? (
                                GradeStructures?.map((GradeStructure, gradeIndex) => (
                                    <td key={gradeIndex} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {StudentHaveScore.Diem[gradeIndex]}
                                    </td>
                                ))
                            ) : (
                                <td colSpan={GradeStructures.length}>
                                    Giáo viên chưa public cột điểm nào
                                </td>
                            )}
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{StudentHaveScore?.total}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Row className="d-flex align-items-end justify-content-end my-5">
                <Col sm={2}>
                    <a className="btn btn-info" onClick={handleShowRequestOpen}>
                        Phúc khảo
                    </a>
                </Col>
            </Row>

            {/* Modal Show Request */}
            <Modal show={show_request} size="lg" onHide={handleShowRequestClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Thông tin phúc khảo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-0 justify-content-center">
                        <Card className="border-0">
                            <FloatingLabel label="Cột điểm" className="mb-3">
                                <Form.Select
                                    className="border-2 border-black"
                                    value={SelectGradeColumn.TenCotDiem}
                                    onChange={(e) => {
                                        const GradeIndex = GradeStructuresPublic.findIndex(
                                            GradeStructure => GradeStructure.TenCotDiem === e.target.value
                                        );
                                        const GradeColumn = GradeStructuresPublic.find(
                                            GradeStructure => GradeStructure.TenCotDiem === e.target.value
                                        );
                                        setSelectGradeColumn(GradeColumn);
                                        setGradeCurrent(StudentHaveScore.Diem[GradeIndex]);
                                    }}
                                >
                                    {GradeStructuresPublic?.map((GradeStructure, index) => (
                                        <option>{GradeStructure.TenCotDiem}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="current_score"
                                label="Điểm hiện tại"
                                className="mb-3"
                            >
                                <Form.Control
                                    id="current_score"
                                    disabled
                                    type="number"
                                    value={GradeCurrent}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="expected_score"
                                label="Điểm kỳ vọng"
                                className="mb-3"
                            >
                                <Form.Control
                                    id="expected_score"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.25"
                                    placeholder='/10'
                                    onChange={(event) => {
                                        const grade = parseFloat(event.target.value, 10);
                                        if (grade !== null && grade >= 0 && grade <= 10) {
                                            setGradeExpect(grade);
                                            setGradeErrors(false);
                                        } else {
                                            setGradeErrors(true);
                                        }
                                    }}
                                />
                                {gradeErrors && <p style={{ color: 'red' }}>Số điểm không phù hợp</p>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="reason"
                                label="Lý do"
                                className="mb-3"
                            >
                                <Form.Control
                                    id="reason"
                                    as="textarea"
                                    style={{ height: "100px" }}
                                    onChange={(event) => {
                                        setReason(event.target.value);
                                    }}
                                />
                            </FloatingLabel>
                        </Card>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowRequestClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSendReview}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>

            <AlertBox
                show={showAlert}
                message={message}
                onHide={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default ScoreTable_Student;