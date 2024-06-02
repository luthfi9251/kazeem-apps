/*
  Warnings:

  - Added the required column `konsekuensi` to the `Pelanggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KategoriPelanggaran" ALTER COLUMN "poin" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Pelanggaran" ADD COLUMN     "konsekuensi" TEXT NOT NULL;
