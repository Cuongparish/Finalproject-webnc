import { React, useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import DetailReview from "./DetailReview";

import "../App.css";

const Review = (props) => {
    const review = props.review;
    const onClick = props.onClick;

    const handleReviewClick = () => {
        onClick();
    };

    return (
        <>
            <Row
                className="g-0 d-flex justify-content-center align-items-center bg-success mb-2 rv_element"
                onClick={handleReviewClick}
            >
                <Col sm={1} className="p-1 text-white text-center">
                    Đã trả lời
                </Col>
                <Col sm={11}>
                    <Card className="border-0 bg-white rounded-0">
                        <Card.Body>
                            <Card.Title className="fw-bold text-primary">Phúc khảo điểm {review?.TenCotDiem}</Card.Title>
                            <Card.Text>
                                Phúc khảo bởi học sinh {review?.FullName}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Review;
