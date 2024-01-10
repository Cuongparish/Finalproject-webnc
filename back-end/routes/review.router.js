const express = require("express");
const router = express.Router();

const reviewC = require("../controllers/review.controller");

// tạo đơn phúc khảo, thông báo đến các giáo viên trong lớp, thông báo đến học sinh tạo đơn phúc khảo
router.post("/review", reviewC.addReview_Student);

// chi tiết đơn phúc khảo
router.post("/review/detailReview", reviewC.getDetailReview);

// đóng đơn phúc khảo
router.post("/review/closeReview/:idLop", reviewC.closeReview);

// trả lời đơn phúc khảo
//(req.params.idPhucKhao, req.body.idUser, req.body.TraoDoi,
//req.body.ThoiGian, req.params.idLop, req.body.idCotDiem)
router.post("/review/replies/:idLop/:idPhucKhao", reviewC.repliesReview);

// danh sach cac phản hồi
router.get("/review/listReplies/:idPhucKhao", reviewC.getRepliesReview);

module.exports = router;
