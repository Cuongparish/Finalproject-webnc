import { React, useState, useEffect } from "react";
import { Row, Col, Table, Form, FloatingLabel, Button, Modal, Card, Tabs, Tab } from "react-bootstrap";
import { IoSettings } from "react-icons/io5";
import { TbDatabaseExport, TbDatabaseImport } from "react-icons/tb";
import { FaTable } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import GradeService from "../service/grade.service";

import '../App.css';

const ScoreTable = (props) => {
    //const GradeStructures = props.gradestructure;
    //const ListStudent = props.liststudent;
    const user = props.user;
    const [show_setting, setShowSetting] = useState(false);
    const handleShowSettingClose = () => setShowSetting(false);
    const handleShowSettingOpen = () => setShowSetting(true);

    const [score_options, setScoreOptions] = useState(false);
    const handleScoreOptionsClose = () => setScoreOptions(false);
    const handleScoreOptionsOpen = () => setScoreOptions(true);

    const [GradeStructures, setGradeStructures] = useState(props.gradestructure)
    const [ListStudent, setListStudent] = useState(props.liststudent)

    const [ListStudentHaveScore, setListStudentHaveScore] = useState([]);

    const [TotalPercent, setTotalPercent] = useState(0);
    const [SelectGradeColumn, setSelectGradeColumn] = useState(GradeStructures[0].TenCotDiem);

    const [GradeBoard, setGradeBoard] = useState([]);

    const [gradeErrors, setGradeErrors] = useState(Array.from({ length: GradeStructures.length }, () => false));

    const [Type, setType] = useState("xlsx");
    const [selectedFile, setSelectedFile] = useState(null);

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
                        if (res.data && res.data[1]?.data) {
                            setListStudentHaveScore(res.data[1].data);
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

    const handleGradeChange = (grade, idHocSinh, idCotDiem, idLop) => {
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
        //console.log(GradeBoard);
    };

    const handleSave = async () => {
        try {
            await GradeService.InputGradeStudent(GradeBoard).then(
                (res) => {
                    //console.log("res:", res);
                    sessionStorage.setItem("Tab", "score");
                    window.location.reload();
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

    const handleUploadGradeBoard = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const res = await GradeService.ImportToExcel_GradeColumn(
                GradeStructures[0].idLop,
                SelectGradeColumn,
                formData
            );
            if (res === "File uploaded successfully!") {
                sessionStorage.setItem("Tab", "score");
                window.location.reload();
            }
        } else {
            console.log("Please select a file to upload");
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const defaultGrades = ListStudent?.map((Student) => {
        const studentWithScore = ListStudentHaveScore.find(item => item.StudentId === Student.StudentId);
        return studentWithScore ? studentWithScore.Diem : GradeStructures.map(() => '');
    });

    const [GradeStructure, setGradeStructure] = useState([
        <Row key={0} className="mx-2 mb-0 justify-content-center">
            <Card className="p-2" style={{ borderRadius: "10px 10px 0 0" }}>
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
    //-----------------------------------------Tạo grade structure
    const addGradeStructure = () => {
        const newGradeStructure = (
            <Row key={0} className="mx-2 mb-0 justify-content-center">
                <Card className="p-2" style={{ borderRadius: "10px 10px 0 0" }}>
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


    useEffect(() => {
        CaculateTotalPercent();
        GetGradeBoard();
    }, [props.gradestructure[0].idLop]);

    return (
        <>
            <Row className="g-0 px-0 mb-5">
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
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{Student.FullName}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{Student.StudentId}</td>
                                {GradeStructures?.map((GradeStructure, gradeIndex) => (
                                    <td key={gradeIndex} className="text-center">
                                        <Form.Control
                                            type="number"
                                            min={0}
                                            max={10}
                                            placeholder='/10'
                                            defaultValue={
                                                defaultGrades[studentIndex][gradeIndex] !== ''
                                                    ? defaultGrades[studentIndex][gradeIndex]
                                                    : undefined
                                            }
                                            onChange={(event) => {
                                                const grade = event.target.value !== '' ? parseFloat(event.target.value, 10) : null;
                                                if (event.target.value === '') {
                                                    // Nếu người dùng xóa giá trị, thiết lập defaultValue là undefined để hiển thị placeholder
                                                    event.target.defaultValue = undefined;
                                                } else if (grade !== null && grade >= 0 && grade <= 10) {
                                                    handleGradeChange(
                                                        grade,
                                                        Student.idHocSinh,
                                                        GradeStructure.idCotDiem,
                                                        GradeStructure.idLop
                                                    );
                                                    const newGradeErrors = [...gradeErrors];
                                                    newGradeErrors[gradeIndex] = false; // Đánh dấu ô input đúng
                                                    setGradeErrors(newGradeErrors);
                                                } else {
                                                    const newGradeErrors = [...gradeErrors];
                                                    newGradeErrors[gradeIndex] = true; // Đánh dấu ô input sai
                                                    setGradeErrors(newGradeErrors);
                                                }
                                            }}
                                        />
                                        {gradeErrors[gradeIndex] && <p style={{ color: 'red' }}>Số điểm không phù hợp</p>}
                                    </td>
                                ))}
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{ListStudentHaveScore[studentIndex]?.total}</td>
                            </tr>
                        ))}
                        {/* data end */}
                    </tbody>
                </Table>
            </Row>

            <Row className="justify-content-end text-end mb-3 px-3">
                <Col sm={2}>
                    <a className="btn btn-info" onClick={handleSave}>
                        <FaSave className="mx-1" /> Lưu bảng điểm
                    </a>
                </Col>

                <Col sm={2}>
                    <a onClick={handleShowSettingOpen} className="btn btn-danger">
                        <IoSettings className="mx-1" /> Cài đặt
                    </a>
                </Col>

                <Col sm={2}>
                    <a onClick={handleScoreOptionsOpen} className="btn btn-success">
                        <FaTable className="mx-1" /> Điểm
                    </a>
                </Col>
            </Row>

            {/* Modal Show Setting */}
            <Modal show={show_setting} size="lg" onHide={handleShowSettingClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Cài đặt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-0 justify-content-center">
                        <Card className="border-0">
                            <FloatingLabel controlId="name_score" label="Tên cột điểm" className="mb-3">
                                <Form.Select
                                    className="border-2 border-black"
                                    value={SelectGradeColumn}
                                    onChange={(e) => setSelectGradeColumn(e.target.value)}
                                >
                                    {GradeStructures?.map((GradeStructure, index) => (
                                        <option>{GradeStructure.TenCotDiem}</option>
                                    ))}
                                    <option>Tất Cả</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="public_score" label="Công bố điểm" className="mb-3">
                                <Form.Select
                                // onChange={(e) => setSex(e.target.value)}
                                >
                                    <option>Công bố</option>
                                    <option>Ẩn</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="review_opt" label="Phúc khảo" className="mb-3">
                                <Form.Select
                                // onChange={(e) => setSex(e.target.value)}
                                >
                                    <option>Cho phúc khảo</option>
                                    <option>Chốt điểm</option>
                                </Form.Select>
                            </FloatingLabel>

                        </Card>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowSettingClose}>
                        Hủy
                    </Button>
                    <Button variant="primary">Thêm mới</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Show Score Options */}
            <Modal show={score_options} size="lg" onHide={handleScoreOptionsClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-0 justify-content-center">
                        <Card className="border-0">
                            <Tabs
                                defaultActiveKey="export_score"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="export_score" title="Export bảng điểm">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn cột điểm để import:</Form.Label>
                                        <Form.Select
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

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn loại file để export:</Form.Label>
                                        <Form.Select
                                            defaultValue={Type}
                                            onChange={(e) => setType(e.target.value)}
                                            className="border-2 border-black mb-3"
                                        >
                                            <option>xlsx</option>
                                            <option>csv</option>
                                        </Form.Select>

                                        <Button
                                            className="border-2 border-black mb-3"
                                            variant="success"
                                            onClick={handleDownloadGradeBoard}
                                        >
                                            <TbDatabaseExport className="mx-1" />Export bảng điểm
                                        </Button>
                                    </Form.Group>
                                </Tab>
                                <Tab eventKey="import_score" title="Import bảng điểm">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn cột điểm để import:</Form.Label>
                                        <Form.Select
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

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Input file:</Form.Label>
                                        <Form.Control type="file" className="border-2 border-black" />
                                    </Form.Group>

                                    <Button
                                        className="border-2 border-black mb-3"
                                        variant="warning"
                                    // onClick={handleDownloadGradeBoard}
                                    >
                                        <TbDatabaseImport className="mx-1" />Import bảng điểm
                                    </Button>
                                </Tab>
                                <Tab eventKey="update_score" title="Update bảng điểm">
                                    {GradeStructure.map((gradestructure, index) => (
                                        <div key={index}>
                                            {gradestructure}
                                            <Row className="mx-2 mb-3 justify-content-center">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => RemoveGradeStructure(index)}
                                                    style={{
                                                        borderRadius: "0 0 10px 10px",
                                                        width: "100%",
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

                                    <Row className="mx-2 mb-3 justify-content-end">
                                        <Col xs={2} className="p-0 text-center">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                // onClick={addGradeStructure}
                                                style={{
                                                    width: "100%",
                                                    height: "40px",
                                                    fontSize: "18px",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Xác nhận
                                            </Button>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ScoreTable;