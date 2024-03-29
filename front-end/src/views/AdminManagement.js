import { React} from "react";
import { Row, Col, Image, Tabs, Tab } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

import AuthService from "../service/auth.service";

import TableUser from "../components/TableUser";
import TableClass from "../components/TableClass";

import "../App.css";

const AdminManagement = (props) => {
  const admin = props.user;

  return (
    <>
      <Row className="justify-content-center py-3 menu-top align-items-center">
        <Col xs md={1}>
          <a href="/admin" className="fs-3 btn-menu">
            <FaBars />
          </a>
        </Col>
        <Col
          xs
          md={{ span: 4, offset: 3 }}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            src={process.env.PUBLIC_URL + "/Images/logo.png"}
            className="d-inline-block mx-2"
            alt=""
            width={50}
          />
          <h3 className="mb-0">Grade Management</h3>
        </Col>
        <Col
          xs
          md={{ span: 2, offset: 1 }}
          className="d-flex justify-content-end align-items-center"
        >
          <a href="/admin" className="mx-2 btn-member">
            {admin?.FullName}
          </a>
          <a
            href="/logout"
            className="button btn-logout"
            onClick={AuthService.logout}
          >
            Log Out
          </a>
        </Col>
      </Row>

      <Row className="g-0 w-100 h-100 tab-menu">
        <Tabs defaultActiveKey="info" className="border-bottom border-2 px-3">
          <Tab
            eventKey="info"
            id="info"
            title="User Management"
            className="h-100"
          >
            <TableUser admin={admin} />
          </Tab>

          <Tab eventKey="score" title="Class Management" className="h-100">
            <TableClass admin={admin} />
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};

export default AdminManagement;
