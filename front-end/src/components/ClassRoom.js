import React from "react";
import { Card, Button } from "react-bootstrap";
import { RxEnter } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import "../App.css";

const ClassRoom = () => {
  return (
    <>
      <Card className="class-item">
          <Card.Img variant="top"
              src={process.env.PUBLIC_URL + '/Images/class_bg.png'}
              height={80}
          />
          <Card.Body>
              <Card.Title>2309-PTUDWNC-20_3</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Phát triển ứng dụng web nâng cao</Card.Subtitle>
              <Card.Text>Khánh Nguyễn Huy</Card.Text>
              <Button href="/detail-class" variant="primary">Truy cập <RxEnter /></Button>
              <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
          </Card.Body>
      </Card>
    </>
  );
};

export default ClassRoom;
