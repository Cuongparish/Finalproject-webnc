const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

// router.get("/:id", accountController.getLogin);
router.post("/login", accountController.postLogin);

router.get("/", accountController.getAll);

router.put("/profile", accountController.postEditUser);

router.post("/signup", accountController.postSignup);

router.post("/resetPW", accountController.postResetPW);

router.post("/verify", accountController.postVerify);

router.post("/studentID", accountController.getStudentID);

// // router.get("/:id", bookController.getById)
// // router.put("/:id", bookController.updateById)
// // router.delete("/:id", bookController.deleteById)
// router.get("/login", accountController.create);
// router.post("/login", accountController.create);
// router.get("/register", accountController.create);
// router.post("/register", accountController.create);

module.exports = router;
