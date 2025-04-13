const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { profilePic, bio, gender, age, address, city, province, district, village } = req.body;

    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res.status(400).json({ message: "Profil pengguna sudah ada" });
    }

    const newProfile = await prisma.userProfile.create({
      data: {
        userId,
        profilePic,
        bio,
        gender,
        age,
        address,
        city,
        province,
        district,
        village, 
      },
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error saat menambahkan profil pengguna:", error);
    res.status(500).json({ error: "Gagal menambahkan profil pengguna" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profil pengguna tidak ditemukan" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error saat mengambil profil pengguna:", error);
    res.status(500).json({ error: "Gagal mengambil profil pengguna" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profilePic, bio, gender, age, address, city, province, district, village } = req.body;

    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId },
      update: { profilePic, bio, gender, age, address, city, province, district, village },
      create: { userId, profilePic, bio, gender, age, address, city, province, district, village },
    });

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error saat memperbarui profil pengguna:", error);
    res.status(500).json({ error: "Gagal memperbarui profil pengguna" });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.userProfile.delete({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "Akun pengguna dan profil berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus akun pengguna:", error);
    res.status(500).json({ error: "Gagal menghapus akun pengguna" });
  }
};

module.exports = {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};