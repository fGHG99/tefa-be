-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'ADMIN', 'MERCHANT') NOT NULL DEFAULT 'USER';
