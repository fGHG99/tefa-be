/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `scanner` table. All the data in the column will be lost.
  - The primary key for the `toko` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `toko` table. All the data in the column will be lost.
  - The required column `orderId` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `tokoId` to the `Scanner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `Favorite_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `qrcode` DROP FOREIGN KEY `QRCode_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `scanner` DROP FOREIGN KEY `Scanner_vendorId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionhistory` DROP FOREIGN KEY `TransactionHistory_orderId_fkey`;

-- DropIndex
DROP INDEX `Toko_tokoId_key` ON `toko`;

-- AlterTable
ALTER TABLE `favorite` MODIFY `tokoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    MODIFY `tokoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `orderitem` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `produk` MODIFY `tokoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `qrcode` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `scanner` DROP COLUMN `vendorId`,
    ADD COLUMN `tokoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `toko` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `tokoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tokoId`);

-- AlterTable
ALTER TABLE `transactionhistory` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QRCode` ADD CONSTRAINT `QRCode_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scanner` ADD CONSTRAINT `Scanner_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
