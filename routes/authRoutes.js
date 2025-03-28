const express = require("express");
const { register, login, logout, checkAuth } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
