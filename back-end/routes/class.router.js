const express = require("express");
const router = express.Router();

const classController = require("../controllers/class.controller");

// danh sach cac lop ma idUser tham gia voi tu cach la hoc sinh va giao vien
router.get("/:id", classController.getClass);

// tao 1 lop hoc
router.post("/:id/createClass", classController.postCreateClass);

// danh sach hoc sinh va giao vien trong 1 lop hoc
router.get("/:malop/listUserinClass", classController.getListUserinClass);

// chi tiet cua 1 lop hoc
router.get("/:malop/detailClass", classController.getDetailinClass);

// xac nhan tham gia lop hoc
router.post("/:malop/joinClass?", classController.addUserinClass);

module.exports = router;
