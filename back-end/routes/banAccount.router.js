const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const banAccountC = require("../controllers/banAccount.controller");
//-------------------------------user
// danh sach cac tai khoan (ban + unban)
router.get("/getban", banAccountC.getAccount);

// ban tài khoản
router.post("/ban", banAccountC.banAccount);

// unban tài khoản
router.delete("/unban", banAccountC.unbanAccount);

// manual mapping or unmapping
router.put("/ban/manualMapID", banAccountC.changeStateStudentID);

// mapping file excel
router.post(
  "/ban/manualMapID",
  upload.single("file"),
  banAccountC.mapStudentID
);

//----------------------------------class
// danh sach lop
router.get("/ban/listClass", banAccountC.getAllClass);

//active or unactive
router.put("/ban/class", banAccountC.changeState);

module.exports = router;
