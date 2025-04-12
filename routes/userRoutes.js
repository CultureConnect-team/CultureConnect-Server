const express = require("express");
const { getUserData } = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getUserData);

module.exports = router;
