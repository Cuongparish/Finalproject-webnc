const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getAll);
// router.get("/:id", bookController.getById)
router.post("/", userController.create);
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)

module.exports = router;
