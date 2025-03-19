const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Unauthorized: Silakan login terlebih dahulu." });
  }

  req.user = req.session.user; // Menyimpan user di req agar bisa digunakan di controller
  next();
};

module.exports = authenticateUser;
