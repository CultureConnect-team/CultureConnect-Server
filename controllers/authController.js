const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      return res.status(400).json({ email: "Akun tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ password: "Password salah" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};
