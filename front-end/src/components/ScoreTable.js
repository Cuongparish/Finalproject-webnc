import { React, useState, useEffect } from "react";
import { Row, Col, Table, Form, FloatingLabel, Button } from "react-bootstrap";
import { RiSlideshowLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { TbDatabaseExport } from "react-icons/tb";

import GradeService from "../service/grade.service";

import '../App.css';

const ScoreTable = (props) => {
    const GradeStructures = props.gradestructure;
    const ListStudent = props.liststudent;
    const [TotalPercent, setTotalPercent] = useState(0);
    const [SelectGradeColumn, setSelectGradeColumn] = useState(GradeStructures[0].TenCotDiem);

    const [GradeBoard, setGradeBoard] = useState([]);

    const [GradeError, setGradeError] = useState(false);

    const [Type, setType] = useState("xlsx");

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

    const handleDownloadGradeBoard = async () => {
        try {
            if (SelectGradeColumn === "Tất Cả") {
                const blobData = await GradeService.ExportToExcel_GradeBoard(
                    GradeStructures[0].idLop,
                    Type
                );
                //console.log(blobData);
                const url = window.URL.createObjectURL(new Blob([blobData]));

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Bảng Điểm.${Type}`); // Đặt tên file
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            }
            else {
                const blobData = await GradeService.ExportToExcel_GradeColumn(
                    GradeStructures[0].idLop,
                    SelectGradeColumn,
                    Type
                );
                //console.log(blobData);
                const url = window.URL.createObjectURL(new Blob([blobData]));

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Bảng Điểm Cột ${SelectGradeColumn}.${Type}`); // Đặt tên file
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error handling download:", error);
            // Xử lý lỗi nếu cần
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
                                                else {
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
                        <Form.Label className="fw-bold">Chọn cột điểm để down/upload:</Form.Label>
                        <Form.Select
                            defaultValue="Male"
                            className="border-2 border-black"
                            value={SelectGradeColumn}
                            onChange={(e) => setSelectGradeColumn(e.target.value)}
                        >
                            {GradeStructures?.map((GradeStructure, index) => (
                                <option>{GradeStructure.TenCotDiem}</option>
                            ))}
                            <option>Tất Cả</option>
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
                    {/* <Form.Select
                        defaultValue={Type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: '150px', marginBottom: '20px' }} // Điều chỉnh chiều rộng của dropdown
                    >
                        <option>xlsx</option>
                        <option>csv</option>
                    </Form.Select>

                    <a className="btn btn-success" onClick={handleDownloadGradeBoard}>
                        <TbDatabaseExport className="mx-1" /> Export bảng điểm
                    </a> */}
                    <FloatingLabel controlId="type" label="FileType" className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Form.Select
                            defaultValue={Type}
                            onChange={(e) => setType(e.target.value)}
                            style={{ width: '150px', marginBottom: '20px' }} // Điều chỉnh chiều rộng của dropdown
                        >
                            <option>xlsx</option>
                            <option>csv</option>
                        </Form.Select>

                        <Button
                            variant="primary"
                            onClick={handleDownloadGradeBoard}
                            style={{ width: '200px' }} // Điều chỉnh chiều rộng của nút
                        >
                            <TbDatabaseExport className="mx-1" />Export bảng điểm
                        </Button>
                    </FloatingLabel>
                </Col>
            </Row>
        </>
    );
};

export default ScoreTable;