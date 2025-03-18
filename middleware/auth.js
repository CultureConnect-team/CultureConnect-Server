const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  else if (req.header("Authorization") && req.header("Authorization").startsWith("Bearer ")) {
    token = req.header("Authorization").split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Token tidak tersedia" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ error: "Token tidak valid atau kedaluwarsa" });
  }
};

module.exports = authenticateUser;
