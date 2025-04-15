const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data destinasi" });
  }
};

exports.getDestinationById = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
    });
    if (!destination) {
      return res.status(404).json({ error: "Destinasi tidak ditemukan" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data destinasi" });
  }
};

exports.addDestination = async (req, res) => {
  const { id, name, category, location, imageUrl, rating, description, coordinate } = req.body;

  try {
    const newDestination = await prisma.destination.create({
      data: { id, name, category, location, imageUrl, rating, description, coordinate },
    });
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan destinasi" });
  }
};

exports.saveDestination = async (req, res) => {
  const { userId, destinationId } = req.body;

  try {
    const existingSavedDestination = await prisma.savedDestination.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });

    if (existingSavedDestination) {
      return res.status(400).json({ error: "Destinasi sudah disimpan sebelumnya" });
    }

    const savedDestination = await prisma.savedDestination.create({
      data: { userId, destinationId },
    });
    res.status(201).json(savedDestination);
  } catch (error) {
    console.error("Error saat menyimpan destinasi:", error);
    res.status(500).json({ error: "Gagal menyimpan destinasi" });
  }
};

exports.getSavedDestinations = async (req, res) => {
  const { userId } = req.params;

  try {
    const savedDestinations = await prisma.savedDestination.findMany({
      where: { userId },
      include: { destination: true },
    });
    res.json(savedDestinations);
  } catch (error) {
    console.error("Error saat mengambil destinasi yang disimpan:", error);
    res.status(500).json({ error: "Gagal mengambil destinasi yang disimpan" });
  }
};

exports.deleteSavedDestination = async (req, res) => {
  const { userId, destinationId } = req.body;

  try {
    const deletedDestination = await prisma.savedDestination.deleteMany({
      where: {
        userId,
        destinationId,
      },
    });

    if (deletedDestination.count === 0) {
      return res.status(404).json({ error: "Destinasi yang disimpan tidak ditemukan" });
    }

    res.status(200).json({ message: "Destinasi yang disimpan berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus destinasi yang disimpan:", error);
    res.status(500).json({ error: "Gagal menghapus destinasi yang disimpan" });
  }
};