const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const destinationsRoutes = require("./routes/destinationsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/destinations", destinationsRoutes);
app.use("/profile", profileRoutes);
app.use("/upload", uploadRoutes);

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

app.get("/", (req, res) => {
  res.send("<h1>Api sedang berjalan pada port atau halaman ini</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
