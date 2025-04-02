/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;

-- DropTable
DROP TABLE "Session";
