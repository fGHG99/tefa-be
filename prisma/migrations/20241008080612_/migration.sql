-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoName_fkey`;

-- AlterTable
ALTER TABLE `produk` ADD COLUMN `tokoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE CASCADE ON UPDATE CASCADE;
