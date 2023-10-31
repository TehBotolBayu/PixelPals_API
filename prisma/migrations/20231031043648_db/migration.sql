/*
  Warnings:

  - Added the required column `imageId` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "imageId" TEXT NOT NULL;
