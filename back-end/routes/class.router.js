const express = require("express");
const router = express.Router();

const classController = require("../controllers/class.controller");

// danh sach cac lop ma idUser tham gia voi tu cach la hoc sinh va giao vien
router.get("/:id", classController.getClass);

router.get("/:id/createClass", classController.postCreateClass);

// router.get("/:id", classController.getTeacher);

module.exports = router;
