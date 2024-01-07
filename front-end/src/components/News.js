import { React, useState } from "react";
import { Row, Col, Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { FaRegCopy, FaLink } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import copy from "clipboard-copy";

import "bootstrap/dist/css/bootstrap.min.css";
import AlertBox from "../components/AlertBox";

import "../App.css";

//const Client_URL = "http://localhost:3000";
const Client_URL = "https://frontend-finalproject-webnc.vercel.app";

const News = (props) => {
    const DetailClass = props.DetailClass

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();

    const link = `${Client_URL}/join-class/${DetailClass?.MaLop}/hs`;

    function CopyCode(code) {
        const textToCopy = code;

        const copyText = () => {
            copy(textToCopy)
                .then(() => {
                    setMessage("Đã sao chép mã!");
                    //alert("Đã sao chép!");
                    setShowAlert(true);
                })
                .catch((err) => {
                    alert("Lỗi khi sao chép: " + err);
                });
        };

        return copyText;
    }

    function CopyLink(link) {
        const textToCopy = link;

        const copyText = () => {
            copy(textToCopy)
                .then(() => {
                    setMessage("Đã sao chép link!");
                    //alert("Đã sao chép!");
                    setShowAlert(true);
                })
                .catch((err) => {
                    alert("Lỗi khi sao chép: " + err);
                });
        };

        return copyText;
    }

    const handleConfirm = () => {
        // Xử lý khi nút xác nhận được nhấn
        console.log("Đã xác nhận");
        setShowAlert(false); // Đóng box thông báo sau khi xác nhận
    };

    const handleCancel = () => {
        // Xử lý khi nút hủy được nhấn
        console.log("Đã hủy");
        setShowAlert(false); // Đóng box thông báo sau khi hủy
    };

    return (
        <>
            <div className="detail-news mt-3">
                <Row className="banner-news mb-4">
                    <h1>{DetailClass?.TenLop}</h1>
                </Row>

                <Row>
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Header className="fs-6">Mã lớp</Card.Header>
                            <Card.Body>
                                <Card.Text className="fs-3 fw-bold">
                                    {DetailClass?.MaLop}
                                </Card.Text>
                                <Row className="d-flex g-3">
                                    <Col>
                                        <Button
                                            onClick={() => CopyCode(DetailClass?.MaLop)}
                                            variant="outline-info"
                                            className="d-flex align-items-center justify-content-center"
                                        >
                                            <FaRegCopy />
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            onClick={() => CopyLink(link)}
                                            variant="outline-success"
                                            className="d-flex align-items-center justify-content-center"
                                        >
                                            <FaLink />
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header className="fs-6">Sắp đến hạn</Card.Header>
                            <Card.Body>
                                <Card.Text className="text-muted">
                                    Không có bài tập nào sắp đến hạn
                                </Card.Text>
                                <Row className="text-end">
                                    <a href="/" className="button">
                                        Xem tất cả
                                    </a>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Thông báo nội dung nào đó cho lớp học của ban"
                            className="mb-4"
                        >
                            <Form.Control type="text" placeholder="" />
                        </FloatingLabel>

                        <Card style={{ width: "100%" }}>
                            <Card.Body>
                                <Card.Title>
                                    Đây là nơi bạn giao tiếp với cả lớp học của mình
                                </Card.Title>
                                <Card.Subtitle className="mb-4 fs-6 fw-bold text-muted">
                                    Sử dụng bảng tin để thông báo, đăng bài tập và trả
                                    lời câu hỏi của học viên
                                </Card.Subtitle>
                                <Button
                                    variant="outline-dark"
                                    className="float-end d-flex align-items-center justify-content-center"
                                    //onClick={handleSettingsClick} // Thay 'handleSettingsClick' bằng hàm xử lý sự kiện của bạn
                                >
                                    <IoSettingsOutline className="mx-1" />
                                    Cài đặt bảng tin
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <AlertBox
                show={showAlert}
                message={message}
                onHide={handleCancel}
                onConfirm={handleConfirm}
            />
        </>

    );
};

export default News;