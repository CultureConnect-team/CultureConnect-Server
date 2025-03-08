exports.getDashboardData = async (req, res) => {
  try {
    console.log("User Data from Token:", req.user); // Debugging

    res.json({
      message: "Berhasil mengakses dashboard",
      user: req.user, // Pastikan req.user tersedia
      dashboardData: {
        visitors: 1000,
        revenue: 5000,
        newUsers: 50,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error); // Tambahkan debugging
    res.status(500).json({ error: "Gagal mengambil data dashboard" });
  }
};
