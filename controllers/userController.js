const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUserData = async (req, res) => {
  try {
    const userData = await prisma.userProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });
    if (!userData) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan dari userData yang di usercontroller" });
    }

    res.json({
      message: "Berhasil mendapatkan data pengguna",
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        profilePic: userData.profilePic,
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data dashboard" });
  }
};