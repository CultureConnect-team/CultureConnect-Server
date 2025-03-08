const express = require("express");
const authenticateUser = require("../middleware/auth");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", authenticateUser, getDashboardData);

module.exports = router;
