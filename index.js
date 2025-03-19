const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const destinationRoutes = require("./routes/destinationRoutes");


// Middleware untuk parsing JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi CORS
app.use(
  cors({
    origin: [process.env.CLIENT_URL , "http://localhost:5173"],
    credentials: true,
  })
);

// Konfigurasi Session
app.use(
  session({
    secret: process.env.JWT_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 menit
      dbRecordIdIsSessionId: true,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    },
  })
);

// Route Utama
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/destinations", destinationRoutes);

// Middleware Error Handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
