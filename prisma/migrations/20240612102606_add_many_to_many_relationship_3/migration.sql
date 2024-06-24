/*
  Warnings:

  - You are about to drop the `_authors_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tags_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authors_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags_link` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `authors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_authors_link` DROP FOREIGN KEY `_authors_link_A_fkey`;

-- DropForeignKey
ALTER TABLE `_authors_link` DROP FOREIGN KEY `_authors_link_B_fkey`;

-- DropForeignKey
ALTER TABLE `_tags_link` DROP FOREIGN KEY `_tags_link_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tags_link` DROP FOREIGN KEY `_tags_link_B_fkey`;

-- DropForeignKey
ALTER TABLE `authors_link` DROP FOREIGN KEY `authors_link_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `authors_link` DROP FOREIGN KEY `authors_link_resource_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags_link` DROP FOREIGN KEY `tags_link_resource_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags_link` DROP FOREIGN KEY `tags_link_tag_id_fkey`;

-- AlterTable
ALTER TABLE `authors` ADD COLUMN `resourcesId` INTEGER NULL,
    MODIFY `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `resourcesId` INTEGER NULL;

-- DropTable
DROP TABLE `_authors_link`;

-- DropTable
DROP TABLE `_tags_link`;

-- DropTable
DROP TABLE `authors_link`;

-- DropTable
DROP TABLE `tags_link`;

-- AddForeignKey
ALTER TABLE `authors` ADD CONSTRAINT `authors_resourcesId_fkey` FOREIGN KEY (`resourcesId`) REFERENCES `resources`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_resourcesId_fkey` FOREIGN KEY (`resourcesId`) REFERENCES `resources`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
