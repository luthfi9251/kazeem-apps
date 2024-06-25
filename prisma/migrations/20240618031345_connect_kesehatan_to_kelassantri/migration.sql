/*
  Warnings:

  - You are about to drop the column `santri_id` on the `Kesehatan` table. All the data in the column will be lost.
  - Added the required column `kelassantri_id` to the `Kesehatan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Kesehatan` DROP FOREIGN KEY `Kesehatan_santri_id_fkey`;

-- AlterTable
ALTER TABLE `Kesehatan` DROP COLUMN `santri_id`,
    ADD COLUMN `kelassantri_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Kesehatan` ADD CONSTRAINT `Kesehatan_kelassantri_id_fkey` FOREIGN KEY (`kelassantri_id`) REFERENCES `KelasSantri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
