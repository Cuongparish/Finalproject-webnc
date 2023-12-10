import React from "react";
import { Card, Button } from "react-bootstrap";
import { RxEnter } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import "../App.css";

const ClassRoom = (props) => {
  const ChuDe = props.ChuDe;
  //const Phong = props.Phong;
  const TenLop = props.TenLop;
  const MaLop = props.MaLop;

  const detail_class_link = `/detail-class/${MaLop}`;

  return (
    <>
      <Card className="class-item" style={{ position: 'relative' }}>
        <Card.Img
          variant="top"
          src={process.env.PUBLIC_URL + '/Images/class_bg.png'}
          height={80}
        />
        <Card.Body>
          <Card.Title>{TenLop}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{ChuDe}</Card.Subtitle>
        </Card.Body>
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button href={detail_class_link} variant="primary">Truy cập <RxEnter /></Button>
          <Button variant="danger" className='mx-2'>Hủy <ImCancelCircle /></Button>
        </div>
      </Card>

    </>
  );
};

export default ClassRoom;
