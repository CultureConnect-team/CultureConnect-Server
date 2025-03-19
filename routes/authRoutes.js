const express = require("express");
const { register, login, logout, checkAuth} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", checkAuth);
router.post("/logout", logout);

module.exports = router;
