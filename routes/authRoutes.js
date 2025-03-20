const express = require("express");
const { register, login, logout, checkAuth } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
const logoutToken = require("../middleware/auth");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/check", verifyToken, checkAuth);
router.post("/logout", logout);

module.exports = router;
