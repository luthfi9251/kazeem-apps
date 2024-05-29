/*
  Warnings:

  - You are about to drop the `KelasAkademik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParalelKelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TahunAkademik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TingkatanKelas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kelas_id,ta_id,santri_id,status]` on the table `KelasSantri` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ta_id` to the `KelasSantri` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KelasAkademik" DROP CONSTRAINT "KelasAkademik_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "KelasAkademik" DROP CONSTRAINT "KelasAkademik_last_update_by_id_fkey";

-- DropForeignKey
ALTER TABLE "KelasAkademik" DROP CONSTRAINT "KelasAkademik_paralel_id_fkey";

-- DropForeignKey
ALTER TABLE "KelasAkademik" DROP CONSTRAINT "KelasAkademik_ta_id_fkey";

-- DropForeignKey
ALTER TABLE "KelasAkademik" DROP CONSTRAINT "KelasAkademik_tingkatan_id_fkey";

-- DropForeignKey
ALTER TABLE "KelasSantri" DROP CONSTRAINT "KelasSantri_kelas_id_fkey";

-- DropIndex
DROP INDEX "KelasSantri_kelas_id_santri_id_status_key";

-- AlterTable
ALTER TABLE "KelasSantri" ADD COLUMN     "ta_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "KelasAkademik";

-- DropTable
DROP TABLE "ParalelKelas";

-- DropTable
DROP TABLE "TahunAkademik";

-- DropTable
DROP TABLE "TingkatanKelas";

-- CreateTable
CREATE TABLE "Tingkat" (
    "id" SERIAL NOT NULL,
    "nama_tingkatan" VARCHAR(100) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "Tingkat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TahunAjar" (
    "id" SERIAL NOT NULL,
    "kode_ta" VARCHAR(100) NOT NULL,
    "tgl_mulai" DATE NOT NULL,
    "tgl_selesai" DATE NOT NULL,
    "aktif" BOOLEAN NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TahunAjar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" SERIAL NOT NULL,
    "nama_kelas" VARCHAR(200) NOT NULL,
    "tingkat_id" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tingkat_nama_tingkatan_key" ON "Tingkat"("nama_tingkatan");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAjar_kode_ta_key" ON "TahunAjar"("kode_ta");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAjar_tgl_mulai_tgl_selesai_key" ON "TahunAjar"("tgl_mulai", "tgl_selesai");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_nama_kelas_tingkat_id_key" ON "Kelas"("nama_kelas", "tingkat_id");

-- CreateIndex
CREATE UNIQUE INDEX "KelasSantri_kelas_id_ta_id_santri_id_status_key" ON "KelasSantri"("kelas_id", "ta_id", "santri_id", "status");

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_tingkat_id_fkey" FOREIGN KEY ("tingkat_id") REFERENCES "Tingkat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_ta_id_fkey" FOREIGN KEY ("ta_id") REFERENCES "TahunAjar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
