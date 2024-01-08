import { React, useState, useEffect } from "react";
import { Row, Table } from "react-bootstrap";


import '../App.css';

const ScoreTable_Student = (props) => {
    const GradeStructures = props.gradestructure;
    const ListStudent = props.liststudent;
    const [TotalPercent, setTotalPercent] = useState(0);

    const CaculateTotalPercent = () => {
        let total = 0;
        GradeStructures?.forEach(GradeStructure => {
            total += parseInt(GradeStructure.PhanTramDiem, 10);
        });
        setTotalPercent(total);
    }

    useEffect(() => {
        CaculateTotalPercent();
    }, [GradeStructures]);

    return (
        <>
            <Row className="g-0 px-0">
                <h2>Bảng điểm học sinh</h2>
                {/* Table Score */}
                <Table className="m-0" bordered hover>
                    <thead>
                        <tr style={{ height: '100px' }} className="text-center fw-bold table-secondary">
                            <td className="align-middle border-2 border-start-0" style={{ width: '15%' }}>Họ và tên</td>
                            <td className="align-middle" style={{ width: '10%' }}>MSSV</td>
                            {GradeStructures?.map((GradeStructure, index) => (
                                <td className="align-middle" style={{ width: '7%' }}>
                                    <div>{GradeStructure.TenCotDiem}</div>
                                    <div>{GradeStructure.PhanTramDiem}%</div>
                                </td>
                            ))}
                            <td className="align-middle" style={{ width: '10%' }}>
                                <div>Tổng kết</div>
                                <div>{TotalPercent}</div>
                            </td>
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
        </>
    );
};

export default ScoreTable_Student;