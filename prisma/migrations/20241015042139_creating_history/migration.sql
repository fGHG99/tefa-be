/*
  Warnings:

  - Added the required column `price` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produkTitle` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokoName` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Toko` ADD COLUMN `tokoType` ENUM('Kantin', 'Hydro', 'Koperasi') NULL;

-- AlterTable
ALTER TABLE `TransactionHistory` ADD COLUMN `orderItemId` INTEGER NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `produkTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `tokoName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
