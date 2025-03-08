const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Akses ditolak, token tidak tersedia" });
  }

  // Ambil token dari header
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Format token salah" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debug token

    req.user = decoded; // Pastikan req.user diset dengan benar
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ error: "Token tidak valid" });
  }
};

module.exports = authenticateUser;
