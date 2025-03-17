const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

// Konfigurasi CORS
app.use(cors({
  origin: 
      "http://localhost:5173"
      || "https://culture-connect-iota.vercel.app",
  credentials: true,
}));

app.use(express.json());

// Root API Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/destinations", destinationRoutes);

// Menangani Error Server
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di port http://localhost:${PORT}`);
});
