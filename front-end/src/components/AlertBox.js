import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertBox = ({ show, message, onHide, onConfirm }) => {
    const messageStyle = {
        fontSize: '20px', // Đặt kích thước phù hợp
        fontWeight: 'bold', // Đặt kiểu chữ in đậm
        textAlign: 'center', // Căn giữa văn bản
      };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p style={messageStyle}>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertBox;
