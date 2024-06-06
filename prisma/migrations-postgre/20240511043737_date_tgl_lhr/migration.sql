/*
  Warnings:

  - You are about to alter the column `email` on the `Wali` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[nama_group]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Wali` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_wali,tgl_lhr]` on the table `Wali` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Wali" DROP CONSTRAINT "Wali_user_id_fkey";

-- AlterTable
ALTER TABLE "Santri" ALTER COLUMN "tgl_lhr" SET DATA TYPE DATE,
ALTER COLUMN "foto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wali" ALTER COLUMN "tgl_lhr" SET DATA TYPE DATE,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_nama_group_key" ON "Group"("nama_group");

-- CreateIndex
CREATE UNIQUE INDEX "Wali_email_key" ON "Wali"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wali_nama_wali_tgl_lhr_key" ON "Wali"("nama_wali", "tgl_lhr");

-- AddForeignKey
ALTER TABLE "Wali" ADD CONSTRAINT "Wali_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
