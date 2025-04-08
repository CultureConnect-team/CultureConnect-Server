const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ email : "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ email: "Email tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ password: "Password salah" });
    }

    const token = generateToken(user);

    res.json({ message: "Login berhasil", user: { id: user.id, email: user.email, name: user.name, token: token } });
  
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "None" 
  });

  return res.status(200).json({ message: "Logout berhasil, silakan hapus token di localStorage jika menggunakan penyimpanan client." });
};