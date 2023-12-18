const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

// router.get("/:id", accountController.getLogin);
router.post("/login", accountController.postLogin);

router.get("/", accountController.getAll);

router.get("/profile/:idUser", accountController.getUser);

router.put("/profile/:idUser", accountController.postEditUser);

router.post("/signup", accountController.postSignup);

router.post("/resetPW", accountController.postResetPW);

router.post("/verify", accountController.postVerify);

router.post("/studentID", accountController.getStudentID);

module.exports = router;
