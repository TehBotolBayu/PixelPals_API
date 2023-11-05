/*
  Warnings:

  - A unique constraint covering the columns `[pictureId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "pictureId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_pictureId_key" ON "profiles"("pictureId");
