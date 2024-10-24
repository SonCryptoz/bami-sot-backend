const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/UserController");
const { auth, authUser } = require("../middleware/authentication");

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.put("/update-user/:id", authUser, UserController.updateUser);
router.delete("/delete-user/:id", auth, UserController.deleteUser);
router.get("/get-all-users", auth, UserController.getAllUsers);
router.get("/get-details-user/:id", authUser, UserController.getDetailsUser);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;