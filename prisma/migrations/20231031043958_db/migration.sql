/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `contents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contents_imageId_key" ON "contents"("imageId");
