const express = require("express");
const {
  getAllDestinations,
  getDestinationById,
  addDestination,
  saveDestination,
  getSavedDestinations,
  deleteSavedDestination,
} = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getAllDestinations);

router.get("/:id", getDestinationById);

router.post("/", addDestination);

router.post("/save", saveDestination);

router.get("/saved/:userId", getSavedDestinations);

router.delete("/saved/delete", deleteSavedDestination);

module.exports = router;