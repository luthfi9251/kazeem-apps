-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nama_lengkap` VARCHAR(100) NOT NULL,
    `aktif` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_group` VARCHAR(100) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Group_nama_group_key`(`nama_group`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `group_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Santri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `hp` VARCHAR(25) NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tgl_lhr` DATE NOT NULL,
    `foto` VARCHAR(100) NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaliSantri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `santri_id` INTEGER NOT NULL,
    `wali_id` INTEGER NOT NULL,
    `peran` ENUM('AYAH', 'IBU', 'WALI', 'lainnya') NOT NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wali` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_wali` VARCHAR(191) NOT NULL,
    `tgl_lhr` DATE NOT NULL,
    `email` VARCHAR(100) NULL,
    `hp` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Wali_email_key`(`email`),
    UNIQUE INDEX `Wali_nama_wali_tgl_lhr_key`(`nama_wali`, `tgl_lhr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelanggaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori_id` INTEGER NOT NULL,
    `kelassantri_id` INTEGER NOT NULL,
    `keterangan` TEXT NOT NULL,
    `konsekuensi` VARCHAR(191) NOT NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriPelanggaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pelanggaran` VARCHAR(191) NOT NULL,
    `kategori` ENUM('BERAT', 'SEDANG', 'RINGAN') NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `poin` INTEGER NOT NULL DEFAULT 0,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tingkat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_tingkatan` VARCHAR(100) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Tingkat_nama_tingkatan_key`(`nama_tingkatan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TahunAjar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_ta` VARCHAR(100) NOT NULL,
    `tgl_mulai` DATE NOT NULL,
    `tgl_selesai` DATE NOT NULL,
    `aktif` BOOLEAN NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TahunAjar_kode_ta_key`(`kode_ta`),
    UNIQUE INDEX `TahunAjar_tgl_mulai_tgl_selesai_key`(`tgl_mulai`, `tgl_selesai`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kelas` VARCHAR(200) NOT NULL,
    `tingkat_id` INTEGER NOT NULL,
    `keterangan` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Kelas_nama_kelas_tingkat_id_key`(`nama_kelas`, `tingkat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelasSantri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kelas_id` INTEGER NOT NULL,
    `ta_id` INTEGER NOT NULL,
    `santri_id` INTEGER NOT NULL,
    `status` ENUM('BARU', 'ULANG') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,

    UNIQUE INDEX `KelasSantri_kelas_id_ta_id_santri_id_status_key`(`kelas_id`, `ta_id`, `santri_id`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kesehatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_penyakit` VARCHAR(100) NOT NULL,
    `penanganan` TEXT NOT NULL,
    `kategori` ENUM('BERAT', 'SEDANG', 'RINGAN') NOT NULL,
    `tgl_masuk` DATETIME(3) NOT NULL,
    `tgl_keluar` DATETIME(3) NULL,
    `status` ENUM('PERAWATAN', 'SEMBUH') NOT NULL,
    `santri_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `last_update_by_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Santri` ADD CONSTRAINT `Santri_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Santri` ADD CONSTRAINT `Santri_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaliSantri` ADD CONSTRAINT `WaliSantri_santri_id_fkey` FOREIGN KEY (`santri_id`) REFERENCES `Santri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaliSantri` ADD CONSTRAINT `WaliSantri_wali_id_fkey` FOREIGN KEY (`wali_id`) REFERENCES `Wali`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaliSantri` ADD CONSTRAINT `WaliSantri_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaliSantri` ADD CONSTRAINT `WaliSantri_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wali` ADD CONSTRAINT `Wali_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wali` ADD CONSTRAINT `Wali_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wali` ADD CONSTRAINT `Wali_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelanggaran` ADD CONSTRAINT `Pelanggaran_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `KategoriPelanggaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelanggaran` ADD CONSTRAINT `Pelanggaran_kelassantri_id_fkey` FOREIGN KEY (`kelassantri_id`) REFERENCES `KelasSantri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelanggaran` ADD CONSTRAINT `Pelanggaran_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelanggaran` ADD CONSTRAINT `Pelanggaran_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KategoriPelanggaran` ADD CONSTRAINT `KategoriPelanggaran_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KategoriPelanggaran` ADD CONSTRAINT `KategoriPelanggaran_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_tingkat_id_fkey` FOREIGN KEY (`tingkat_id`) REFERENCES `Tingkat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSantri` ADD CONSTRAINT `KelasSantri_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSantri` ADD CONSTRAINT `KelasSantri_ta_id_fkey` FOREIGN KEY (`ta_id`) REFERENCES `TahunAjar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSantri` ADD CONSTRAINT `KelasSantri_santri_id_fkey` FOREIGN KEY (`santri_id`) REFERENCES `Santri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSantri` ADD CONSTRAINT `KelasSantri_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSantri` ADD CONSTRAINT `KelasSantri_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kesehatan` ADD CONSTRAINT `Kesehatan_santri_id_fkey` FOREIGN KEY (`santri_id`) REFERENCES `Santri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kesehatan` ADD CONSTRAINT `Kesehatan_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kesehatan` ADD CONSTRAINT `Kesehatan_last_update_by_id_fkey` FOREIGN KEY (`last_update_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
