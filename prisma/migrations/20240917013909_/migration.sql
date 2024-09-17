/*
  Warnings:

  - The values [Shipped] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `tokoId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `tokoId` INTEGER NOT NULL,
    MODIFY `status` ENUM('Pending', 'Processing', 'Ready', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending';

-- CreateTable
CREATE TABLE `QRCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `qrCodeUrl` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `status` ENUM('active', 'expired') NOT NULL,

    UNIQUE INDEX `QRCode_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scanner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorId` INTEGER NOT NULL,
    `scannerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Scanner_scannerId_key`(`scannerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QRCode` ADD CONSTRAINT `QRCode_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scanner` ADD CONSTRAINT `Scanner_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Toko`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
