import { React, useState, useEffect } from "react";
import { Row, Col, Table, Form, FloatingLabel, Button, Modal, Card, Tabs, Tab } from "react-bootstrap";
import { IoSettings } from "react-icons/io5";
import { TbDatabaseExport, TbDatabaseImport } from "react-icons/tb";
import { FaTable } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import AlertBox from "./AlertBox"

import GradeService from "../service/grade.service";
import ReviewService from "../service/review.service"

import '../App.css';

const ScoreTable = (props) => {
    //const GradeStructures = props.gradestructure;
    //const ListStudent = props.liststudent;
    const user = props.user;
    const ListStudent = props.liststudent;
    const DetailClass = props.detailclass;
    const GradeStructures = props.gradestructure;

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();

    const [show_setting, setShowSetting] = useState(false);
    const handleShowSettingClose = () => setShowSetting(false);
    const handleShowSettingOpen = () => setShowSetting(true);

    const [score_options, setScoreOptions] = useState(false);
    const handleScoreOptionsClose = () => setScoreOptions(false);
    const handleScoreOptionsOpen = () => setScoreOptions(true);

    const [ListStudentHaveScore, setListStudentHaveScore] = useState([]);

    const [TotalPercent, setTotalPercent] = useState(0);
    const [SelectGradeColumn, setSelectGradeColumn] = useState(GradeStructures[0]);

    const [SelectPublic, setSelectPublic] = useState(GradeStructures[0].Khoa === 0 ? "Ẩn" : "Công bố");
    const [SelectReview, setSelectReview] = useState(GradeStructures[0].AcpPhucKhao === 0 ? "Khóa phúc khảo" : "Cho phúc khảo");

    const [GradeBoard, setGradeBoard] = useState([]);

    const [gradeErrors, setGradeErrors] = useState(Array.from({ length: GradeStructures.length }, () => false));

    const [Type, setType] = useState("xlsx");
    const [selectedFile, setSelectedFile] = useState(null);

    const [Action, setAction] = useState("Cập nhật")
    const [NewNameGradeColumn, setNewNameGradeColumn] = useState(SelectGradeColumn.TenCotDiem);
    const [NewPercentScore, setNewPercentScore] = useState(SelectGradeColumn.PhanTramDiem);

    const handleConfirm = () => {
        // Xử lý khi nút xác nhận được nhấn
        setShowAlert(false); // Đóng box thông báo sau khi xác nhận
    };

    const handleCancel = () => {
        // Xử lý khi nút hủy được nhấn
        setShowAlert(false); // Đóng box thông báo sau khi hủy
    };

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

    const defaultGrades = ListStudent?.map((Student) => {
        const studentWithScore = ListStudentHaveScore.find(item => item.StudentId === Student.StudentId);
        return studentWithScore ? studentWithScore.Diem : GradeStructures.map(() => '');
    });

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
            if (SelectGradeColumn.TenCotDiem === "Tất Cả") {
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
                    SelectGradeColumn.TenCotDiem,
                    Type
                );
                //console.log(blobData);
                const url = window.URL.createObjectURL(new Blob([blobData]));

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Bảng Điểm Cột ${SelectGradeColumn.TenCotDiem}.${Type}`); // Đặt tên file
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error handling download:", error);
            // Xử lý lỗi nếu cần
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadGradeBoard = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            console.log(SelectGradeColumn.idLop, SelectGradeColumn.TenCotDiem)

            const res = await GradeService.ImportToExcel_GradeColumn(
                SelectGradeColumn.idLop,
                SelectGradeColumn.TenCotDiem,
                formData
            );
            //console.log(res);
            if (res.msg === "File uploaded successfully!") {
                sessionStorage.setItem("Tab", "score");
                window.location.reload();
            }
        } else {
            console.log("Please select a file to upload");
        }
    };

    const handleUpdateGradeBoard = async () => {
        if (Action === "Cập nhật") {
            try {
                await GradeService.UpdateGradeStructure(
                    SelectGradeColumn.idLop,
                    NewNameGradeColumn,
                    NewPercentScore,
                    SelectGradeColumn.idCotDiem,
                    SelectGradeColumn.Khoa,
                    SelectGradeColumn.AcpPhucKhao).then(
                        (res) => {
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
        }
        else if (Action === "Xóa") {
            const GradeIndex = GradeStructures.findIndex(GradeStructure => GradeStructure.TenCotDiem === SelectGradeColumn.TenCotDiem)
            const StudentGrade = defaultGrades[0][GradeIndex];
            if (StudentGrade) {
                setMessage("Cột điểm đã chấm, không thể xóa !!!");
                setShowAlert(true);
            }
            else {
                try {
                    await GradeService.DelGradeStructure(SelectGradeColumn.idLop, SelectGradeColumn.TenCotDiem).then(
                        (res) => {
                            //console.log(res);
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
            }
        }
        else if (Action === "Thêm mới") {
            const Data = {
                TenCotDiem: NewNameGradeColumn,
                PhanTramDiem: NewPercentScore
            }

            const ArrData = [];
            ArrData.push(Data);

            try {
                await GradeService.CreateGradeStructure(GradeStructures[0].idLop, ArrData).then(
                    (res) => {
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
        }
    }

    const handleGradeColumnChange = (selectedGradeColumn) => {
        // Tìm GradeStructure tương ứng với cột điểm được chọn
        const selectedGradeStructure = GradeStructures.find(grade => grade.TenCotDiem === selectedGradeColumn);

        // Cập nhật giá trị của SelectPublic và SelectReview dựa trên GradeStructure mới
        setSelectPublic(selectedGradeStructure.Khoa === 0 ? "Ẩn" : "Công bố");
        setSelectReview(selectedGradeStructure.AcpPhucKhao === 0 ? "Khóa phúc khảo" : "Cho phúc khảo");

        // Cập nhật giá trị của SelectGradeColumn
        setSelectGradeColumn(selectedGradeStructure);
    };

    const handleGradePublicChange = (selectedGradePublic) => {
        if (selectedGradePublic === "Công bố") {
            setSelectReview("Cho phúc khảo");
            setSelectPublic(selectedGradePublic);
        }
        else {
            setSelectReview("Khóa phúc khảo");
            setSelectPublic(selectedGradePublic);
        }
    }

    const handleGradeReviewChange = (selectedGradeReview) => {
        if (selectedGradeReview === "Cho phúc khảo") {
            setSelectPublic("Công bố");
            setSelectReview(selectedGradeReview);
        }
        else {
            setSelectReview(selectedGradeReview);
        }
    }

    const handleSettingGradeBoard = async () => {
        const Khoa = SelectPublic === "Ẩn" ? 0 : 1;
        const AcpPhucKhao = SelectReview === "Khóa phúc khảo" ? 0 : 1;

        const selectedGradeStructure = GradeStructures.find(grade => grade.TenCotDiem === SelectGradeColumn.TenCotDiem);

        if (Khoa === 1 && AcpPhucKhao === 1) {
            //Xử lý public điểm
            try {
                await GradeService.PublicGradeBoard(
                    selectedGradeStructure.idLop,
                    selectedGradeStructure.idCotDiem,
                    selectedGradeStructure.TenCotDiem,
                    selectedGradeStructure.PhanTramDiem,
                    DetailClass.MaLop).then(
                        (res) => {
                            if (res.msg === "Đã công bố thành công và được phép phúc khảo thành phần điểm") {
                                setMessage("Public điểm thành công");
                                setShowAlert(true);
                            }
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
            } catch (error) {
                console.log(error);
            }
        }
        else if (Khoa === 1 && AcpPhucKhao === 0) {
            //xử lý khóa phúc khảo
            try {
                await ReviewService.LockReview(
                    selectedGradeStructure.idLop,
                    selectedGradeStructure.idCotDiem).then(
                        (res) => {
                            console.log("res:", res);
                            if (res.msg === "cập nhật không cho phúc khảo nữa") {
                                setMessage("Bạn đã khóa phúc khảo");
                                setShowAlert(true);
                            }
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
            } catch (error) {
                console.log(error);
            }
        }
    }

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
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {(() => {
                                        const student = ListStudentHaveScore.find(item => item.StudentId === Student.StudentId);
                                        return student && student.total;
                                    })()}
                                </td>
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
                                    value={SelectGradeColumn?.TenCotDiem}
                                    onChange={(e) => handleGradeColumnChange(e.target.value)}
                                >
                                    {GradeStructures?.map((GradeStructure, index) => (
                                        <option>{GradeStructure?.TenCotDiem}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel controlId="public_score" label="Công bố điểm" className="mb-3">
                                <Form.Select
                                    value={SelectPublic}
                                    onChange={(e) => handleGradePublicChange(e.target.value)}
                                >
                                    <option>Công bố</option>
                                    <option>Ẩn</option>
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel controlId="review_opt" label="Phúc khảo" className="mb-3">
                                <Form.Select
                                    value={SelectReview}
                                    onChange={(e) => handleGradeReviewChange(e.target.value)}
                                >
                                    <option>Cho phúc khảo</option>
                                    <option>Khóa phúc khảo</option>
                                </Form.Select>
                            </FloatingLabel>
                            {SelectPublic === "Ẩn" && SelectReview === "Cho phúc khảo" && (
                                <p style={{ color: "red" }}>Bạn không thể ẩn công bố</p>
                            )}
                        </Card>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowSettingClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSettingGradeBoard}>Lưu</Button>
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
                                {/* Export Bảng điểm */}
                                <Tab eventKey="export_score" title="Export bảng điểm">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn cột điểm để export:</Form.Label>
                                        <Form.Select
                                            className="border-2 border-black"
                                            value={SelectGradeColumn?.TenCotDiem}
                                            onChange={(e) => {
                                                if (e.target.value === "Tất Cả") {
                                                    setSelectGradeColumn({ TenCotDiem: "Tất Cả" });
                                                }
                                                else {
                                                    const GradeColumn = GradeStructures.find(
                                                        GradeStructure => GradeStructure.TenCotDiem === e.target.value
                                                    );
                                                    setSelectGradeColumn(GradeColumn);
                                                }
                                            }}
                                        >
                                            {GradeStructures?.map((GradeStructure, index) => (
                                                <option>{GradeStructure?.TenCotDiem}</option>
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

                                {/* Import Bảng điểm */}
                                <Tab eventKey="import_score" title="Import bảng điểm">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn cột điểm để import:</Form.Label>
                                        <Form.Select
                                            className="border-2 border-black"
                                            value={SelectGradeColumn?.TenCotDiem}
                                            onChange={(e) => {
                                                const GradeColumn = GradeStructures.find(
                                                    GradeStructure => GradeStructure.TenCotDiem === e.target.value
                                                );
                                                setSelectGradeColumn(GradeColumn);
                                            }}
                                        >
                                            {GradeStructures?.map((GradeStructure, index) => (
                                                <option>{GradeStructure?.TenCotDiem}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Input file:</Form.Label>
                                        <Form.Control type="file" className="border-2 border-black" onChange={handleFileChange} />
                                    </Form.Group>

                                    <Button
                                        className="border-2 border-black mb-3"
                                        variant="warning"
                                        onClick={handleUploadGradeBoard}
                                    >
                                        <TbDatabaseImport className="mx-1" />Import bảng điểm
                                    </Button>
                                </Tab>

                                {/* Update Bảng điểm */}
                                <Tab eventKey="update_score" title="Update bảng điểm">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Chọn cột điểm để cập nhật:</Form.Label>
                                        <Form.Select
                                            disabled={Action === "Thêm mới"}
                                            className="border-2 border-black mb-3"
                                            value={SelectGradeColumn?.TenCotDiem}
                                            onChange={(e) => {
                                                const GradeColumn = GradeStructures.find(
                                                    GradeStructure => GradeStructure.TenCotDiem === e.target.value
                                                );
                                                setSelectGradeColumn(GradeColumn);
                                            }}
                                        >
                                            {GradeStructures?.map((GradeStructure, index) => (
                                                <option>{GradeStructure?.TenCotDiem}</option>
                                            ))}
                                        </Form.Select>

                                        <Form.Label className="fw-bold mb-2">Chọn hoạt động:</Form.Label>
                                        <Form.Select
                                            className="border-2 border-black mb-3"
                                            defaultValue={Action}
                                            onChange={(e) => setAction(e.target.value)}
                                        >
                                            <option>Cập nhật</option>
                                            <option>Xóa</option>
                                            <option>Thêm mới</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Tên cột điểm mới: </Form.Label>
                                        <Form.Control
                                            disabled={Action === "Xóa"}
                                            id="newname"
                                            type="text"
                                            placeholder={SelectGradeColumn?.TenCotDiem}
                                            onChange={(e) => setNewNameGradeColumn(e.target.value)}
                                            className="border-2 border-black mb-3"
                                        />

                                        <Form.Label className="fw-bold mb-2">Phần trăm điểm mới: </Form.Label>
                                        <Form.Control
                                            disabled={Action === "Xóa"}
                                            id="newpercent"
                                            type="text"
                                            placeholder={SelectGradeColumn?.PhanTramDiem}
                                            onChange={(e) => setNewPercentScore(e.target.value)}
                                            className="border-2 border-black mb-3"
                                        />

                                        <Button
                                            className="border-2 border-black mb-3"
                                            variant="success"
                                            onClick={handleUpdateGradeBoard}
                                        >
                                            <TbDatabaseExport className="mx-1" />Cập nhật
                                        </Button>
                                        <p>Lưu ý: Vui lòng nhập đầy đủ thông tin</p>
                                    </Form.Group>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Row>
                </Modal.Body>
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

export default ScoreTable;