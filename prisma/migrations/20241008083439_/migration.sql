/*
  Warnings:

  - Made the column `tokoId` on table `produk` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoId_fkey`;

-- DropIndex
DROP INDEX `Produk_tokoName_fkey` ON `produk`;

-- AlterTable
ALTER TABLE `produk` MODIFY `tokoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE CASCADE ON UPDATE CASCADE;
