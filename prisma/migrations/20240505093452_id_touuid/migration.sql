/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Wali" DROP CONSTRAINT "Wali_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserGroup" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Wali" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wali" ADD CONSTRAINT "Wali_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
