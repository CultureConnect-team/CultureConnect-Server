const express = require("express");
const upload = require("../config/upload");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/profile-picture", verifyToken, upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
