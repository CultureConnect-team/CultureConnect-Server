const { PrismaClient } = require("@prisma/client");
const { destinations } = require("../../client/src/data/destinations");

const prisma = new PrismaClient();

const seedDestinations = async () => {
  try {
    for (const destination of destinations) {
      await prisma.destination.create({
        data: {
          name: destination.name,
          category: destination.category,
          location: destination.location,
          imageUrl: destination.image,
          rating: destination.rating,
          description: destination.description,
          coordinate: destination.coordinate,
        },
      });
    }
    console.log("Data destinasi berhasil dimasukkan ke database.");
  } catch (error) {
    console.error("Gagal memasukkan data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDestinations();