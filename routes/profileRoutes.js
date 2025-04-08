const express = require("express");
const { addUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/profileController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, addUserProfile);
router.get("/", verifyToken, getUserProfile);
router.put("/", verifyToken, updateUserProfile);
router.delete("/", verifyToken, deleteUserProfile);

module.exports = router;