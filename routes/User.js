const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.post("/register", userController.registerUser);
router.get("/get-all", userController.getAllUsers);
router.get("/getByID/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;
