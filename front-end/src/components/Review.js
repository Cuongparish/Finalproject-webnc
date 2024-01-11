import { React, useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import DetailReview from "./DetailReview";

import "../App.css";

const Review = (props) => {
    const onClick = props.onClick;
    // const user = props.user;
    // const DetailClass = props.DetailClass;

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
                            <Card.Title className="fw-bold text-primary">Phúc khảo điểm abcxyz</Card.Title>
                            <Card.Text>
                                phúc khảo bởi học sinh xyzabc
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Review;
