/*
  Warnings:

  - The primary key for the `Destination` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `destinationId` on the `SavedDestination` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "SavedDestination" DROP CONSTRAINT "SavedDestination_destinationId_fkey";

-- AlterTable
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Destination_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SavedDestination" DROP COLUMN "destinationId",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SavedDestination_userId_destinationId_key" ON "SavedDestination"("userId", "destinationId");

-- AddForeignKey
ALTER TABLE "SavedDestination" ADD CONSTRAINT "SavedDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
