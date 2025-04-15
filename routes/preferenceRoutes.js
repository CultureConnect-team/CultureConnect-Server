const express = require("express");
const { addPreference,getPreference } = require("../controllers/PreferenceControllers");
const router = express.Router();

router.post("/", addPreference);
router.get("/:userId", getPreference);

module.exports = router;
