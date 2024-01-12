import { React, useState, useEffect } from 'react';
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { AiFillNotification } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import AccountService from "../service/account.service";

import "../App.css";

const Notification = (props) => {
  const user = props.user;

  const navigate = useNavigate();

  const [ListNotification, setListNotification] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState();

  const GetNotification = async () => {
    try {
      await AccountService.GetNotification(user.idUser).then(
        (res) => {
          console.log("res-notify:", res);
          setListNotification(res.data);
          if (res.data && res.data.length > 0) {
            setHasNewNotification(true);
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

  const handleNavigate = (notify) => {
    if(notify.idPhucKhao === null)
    {
      sessionStorage.setItem("Tab", "score");
    }
    else
    {
      sessionStorage.setItem("Tab", "communication");
      sessionStorage.setItem("idPhucKhao", notify.idPhucKhao);
    }
    
    navigate(`/detail-class/${notify.m_Lop}`);
    window.location.reload();
  }

  const handleNewNotification = () => {
    setHasNewNotification(false);
  };

  const handleDropdownToggle = (isOpen) => {
    if (isOpen) {
      // Người dùng đã mở danh sách thông báo, đặt hasNewNotification thành false
      handleNewNotification();
    }
  };

  useEffect(() => {
    GetNotification();
  }, [user.idUser]);

  return (
    <Dropdown as={Col} onToggle={handleDropdownToggle}>
      <Dropdown.Toggle split id="dropdown-split-basic" >
        <FaBell />
        {hasNewNotification && <span className="notification-badge">!</span>}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '350px', maxHeight: '300px', overflowY: 'auto' }}>
        {ListNotification.map((notification, index) => (
          <Dropdown.Item key={index} style={{ height: '90px' }} className="px-0 my-1">
            <Row className="h-100 g-0 align-items-center px-2"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên
                // Xử lý sự kiện click ở đây
                handleNavigate(notification);
              }}>
              <Col sm={2} className="d-flex justify-content-center align-items-center">
                <AiFillNotification style={{ fontSize: '36px' }} />
              </Col>
              <Col sm={10} className="px-1">
                <div style={{ textWrap: 'wrap', fontSize: "13px" }}>
                  {notification.NoiDung}
                </div>
                <div style={{ textWrap: 'wrap', fontSize: "13px", marginTop: "2px", color: "#3578E5" }}>
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