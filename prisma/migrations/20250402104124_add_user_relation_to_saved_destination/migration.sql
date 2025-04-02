/*
  Warnings:

  - A unique constraint covering the columns `[userId,destinationId]` on the table `SavedDestination` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedDestination_userId_destinationId_key" ON "SavedDestination"("userId", "destinationId");
