/*
  Warnings:

  - The primary key for the `authors_link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `authors_link` table. All the data in the column will be lost.
  - The primary key for the `tags_link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags_link` table. All the data in the column will be lost.
  - Made the column `author_id` on table `authors_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resource_id` on table `authors_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tag_id` on table `tags_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resource_id` on table `tags_link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `authors_link` DROP FOREIGN KEY `authors_link_ibfk_1`;

-- DropForeignKey
ALTER TABLE `authors_link` DROP FOREIGN KEY `authors_link_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tags_link` DROP FOREIGN KEY `tags_link_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tags_link` DROP FOREIGN KEY `tags_link_ibfk_2`;

-- AlterTable
ALTER TABLE `authors_link` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `author_id` INTEGER NOT NULL,
    MODIFY `resource_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`resource_id`, `author_id`);

-- AlterTable
ALTER TABLE `tags_link` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `tag_id` INTEGER NOT NULL,
    MODIFY `resource_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`resource_id`, `tag_id`);

-- CreateTable
CREATE TABLE `_authors_link` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_authors_link_AB_unique`(`A`, `B`),
    INDEX `_authors_link_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_tags_link` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_tags_link_AB_unique`(`A`, `B`),
    INDEX `_tags_link_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authors_link` ADD CONSTRAINT `authors_link_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `authors_link` ADD CONSTRAINT `authors_link_resource_id_fkey` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_link` ADD CONSTRAINT `tags_link_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_link` ADD CONSTRAINT `tags_link_resource_id_fkey` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authors_link` ADD CONSTRAINT `_authors_link_A_fkey` FOREIGN KEY (`A`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authors_link` ADD CONSTRAINT `_authors_link_B_fkey` FOREIGN KEY (`B`) REFERENCES `resources`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tags_link` ADD CONSTRAINT `_tags_link_A_fkey` FOREIGN KEY (`A`) REFERENCES `resources`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tags_link` ADD CONSTRAINT `_tags_link_B_fkey` FOREIGN KEY (`B`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
