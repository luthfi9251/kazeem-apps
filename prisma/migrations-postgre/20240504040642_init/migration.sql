-- CreateEnum
CREATE TYPE "PeranWali" AS ENUM ('AYAH', 'IBU', 'WALI', 'lainnya');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL,
    "nama_group" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Santri" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "hp" VARCHAR(25),
    "tempat_lahir" VARCHAR(100) NOT NULL,
    "tgl_lhr" TIMESTAMP(3) NOT NULL,
    "foto" VARCHAR(100) NOT NULL,

    CONSTRAINT "Santri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaliSantri" (
    "id" SERIAL NOT NULL,
    "santri_id" INTEGER NOT NULL,
    "wali_id" INTEGER NOT NULL,
    "peran" "PeranWali" NOT NULL,

    CONSTRAINT "WaliSantri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wali" (
    "id" SERIAL NOT NULL,
    "nama_wali" TEXT NOT NULL,
    "tgl_lhr" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "hp" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Wali_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaliSantri" ADD CONSTRAINT "WaliSantri_santri_id_fkey" FOREIGN KEY ("santri_id") REFERENCES "Santri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaliSantri" ADD CONSTRAINT "WaliSantri_wali_id_fkey" FOREIGN KEY ("wali_id") REFERENCES "Wali"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wali" ADD CONSTRAINT "Wali_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
