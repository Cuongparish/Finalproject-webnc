const express = require("express");
const router = express.Router();

const reviewC = require("../controllers/review.controller");

// tạo đơn phúc khảo, thông báo đến các giáo viên trong lớp, thông báo đến học sinh tạo đơn phúc khảo
router.post("/review", reviewC.addReview_Student);

// chi tiết đơn phúc khảo
router.post("/detailReview", reviewC.getDetailReview);

module.exports = router;
