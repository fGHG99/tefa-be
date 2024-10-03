/*
  Warnings:

  - The values [Makanan,Minuman] on the enum `Produk_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `produk` MODIFY `type` ENUM('Food', 'Beverage') NOT NULL;

-- DropTable
DROP TABLE `refreshtoken`;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
