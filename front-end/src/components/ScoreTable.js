import { React, useState, useEffect } from "react";
import { Row, Col, Table, Form, InputGroup, FormControl } from "react-bootstrap";
import { RiSlideshowLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { TbDatabaseExport } from "react-icons/tb";

import GradeService from "../service/grade.service";

import '../App.css';

const ScoreTable = (props) => {
    const GradeStructures = props.gradestructure;
    const ListStudent = props.liststudent;
    const [TotalPercent, setTotalPercent] = useState(0);
    const [SelectGrade, setSelectGrade] = useState(GradeStructures[0].TenCotDiem);

    const [GradeBoard, setGradeBoard] = useState([]);

    const [GradeError, setGradeError] = useState(false);

    const CaculateTotalPercent = () => {
        let total = 0;
        GradeStructures?.forEach(GradeStructure => {
            total += parseInt(GradeStructure.PhanTramDiem, 10);
        });
        setTotalPercent(total);
    }

    const handleGradeChange = (grade, idHocSinh, idCotDiem, idLop) => {
        //const diem = parseInt(grade.target.value); // Chuyển giá trị nhập vào thành số
        // Tìm xem mục cho học sinh và tiêu chí này có tồn tại trong GradeBoard không
        const existingEntryIndex = GradeBoard.findIndex(
            entry =>
                entry.idHocSinh === idHocSinh &&
                entry.idCotDiem === idCotDiem &&
                entry.idLop === idLop
        );

        if (existingEntryIndex !== -1) {
            // Nếu mục đã tồn tại, cập nhật điểm số
            const updatedGradeBoard = [...GradeBoard];
            updatedGradeBoard[existingEntryIndex].Diem = grade;
            setGradeBoard(updatedGradeBoard);
        } else {
            // Nếu mục không tồn tại, tạo mục mới
            setGradeBoard(prevGradeBoard => [
                ...prevGradeBoard,
                { idHocSinh, idCotDiem, idLop, Diem: grade }
            ]);
        }
        console.log(GradeBoard);
    };

    const handleSave = async () => {
        try {
            await GradeService.InputGradeStudent(GradeBoard).then(
                (res) => {
                    console.log("res:", res);
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
        CaculateTotalPercent();
    }, [GradeStructures]);

    return (
        <>
            <Row className="g-0 px-0">
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
                        {/* data start */}
                        {ListStudent?.map((Student, studentIndex) => (
                            <tr key={studentIndex}>
                                <td className="text-center">{Student.FullName}</td>
                                <td className="text-center">{Student.StudentId}</td>
                                {GradeStructures?.map((GradeStructure, gradeIndex) => (
                                    <td key={gradeIndex} className="text-center">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            max={10}
                                            placeholder="/10"
                                            onChange={(event) => {
                                                const grade = parseFloat(event.target.value, 10);
                                                if (grade >= 0 && grade <= 10) {
                                                    handleGradeChange(
                                                        grade,
                                                        Student.idHocSinh,
                                                        GradeStructure.idCotDiem,
                                                        GradeStructure.idLop
                                                    );
                                                    setGradeError(false);
                                                }
                                                else
                                                {
                                                    setGradeError(true);
                                                }
                                            }}
                                        />
                                         {GradeError && <p style={{ color: 'red' }}>Số điểm không phù hợp</p>}
                                    </td>
                                ))}
                                <td className="text-center"></td>
                            </tr>
                        ))}
                        {/* data end */}
                    </tbody>
                </Table>
            </Row>

            <Row className="d-flex align-items-end justify-content-end my-5">
                <Col sm={2}>
                    <a className="btn btn-info" onClick={handleSave}>
                        <RxUpdate className="mx-1" /> Lưu bảng điểm
                    </a>
                </Col>

                <Col sm={2}>
                    <a className="btn btn-info">
                        <RxUpdate className="mx-1" /> Update bảng điểm
                    </a>
                </Col>

                <Col sm={2}>
                    <Form.Group className="m-2" controlId="gender">
                        <Form.Label className="fw-bold">Cột điểm:</Form.Label>
                        <Form.Select
                            defaultValue="Male"
                            className="border-2 border-black"
                            value={SelectGrade}
                            onChange={(e) => setSelectGrade(e.target.value)}
                        >
                            {GradeStructures?.map((GradeStructure, index) => (
                                <option>{GradeStructure.TenCotDiem}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <a className="btn btn-info">
                        <RxUpdate className="mx-1" /> Upload điểm
                    </a>
                </Col>

                <Col sm={2}>
                    <a className="btn btn-primary">
                        <RiSlideshowLine className="mx-1" /> Public bảng điểm
                    </a>
                </Col>
                <Col sm={2}>
                    <a className="btn btn-success">
                        <TbDatabaseExport className="mx-1" /> Export bảng điểm
                    </a>
                </Col>
            </Row>
        </>
    );
};

export default ScoreTable;