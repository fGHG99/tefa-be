/*
  Warnings:

  - A unique constraint covering the columns `[tokoId]` on the table `Toko` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Toko_tokoId_key` ON `Toko`(`tokoId`);

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE SET NULL ON UPDATE CASCADE;
