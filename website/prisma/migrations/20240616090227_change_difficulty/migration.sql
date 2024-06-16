/*
  Warnings:

  - You are about to alter the column `difficulty` on the `resources` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `resources` MODIFY `difficulty` ENUM('easy', 'medium', 'hard', 'insane') NULL;
