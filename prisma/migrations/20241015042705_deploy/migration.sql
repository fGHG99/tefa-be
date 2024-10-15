/*
  Warnings:

  - You are about to drop the column `TokoType` on the `Toko` table. All the data in the column will be lost.
  - You are about to drop the `TransactionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TransactionHistory` DROP FOREIGN KEY `TransactionHistory_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionHistory` DROP FOREIGN KEY `TransactionHistory_orderItemId_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionHistory` DROP FOREIGN KEY `TransactionHistory_userId_fkey`;

-- AlterTable
ALTER TABLE `Toko` DROP COLUMN `TokoType`,
    ADD COLUMN `tokoType` ENUM('Kantin', 'Hydro', 'Koperasi') NULL;

-- DropTable
DROP TABLE `TransactionHistory`;

-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `produkTitle` VARCHAR(191) NOT NULL,
    `tokoName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` ENUM('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled') NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `orderItemId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
