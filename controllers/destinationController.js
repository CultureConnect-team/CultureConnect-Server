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

exports.addDestination = async (req, res) => {
  const { name, description, location, imageUrl } = req.body;
  try {
    const newDestination = await prisma.destination.create({
      data: { name, description, location, imageUrl },
    });
    res.json(newDestination);
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan destinasi" });
  }
};
