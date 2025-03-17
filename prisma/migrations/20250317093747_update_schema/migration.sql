/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "token",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "culinaryPreference" JSONB,
ADD COLUMN     "culturePreference" JSONB,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "groupPreference" TEXT,
ADD COLUMN     "transportPreference" TEXT,
ADD COLUMN     "travelFrequency" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
