const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const errors = {};

    if (!name) errors.name = "Nama wajib diisi";
    if (!email) errors.email = "Email wajib diisi";
    if (!password) errors.password = "Password wajib diisi";
    if (password && password.length < 6) errors.password = "Password minimal 6 karakter";

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) errors.email = "Email sudah digunakan";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errors = {};

    if (!email) errors.email = "Email wajib diisi";
    if (!password) errors.password = "Password wajib diisi";

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) errors.email = "Akun tidak ditemukan";

    if (user && !(await bcrypt.compare(password, user.password))) {
      errors.password = "Password salah";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};
