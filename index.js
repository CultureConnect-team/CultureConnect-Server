const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Ambil semua destinasi wisata
app.get("/destinations", async (req, res) => {
  const destinations = await prisma.destination.findMany();
  res.json(destinations);
});

// Tambah destinasi wisata
app.post("/destinations", async (req, res) => {
  const { name, description, location, imageUrl } = req.body;
  const newDestination = await prisma.destination.create({
    data: { name, description, location, imageUrl },
  });
  res.json(newDestination);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
