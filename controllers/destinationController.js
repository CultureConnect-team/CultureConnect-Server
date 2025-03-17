const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    if (destinations.length === 0) {
      return res.status(404).json({ message: "Tidak ada destinasi tersedia" });
    }
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Gagal mengambil data destinasi" });
  }
};

exports.addDestination = async (req, res) => {
  const { name, description, location, imageUrl } = req.body;
  try {
    const newDestination = await prisma.destination.create({
      data: { name, description, location, imageUrl },
    });
    res.status(201).json(newDestination);
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ error: "Gagal menambahkan destinasi" });
  }
};
