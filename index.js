const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173"], 
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Gunakan route yang telah dipisahkan
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/destinations", destinationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di port http://localhost:${PORT}`);
});

