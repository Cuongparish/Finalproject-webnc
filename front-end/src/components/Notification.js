import { React} from "react";
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";

const Notification = (props) => {
    return (
        <Dropdown as={Col}>
            <Dropdown.Toggle split id="dropdown-split-basic">
              <FaBell />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: '350px' }}>
              <Dropdown.Item style={{ height: '65px' }} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px' }} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px' }} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px' }} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Item style={{ height: '65px' }} className="px-0 my-1">
                <Row className="h-100 g-0 align-items-center px-2">
                  <Col sm={2}>
                    <Image
                      src={process.env.PUBLIC_URL + "Images/announce_icon.png"}
                      className="d-inline-block rounded"
                      alt=""
                      fluid
                    />
                  </Col>
                  <Col sm={10} className="px-1" style={{ textWrap: 'wrap', fontSize: "13px" }}>
                    <strong>Phạm Trường Khoa</strong> đã đăng một thông báo mới
                  </Col>
                </Row>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    )
}

export default Notification;