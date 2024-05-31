-- CreateTable
CREATE TABLE "Pelanggaran" (
    "id" SERIAL NOT NULL,
    "kategori_id" INTEGER NOT NULL,
    "kelassantri_id" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "last_update_by_id" TEXT,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pelanggaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pelanggaran" ADD CONSTRAINT "Pelanggaran_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "KategoriPelanggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelanggaran" ADD CONSTRAINT "Pelanggaran_kelassantri_id_fkey" FOREIGN KEY ("kelassantri_id") REFERENCES "KelasSantri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelanggaran" ADD CONSTRAINT "Pelanggaran_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelanggaran" ADD CONSTRAINT "Pelanggaran_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
