import { React, useState, useEffect } from "react";
import { Row, Col, InputGroup, Button } from "react-bootstrap";
import Datatable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";

import AlertBox from "./AlertBox";

import AdminService from "../service/admin.service";

import "../App.css";

const TableClass = (props) => {
  const admin = props.admin;

  const [AllClass, setAllClass] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedTenLop, setSelectedTenLop] = useState(null);
  const [selectedChuDe, setSelectedChuDe] = useState(null);
  const [selectedPhong, setSelectedPhong] = useState(null);
  const [selectedMaLop, setSelectedMaLop] = useState(null);
  const [selectedClassState, setSelectedClassState] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [Message, setMessage] = useState();

  const [searchTerm, setSearchTerm] = useState('');

  const GetAllClass = async () => {
    try {
      await AdminService.GetClass().then(
        (res) => {
          //console.log("classes", res);
          setAllClass(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (idLop, TenLop, ChuDe, Phong, MaLop, State) => {
    setSelectedClassId(idLop);
    setSelectedTenLop(TenLop);
    setSelectedChuDe(ChuDe);
    setSelectedPhong(Phong);
    setSelectedMaLop(MaLop);
    setSelectedClassState(!State);
    if (State) {
      setMessage(`Bạn có muốn tắt hoạt động lớp có id: ${idLop} không?`);
    }
    else {
      setMessage(`Bạn có muốn mở hoạt động lớp có id: ${idLop} không?`);
    }
    setShowAlert(true); // Hiển thị modal khi checkbox thay đổi
  };

  const handleConfirm = async () => {
    try {
      let state = 1;
      if (!selectedClassState) {
        state = 0;
      }
      await AdminService.ChangeStateClass(selectedClassId, selectedTenLop, selectedChuDe, selectedPhong, selectedMaLop, state).then(
        (res) => {
          //console.log("classes", res);
          const updatedCheckboxStatus = AllClass.map(item => {
            if (item.idLop === selectedClassId) {
              return { ...item, State: selectedClassState };
            }
            return item;
          });
          setAllClass(updatedCheckboxStatus);
          setShowAlert(false);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setSelectedClassId(null);
    setSelectedClassId(true);
    setShowAlert(false);
  };

  const customClassStyles = {
    table: {
      style: {
        border: "1px solid black",
      },
    },
    headRow: {
      style: {
        fontSize: "17px",
        fontWeight: "bold",
        backgroundColor: "#cccccc",
      },
    },
    subHeader: {
      style: {
        padding: "0",
      },
    },
    headCells: {
      style: {
        border: "1px solid black",
      },
    },
    cells: {
      style: {
        border: "1px solid black",
      },
    },
  };

  // Class: ID, TenLop, ChuDe, Phong, TenGiaoVien, Active/Inactive
  const class_columns = [
    {
      name: "ID",
      center: true,
      width: "10%",
      selector: (row) => row.idLop,
    },
    {
      name: "Tên lớp",
      center: true,
      wrap: true,
      width: "30%",
      selector: (row) => row.TenLop,
    },
    {
      name: "Chủ đề",
      center: true,
      width: "20%",
      selector: (row) => row.ChuDe,
    },
    {
      name: "Phòng",
      center: true,
      width: "15%",
      selector: (row) => row.Phong,
    },
    {
      name: "Mã lớp",
      center: true,
      width: "15%",
      selector: (row) => row.MaLop,
    },
    {
      name: "Kích hoạt",
      center: true,
      width: "10%",
      selector: (row) => (
        <InputGroup.Checkbox
          aria-label="checkbox"
          checked={row.State}
          onChange={() => handleCheckboxChange(row.idLop, row.TenLop, row.ChuDe, row.Phong, row.MaLop, row.State)}
        />
      ),
    },
  ];

  const filteredClasses = searchTerm
    ? AllClass.filter((item) =>
      item.TenLop.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : AllClass;

  useEffect(() => {
    //console.log(admin);
    GetAllClass();
  }, [admin]);

  return (
    <>
      <Datatable
        className="text-center"
        title="Danh sách lớp học"
        columns={class_columns}
        data={filteredClasses}
        customStyles={customClassStyles}
        highlightOnHover
        pagination
        subHeader
        subHeaderComponent={
          <Row className="w-100 d-flex g-0 align-items-center justify-content-start px-2 mb-3">
            <Col sm={5} className="me-2">
              <input
                type="text"
                placeholder="Search classname here"
                className="form-control mx-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col sm={1} className="ms-2">
              <Button
                variant="warning"
                className="btn d-flex align-items-center justify-content-center text-white btn-filter-user"
              >
                <FaFilter className="mx-2" /> Search
              </Button>
            </Col>
          </Row>
        }
      ></Datatable>

      <AlertBox
        show={showAlert}
        message={Message}
        onHide={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default TableClass;
