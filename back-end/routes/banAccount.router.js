const express = require("express");
const router = express.Router();

const banAccountC = require("../controllers/banAccount.controller");

// danh sach cac tai khoan (ban + unban)
router.get("/getban", banAccountC.getAccount);

// ban tài khoản
router.post("/ban", banAccountC.banAccount);

// unban tài khoản
router.delete("/unban", banAccountC.unbanAccount);

module.exports = router;
