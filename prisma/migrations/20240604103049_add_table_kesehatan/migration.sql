-- CreateEnum
CREATE TYPE "StatusKesehatan" AS ENUM ('PERAWATAN', 'SEMBUH');

-- CreateTable
CREATE TABLE "Kesehatan" (
    "id" SERIAL NOT NULL,
    "nama_penyakit" VARCHAR(100) NOT NULL,
    "penanganan" TEXT NOT NULL,
    "kategori" "Kategori" NOT NULL,
    "tgl_masuk" TIMESTAMP(3) NOT NULL,
    "tgl_keluar" TIMESTAMP(3) NOT NULL,
    "status" "StatusKesehatan" NOT NULL,
    "santri_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "Kesehatan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kesehatan" ADD CONSTRAINT "Kesehatan_santri_id_fkey" FOREIGN KEY ("santri_id") REFERENCES "Santri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kesehatan" ADD CONSTRAINT "Kesehatan_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kesehatan" ADD CONSTRAINT "Kesehatan_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
