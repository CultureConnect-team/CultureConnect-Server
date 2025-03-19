const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ email: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Registrasi berhasil", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
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

    req.session.user = { id: user.id, email: user.email, name: user.name }; // Simpan user di session
    console.log("Session saved:", req.session);

    res.json({ message: "Login berhasil", user: req.session.user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
};


exports.checkAuth = (req, res) => {
  if (req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  }
  res.json({ isAuthenticated: false });
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout berhasil" });
  });
};