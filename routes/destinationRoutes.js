const express = require("express");
const { getAllDestinations, addDestination } = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getAllDestinations);
router.post("/", addDestination);

module.exports = router;
