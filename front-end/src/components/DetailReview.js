import React from "react";
import { Row, Col, Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";

import "../App.css";

const DetailReview = (props) => {
    const onClick = props.onClick;

    const handleReturnClick = () => {
        onClick();
    };

    return (
        <>
            <Row className="mb-2 mx-1 py-1 bg-white fw-bold d-flex align-items-center justify-content-between">
                <Col sm={2}>
                    <a style={{ cursor: 'pointer' }} className="button btn-back p-0"
                    onClick={handleReturnClick}
                    >
                        <FaChevronLeft /> Return
                    </a>
                </Col>
                <Col sm={8}>
                    <h2 className="m-0 text-center">Tên lớp - Chủ đề - Phòng học</h2>
                </Col>
                <Col></Col>
            </Row>
            <Row className="mb-2 mx-1 justify-content-center">
                <Card className="p-0 rounded-0">
                    <Card.Header className="bg-primary text-white fw-bold fs-3 rounded-0">
                        Điểm thi GK - 25%
                    </Card.Header>
                    <Card.Body>
                        <div className="mb-3 border-bottom fw-bold">Phạm Trường Khoa - 18120419</div>
                        <FloatingLabel
                            className="mb-3"
                            controlId="current_score"
                            label="Lý do phúc khảo:"
                        >
                            <Form.Control
                                as="textarea"
                                style={{ height: "100px" }}
                                disabled
                                defaultValue="Làm đúng hết nên được 9 điểm"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className="mb-3 border-0 border-bottom"
                            controlId="current_score"
                            label="Điểm hiện tại:"
                        >
                            <Form.Control
                                type="number"
                                disabled
                                id="current_score"
                                defaultValue="7.5"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className="mb-3 border-0 border-bottom"
                            controlId="expected_score"
                            label="Điểm mong muốn:"
                        >
                            <Form.Control
                                type="number"
                                disabled
                                id="expected_score"
                                defaultValue="9"
                            />
                        </FloatingLabel>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="mb-2 mx-1 justify-content-center">
                <Card className="p-0 rounded-0">
                    <Card.Header className="bg-success text-white fw-bold fs-3 rounded-0">
                        Đã trả lời
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="answer">
                            <Form.Label><strong>Mai Anh Tuấn</strong> đã trả lời:</Form.Label>
                            <Form.Control
                                disabled
                                style={{ height: "100px" }}
                                as="textarea"
                                defaultValue="Oke em thích thì tôi chiều"
                            />
                        </Form.Group>
                        <hr />

                        <Form.Group className="my-3" controlId="reply_box">
                            <Form.Control
                                as="textarea"
                                placeholder="Viết phản hồi ..."
                            />
                            <Button className="my-2 float-end" variant="primary">Gửi</Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Row>
        </>
    );
};

export default DetailReview;
