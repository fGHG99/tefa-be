/*
  Warnings:

  - The values [MERCHANT] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[sellerId]` on the table `Toko` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerId` to the `Toko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `toko` ADD COLUMN `adminFee` DOUBLE NULL,
    ADD COLUMN `rating` DOUBLE NULL,
    ADD COLUMN `sellerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `joinedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `rating` DOUBLE NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('USER', 'ADMIN', 'SELLER') NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `Toko_sellerId_key` ON `Toko`(`sellerId`);

-- AddForeignKey
ALTER TABLE `Toko` ADD CONSTRAINT `Toko_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
