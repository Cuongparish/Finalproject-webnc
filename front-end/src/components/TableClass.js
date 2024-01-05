import { React, useState, useEffect } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import Datatable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import AdminService from "../service/admin.service";

import "../App.css";

const TableClass = (props) => {
  const admin = props.admin;

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
      width: "5%",
      selector: (row) => row.id,
    },
    {
      name: "Tên lớp",
      center: true,
      wrap: true,
      width: "35%",
      selector: (row) => row.TenLop,
    },
    {
      name: "Chủ đề",
      center: true,
      width: "10%",
      selector: (row) => row.ChuDe,
    },
    {
      name: "Phòng",
      center: true,
      width: "15%",
      selector: (row) => row.Phong,
    },
    {
      name: "Tên giáo viên",
      center: true,
      width: "25%",
      selector: (row) => row.TenGiaoVien,
    },
    {
      name: "Trạng thái",
      center: true,
      width: "10%",
      selector: (row) => (
        <InputGroup.Checkbox
          aria-label="checkbox"
          defaultChecked={row.TrangThai}
        />
      ),
    },
  ];

  const classes = [
    {
      id: 1,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 2,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 3,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 4,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 5,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 6,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 7,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 8,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 9,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 10,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 11,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 1,
    },
    {
      id: 12,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 13,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
    {
      id: 14,
      TenLop: "Nhập môn lập trình",
      ChuDe: "CNTT",
      Phong: "E304",
      TenGiaoVien: "Phạm Trường Khoa",
      TrangThai: 0,
    },
  ];

  return (
    <Datatable
      className="text-center"
      title="Danh sách lớp học"
      columns={class_columns}
      data={classes}
      customStyles={customClassStyles}
      highlightOnHover
      pagination
      subHeader
      subHeaderComponent={
        <Row className="w-100 d-flex g-0 align-items-center justify-content-between px-2 mb-3">
          <Col sm={5}>
            <input
              type="text"
              placeholder="Search here"
              className="form-control mx-2"
            />
          </Col>
          <Col sm={1}>
            <a
              href="javascript:void(0)"
              className="btn-warning btn d-flex align-items-center justify-content-center text-white btn-filter-class"
            >
              <FaFilter className="mx-2" /> Lọc
            </a>
          </Col>
        </Row>
      }
    ></Datatable>
  )
}

export default TableClass;
