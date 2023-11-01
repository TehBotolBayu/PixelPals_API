/*
  Warnings:

  - You are about to drop the column `pictureId` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "profiles_pictureId_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "pictureId",
ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_imageId_key" ON "profiles"("imageId");
