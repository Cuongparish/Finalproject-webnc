import { React, useState, useEffect } from 'react';
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { AiFillNotification } from "react-icons/ai";

import AccountService from "../service/account.service";

const Notification = (props) => {
  const user = props.user;

  const [ListNotification, setListNotification] = useState([]);

  const GetNotification = async () => {
    try {
      await AccountService.GetNotification(user.idUser).then(
        (res) => {
          console.log("res-notify:", res);
          setListNotification(res.data);
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
    GetNotification();
  }, [user.idUser]);

  return (
    <Dropdown as={Col}>
      <Dropdown.Toggle split id="dropdown-split-basic">
        <FaBell />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '350px', maxHeight: '300px', overflowY: 'auto' }}>
        {ListNotification.map((notification, index) => (
          <Dropdown.Item key={index} style={{ height: '65px' }} className="px-0 my-1">
            <Row className="h-100 g-0 align-items-center px-2">
              <Col sm={2} className="d-flex justify-content-center align-items-center">
                <AiFillNotification style={{ fontSize: '36px' }} />
              </Col>
              <Col sm={10} className="px-1">
                <div style={{ textWrap: 'wrap', fontSize: "13px" }}>
                  {notification.NoiDung}
                </div>
                <div style={{ textWrap: 'wrap', fontSize: "13px", marginTop: "5px", color: "#3578E5"}}>
                  {notification.ThoiGian}
                </div>
              </Col>
            </Row>
          </Dropdown.Item>
        ))}

      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Notification;