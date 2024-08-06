-- AlterTable
ALTER TABLE `Pelanggaran` ADD COLUMN `berkas_penunjang` VARCHAR(191) NULL,
    MODIFY `konsekuensi` TEXT NOT NULL;
