/*
  Warnings:

  - You are about to drop the column `culinaryPreference` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `culturePreference` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `groupPreference` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `transportPreference` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `travelFrequency` on the `UserPreference` table. All the data in the column will be lost.
  - Added the required column `RatePreference` to the `UserPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryPreference` to the `UserPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionPreference` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "culinaryPreference",
DROP COLUMN "culturePreference",
DROP COLUMN "groupPreference",
DROP COLUMN "transportPreference",
DROP COLUMN "travelFrequency",
ADD COLUMN     "RatePreference" TEXT NOT NULL,
ADD COLUMN     "categoryPreference" TEXT NOT NULL,
ADD COLUMN     "descriptionPreference" TEXT NOT NULL;
