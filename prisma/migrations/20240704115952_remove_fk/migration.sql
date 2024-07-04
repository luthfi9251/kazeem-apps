-- DropForeignKey
ALTER TABLE `PageAccess` DROP FOREIGN KEY `PageAccess_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `PageAccess` DROP FOREIGN KEY `PageAccess_page_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserGroup` DROP FOREIGN KEY `UserGroup_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserGroup` DROP FOREIGN KEY `UserGroup_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `PageAccess` ADD CONSTRAINT `PageAccess_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageAccess` ADD CONSTRAINT `PageAccess_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
