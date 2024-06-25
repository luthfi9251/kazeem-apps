/*
  Warnings:

  - A unique constraint covering the columns `[nis]` on the table `Santri` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nis` to the `Santri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Santri` ADD COLUMN `jenis_kel` ENUM('LAKI_LAKI', 'PEREMPUAN') NOT NULL DEFAULT 'LAKI_LAKI',
    ADD COLUMN `nis` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Santri_nis_key` ON `Santri`(`nis`);
