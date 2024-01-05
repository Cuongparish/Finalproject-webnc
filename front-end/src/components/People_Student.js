import { React } from "react";
import { Row, Col, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";


const People_Student = (props) => {
  const TeacherInClass = props.TeacherInClass;
  const StudentInClass = props.StudentInClass;

  return (
    <>
      <div className="detail-members mt-3">
        <Row className="banner-members mb-4">
          <Col className="d-flex align-items-center border-bottom border-2 border-black">
            <h3>Giáo viên</h3>
          </Col>
        </Row>

        <Row className="banner-members mb-4">
          {/* Table Teachers */}
          <Table>
            <tbody>
              <tr>
                {TeacherInClass?.map((Teacher, index) => (
                  <div>
                    <td
                      className="align-middle"
                      style={{ width: "20%", padding: "5px" }}
                    >
                      <input
                        type="checkbox"
                      // value="id_user"
                      // checked={selectedValues.includes('Option 1')}
                      // onChange={() => handleCheckboxChange('Option 1')}
                      />
                    </td>
                    <td
                      className="align-middle"
                      style={{ width: "75%" }}
                    >
                      <h5>{Teacher.FullName}</h5>
                    </td>
                  </div>
                ))}
              </tr>
            </tbody>
          </Table>
          {/* Table Teachers */}
        </Row>

        <Row className="banner-members mb-4">
          <Col className="d-flex align-items-center border-bottom border-2 border-black">
            <h3>Sinh viên</h3>
          </Col>
        </Row>

        <Row className="banner-members mb-4">
          {/* Table Student */}
          <Table>
            <tbody>
              <tr>
                {StudentInClass?.map((Student, index) => (
                  <div>
                    <td
                      className="align-middle"
                      style={{ width: "20%", padding: "5px" }}
                    >
                      <input
                        type="checkbox"
                      // value="id_user"
                      // checked={selectedValues.includes('Option 1')}
                      // onChange={() => handleCheckboxChange('Option 1')}
                      />
                    </td>
                    <td
                      className="align-middle"
                      style={{ width: "75%" }}
                    >
                      <h5>{Student.FullName}</h5>
                    </td>
                  </div>
                ))}
              </tr>
            </tbody>
          </Table>
          {/* Table Student */}
        </Row>
      </div>

    </>
  );
};

export default People_Student;