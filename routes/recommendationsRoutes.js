const express = require("express");
const { recommendationControllers } = require("../controllers/recommendationsController");

const router = express.Router();

router.post("/", recommendationControllers);

module.exports = router;
