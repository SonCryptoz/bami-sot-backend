const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/UserController");

router.post("/", UserController.createUser);

module.exports = router;