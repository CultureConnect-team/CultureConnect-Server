const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addPreference = async (req, res) => {
  try {
    const { userId, kategori, deskripsi, rating } = req.body;

    if (!userId || !kategori || !deskripsi || !rating) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    const saved = await prisma.userPreference.upsert({
      where: { userId },
      update: {
        categoryPreference: JSON.stringify(kategori), 
        descriptionPreference: deskripsi,
        RatePreference: rating.toString(),
      },
      create: {
        userId,
        categoryPreference: JSON.stringify(kategori),
        descriptionPreference: deskripsi,
        RatePreference: rating.toString(),
      },
    });

    res.json({ message: "Preferensi berhasil disimpan.", data: saved });
  } catch (error) {
    console.error("Gagal menyimpan preferensi:", error.message);
    res.status(500).json({ error: "Gagal menyimpan preferensi." });
  }
};

const getPreference = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId tidak boleh kosong." });
    }

    const preference = await prisma.userPreference.findUnique({
      where: { userId },
    });

    if (!preference) {
      return res.status(404).json({ error: "Preferensi tidak ditemukan." });
    }

    res.json({ message: "Preferensi ditemukan.", data: preference });
  } catch (error) {
    console.error("Gagal mengambil preferensi:", error.message);
    res.status(500).json({ error: "Gagal mengambil preferensi." });
  }
};

module.exports = { addPreference, getPreference };
