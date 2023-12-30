const express = require("express");
const router = express.Router();

const upload = require("../config/multer.config");

const gradeController = require("../controllers/grade.controller");

//
//router.get("/grade", gradeController.getAll);

// danh sach bang diem thanh phan cua lop hoc va tong phan tram diem
router.get(
  "/grade/listPercentScore/:idLop",
  gradeController.getPercentScore_inClass
);

// them thanh phan diem
router.post(
  "/grade/addPercentScore/:idLop",
  gradeController.addPercentScore_inClass
);

// xoa 1 thanh phan diem
router.delete(
  "/grade/delPercentScore/:idLop",
  gradeController.delPercentScore_inClass
);

// sua 1 thanh phan diem
router.put(
  "/grade/updatePercentScore/:idLop",
  gradeController.updatePercentScore_inClass
);

router.get(
  // "/grade/exporttoExcel_StudentList/:idLop",
  "/grade/exporttoExcel_StudentList/:idLop/type?",
  gradeController.exporttoExcel_StudentList
);

router.post(
  // "/grade/exporttoExcel_StudentList/:idLop",
  "/grade/importtoExcel_StudentList/:idLop",
  upload.single("file"),
  gradeController.importtoExcel_StudentList
);

// bang diem cua cac hoc sinh trong  lop hoc
router.get("/grade/listClass/:idLop", gradeController.getGradesBoard);

// nhap diem cho  hoc sinh
router.post("/grade/inputScore/", gradeController.addScore_Student_inClass);

module.exports = router;
