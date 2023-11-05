/*
  Warnings:

  - You are about to drop the column `name` on the `contents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `contents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "name",
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "content_tags" (
    "content_id" INTEGER NOT NULL,
    "content_tag" INTEGER NOT NULL,

    CONSTRAINT "content_tags_pkey" PRIMARY KEY ("content_id","content_tag")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contents_user_id_key" ON "contents"("user_id");

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_content_tag_fkey" FOREIGN KEY ("content_tag") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
