const express = require("express");
const router = express.Router();

const gradeController = require("../controllers/grade.controller");

//
//router.get("/grade", gradeController.getAll);

// danh sach bang diem thanh phan cua lop hoc
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

// xoa 1 thanh phan diem
router.put(
  "/grade/updatePercentScore/:idLop",
  gradeController.updatePercentScore_inClass
);

// sua 1 thanh phan diem

module.exports = router;
