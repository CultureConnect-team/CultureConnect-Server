const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const recommendationControllers = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; 

    if (!userId) {
      return res.status(400).json({ error: "userId diperlukan." });
    }

    const userPreference = await prisma.userPreference.findUnique({
      where: { userId },
    });

    if (!userPreference) {
      return res.status(404).json({ error: "Preferensi belum disimpan untuk user ini." });
    }

    const { categoryPreference, descriptionPreference, RatePreference } = userPreference;

    const response = await axios.post(process.env.MACHINE_LEARNING_URL, {
      kategori: JSON.parse(categoryPreference), 
      deskripsi: descriptionPreference,
      rating: parseFloat(RatePreference),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error saat mengambil rekomendasi:", error.message);
    res.status(500).json({ error: "Gagal mengambil rekomendasi dari model ML." });
  }
};

module.exports = { recommendationControllers };
