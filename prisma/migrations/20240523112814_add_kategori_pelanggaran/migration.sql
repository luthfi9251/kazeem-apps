-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('BERAT', 'SEDANG', 'RINGAN');

-- CreateTable
CREATE TABLE "KategoriPelanggaran" (
    "id" SERIAL NOT NULL,
    "nama_pelanggaran" TEXT NOT NULL,
    "kategori" "Kategori" NOT NULL,
    "jenis" TEXT NOT NULL,
    "poin" INTEGER NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriPelanggaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KategoriPelanggaran" ADD CONSTRAINT "KategoriPelanggaran_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KategoriPelanggaran" ADD CONSTRAINT "KategoriPelanggaran_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
