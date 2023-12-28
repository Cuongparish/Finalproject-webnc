import { React, useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { RiSlideshowLine } from "react-icons/ri";
import { TbDatabaseExport } from "react-icons/tb";

import '../App.css';

const ScoreTable = (props) => {
    const GradeStructures = props.gradestructure;
    const ListStudent = props.liststudent;
    console.log(ListStudent);
    const [TotalPercent, setTotalPercent] = useState(0);

    const CaculateTotalPercent = () => {
        let total = 0;
        GradeStructures?.forEach(GradeStructure => {
            total += parseInt(GradeStructure.PhanTramDiem, 10);
        });
        setTotalPercent(total);
        console.log(total);
    }

    useEffect(() => {
        CaculateTotalPercent();
    }, [GradeStructures]);

    useEffect(() => {
        console.log(TotalPercent);
    }, [TotalPercent]);

    return (
        <>
            <Row className="g-0 px-0">
                {/* Table Score */}
                <Table className="m-0" bordered hover>
                    <thead>
                        <tr style={{ height: '100px' }} className="text-center fw-bold table-secondary">
                            <td className="align-middle border-2 border-start-0" style={{ width: '15%' }}>Họ và tên</td>
                            <td className="align-middle" style={{ width: '10%' }}>MSSV</td>
                            {/* <td className="align-middle" style={{ width: '7%' }}>Điểm 1</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 1</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 1</td>
                            <td className="align-middle" style={{ width: '7%' }}>Điểm 1</td> */}
                            {GradeStructures?.map((GradeStructure, index) => (
                                <td className="align-middle" style={{ width: '7%' }}>
                                    <div>{GradeStructure.TenCotDiem}</div>
                                    <div>{GradeStructure.PhanTramDiem}%</div>
                                </td>
                            ))}
                            <td></td> {/* input nothing */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* data start */}
                        <tr>
                            {ListStudent?.map((Student, index) => (
                                <>
                                    <td className="text-center">{Student.FullName}</td>
                                    <td className="text-center">{Student.StudentId}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </>
                            ))}
                        </tr>
                        {/* data end */}
                    </tbody>
                </Table>
            </Row>

            <Row className="d-flex align-items-end justify-content-end my-5">
                <Col sm={2}>
                    <a className="btn btn-primary">
                        <RiSlideshowLine className="mx-1" /> Public bảng điểm
                    </a>
                </Col>
                <Col sm={2}>
                    <a className="btn btn-success">
                        <TbDatabaseExport className="mx-1" /> Export bảng điểm
                    </a>
                </Col>
            </Row>
        </>
    );
};

export default ScoreTable;