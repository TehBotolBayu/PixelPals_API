/*
  Warnings:

  - The primary key for the `content_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content_tag` on the `content_tags` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `content_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_tags" DROP CONSTRAINT "content_tags_content_tag_fkey";

-- AlterTable
ALTER TABLE "content_tags" DROP CONSTRAINT "content_tags_pkey",
DROP COLUMN "content_tag",
ADD COLUMN     "tag_id" INTEGER NOT NULL,
ADD CONSTRAINT "content_tags_pkey" PRIMARY KEY ("content_id", "tag_id");

-- AddForeignKey
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
