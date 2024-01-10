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

//download file danh sach lop hoc
router.get(
  "/grade/exporttoExcel_StudentList/:idLop/type?",
  gradeController.exporttoExcel_StudentList
);

//tai len file danh sach lop hoc
router.post(
  "/grade/importtoExcel_StudentList/:idLop",
  upload.single("file"),
  gradeController.importtoExcel_StudentList
);

// bang diem cua cac hoc sinh trong  lop hoc
router.get("/grade/listClass/:idLop/:idUser", gradeController.getGradesBoard);

// nhap diem cho  hoc sinh
router.post("/grade/inputScore", gradeController.addScore_Student_inClass);

//download file danh sach diem 1 thanh phan cua tat ca hoc sinh
router.get(
  "/grade/exporttoExcel_Score/:idLop/:TenCotDiem/type?",
  gradeController.exporttoExcel_Score
);

//tai len file danh sach diem 1 thanh phan cua tat ca hoc sinh
router.post(
  "/grade/importtoExcel_Score/",
  upload.single("file"),
  gradeController.importtoExcel_Score
);

// download file danh sach toan bo diem
// router.get(
//   "/grade/exporttoExcel_Score/:idLop/:TenCotDiem/type?",
//   gradeController.exporttoExcel_Score
// );

// bang diem cua cac hoc sinh trong  lop hoc
router.get(
  "/grade/exportListClass/:idLop/type?",
  gradeController.exporttoExcel_FullScore
);

// cho phép học sinh xem điểm + phúc khảo 1 thành phần
router.get(
  "/grade/publicScoreinClass/:idLop",
  gradeController.publicScore_inClass
);

module.exports = router;
