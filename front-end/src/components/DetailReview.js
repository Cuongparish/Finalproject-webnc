import { React, useState, useEffect } from "react";
import { Row, Col, Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";

import ReviewService from "../service/review.service";

import "../App.css";

const DetailReview = (props) => {
    const review = props.reviewClicked;
    const user = props.user;
    const onClick = props.onClick;

    const handleReturnClick = () => {
        onClick();
    };

    const [DetailReview, setDetailReview] = useState()

    const [Replies, setReplies] = useState([]);

    const [Content, setContent] = useState("");


    const GetDataDetailReview = async () => {
        try {
            await ReviewService.GetDetailReview(review.idUser, review.idPhucKhao).then(
                (res) => {
                    console.log("res-detail: ", res);
                    if (res.data) {
                        setDetailReview(res.data);
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

    const GetDataReplies = async () => {
        try {
            await ReviewService.GetReplies(review.idPhucKhao).then(
                (res) => {
                    console.log("res: ", res);
                    if (res.data) {
                        setReplies(res.data);
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

    const handleSendReply = async () => {
        console.log(Content);
        try {
            await ReviewService.SendReply(review.idLop, review.idPhucKhao, user.idUser, review.idCotDiem, Content).then(
                (res) => {
                    console.log("res-send-reply: ", res);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetDataDetailReview();
        GetDataReplies();
    }, [user]);

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
            </Row>
            <Row className="mb-2 mx-1 justify-content-center">
                <Card className="p-0 rounded-0">
                    <Card.Header className="bg-primary text-white fw-bold fs-3 rounded-0">
                        Phúc khảo cột điểm {review?.TenCotDiem}
                    </Card.Header>
                    <Card.Body>
                        <div className="mb-3 border-bottom fw-bold">Sinh viên: {DetailReview?.FullName} - {DetailReview?.StudentId}</div>
                        <FloatingLabel
                            className="mb-3"
                            controlId="current_score"
                            label="Lý do phúc khảo:"
                        >
                            <Form.Control
                                as="textarea"
                                style={{ height: "100px" }}
                                disabled
                                defaultValue={DetailReview?.NoiDung}
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
                                defaultValue={DetailReview?.Diem_hien_tai}
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
                                defaultValue={DetailReview?.DiemMongMuon}
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
                        {/* <Form.Group className="mb-3" controlId="answer">
                            <Form.Label><strong>Mai Anh Tuấn</strong> đã trả lời:</Form.Label>
                            <Form.Control
                                disabled
                                style={{ height: "100px" }}
                                as="textarea"
                                defaultValue="Oke em thích thì tôi chiều"
                            />
                        </Form.Group> */}
                        {Replies.map((reply, index) => {
                            // Chuyển đổi chuỗi ngày tháng giờ thành đối tượng Date
                            const dateTime = new Date(reply.ThoiGian);

                            // Lấy thời gian
                            const hours = dateTime.getHours();
                            const minutes = dateTime.getMinutes();
                            //const seconds = dateTime.getSeconds();

                            // Lấy ngày, tháng và năm
                            const day = dateTime.getDate();
                            const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                            const year = dateTime.getFullYear();

                            return (
                                <Form.Group key={index} className="mb-3" controlId={`answer_${index}`}>
                                    <Form.Label><strong>{reply.FullName}</strong> đã trả lời: <strong>{`${hours}:${minutes} ${day}/${month}/${year}`}</strong></Form.Label>
                                    <Form.Control
                                        disabled
                                        style={{ height: "100px" }}
                                        as="textarea"
                                        defaultValue={reply.TraoDoi}
                                    />
                                </Form.Group>
                            );
                        })}

                        <hr />

                        <Form.Group className="my-3" controlId="reply_box">
                            <Form.Control
                                as="textarea"
                                placeholder="Viết phản hồi ..."
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button className="my-2 float-end" variant="primary" onClick={handleSendReply}>Gửi</Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Row>
        </>
    );
};

export default DetailReview;
