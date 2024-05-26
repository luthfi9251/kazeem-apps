-- CreateEnum
CREATE TYPE "StatusKelas" AS ENUM ('BARU', 'ULANG');

-- CreateTable
CREATE TABLE "TingkatanKelas" (
    "id" SERIAL NOT NULL,
    "tingkatan" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "TingkatanKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParalelKelas" (
    "id" SERIAL NOT NULL,
    "paralel" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "ParalelKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TahunAkademik" (
    "id" SERIAL NOT NULL,
    "tahun_mulai" INTEGER NOT NULL,
    "tahun_berakhir" INTEGER NOT NULL,
    "aktif" BOOLEAN NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TahunAkademik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KelasAkademik" (
    "id" SERIAL NOT NULL,
    "tingkatan_id" INTEGER NOT NULL,
    "paralel_id" INTEGER NOT NULL,
    "ta_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "KelasAkademik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KelasSantri" (
    "id" SERIAL NOT NULL,
    "kelas_id" INTEGER NOT NULL,
    "santri_id" INTEGER NOT NULL,
    "status" "StatusKelas" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,
    "last_update_by_id" TEXT,

    CONSTRAINT "KelasSantri_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TingkatanKelas_tingkatan_key" ON "TingkatanKelas"("tingkatan");

-- CreateIndex
CREATE UNIQUE INDEX "ParalelKelas_paralel_key" ON "ParalelKelas"("paralel");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAkademik_tahun_mulai_tahun_berakhir_aktif_key" ON "TahunAkademik"("tahun_mulai", "tahun_berakhir", "aktif");

-- CreateIndex
CREATE UNIQUE INDEX "KelasAkademik_tingkatan_id_paralel_id_ta_id_key" ON "KelasAkademik"("tingkatan_id", "paralel_id", "ta_id");

-- CreateIndex
CREATE UNIQUE INDEX "KelasSantri_kelas_id_santri_id_status_key" ON "KelasSantri"("kelas_id", "santri_id", "status");

-- AddForeignKey
ALTER TABLE "KelasAkademik" ADD CONSTRAINT "KelasAkademik_tingkatan_id_fkey" FOREIGN KEY ("tingkatan_id") REFERENCES "TingkatanKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasAkademik" ADD CONSTRAINT "KelasAkademik_paralel_id_fkey" FOREIGN KEY ("paralel_id") REFERENCES "ParalelKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasAkademik" ADD CONSTRAINT "KelasAkademik_ta_id_fkey" FOREIGN KEY ("ta_id") REFERENCES "TahunAkademik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasAkademik" ADD CONSTRAINT "KelasAkademik_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasAkademik" ADD CONSTRAINT "KelasAkademik_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "KelasAkademik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_santri_id_fkey" FOREIGN KEY ("santri_id") REFERENCES "Santri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelasSantri" ADD CONSTRAINT "KelasSantri_last_update_by_id_fkey" FOREIGN KEY ("last_update_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
