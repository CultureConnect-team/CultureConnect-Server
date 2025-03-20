exports.getDashboardData = async (req, res) => {
  try {
    res.json({
      message: "Berhasil mengakses dashboard",
      user: req.user,
      dashboardData: {
        visitors: 1000,
        revenue: 5000,
        newUsers: 50,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data dashboard" });
  }
};
