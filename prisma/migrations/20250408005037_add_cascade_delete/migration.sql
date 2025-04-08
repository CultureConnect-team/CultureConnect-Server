/*
  Warnings:

  - You are about to drop the column `culinaryPreference` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `culturePreference` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `groupPreference` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `transportPreference` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `travelFrequency` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "culinaryPreference",
DROP COLUMN "culturePreference",
DROP COLUMN "groupPreference",
DROP COLUMN "transportPreference",
DROP COLUMN "travelFrequency";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
