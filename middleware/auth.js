const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak tersedia atau tidak valid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan dari middleware" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid atau telah kedaluwarsa" });
  }
};

module.exports = verifyToken;
