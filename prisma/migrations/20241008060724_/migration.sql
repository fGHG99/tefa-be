/*
  Warnings:

  - You are about to drop the column `tokoId` on the `produk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Toko` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_tokoId_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `tokoId`,
    ADD COLUMN `tokoName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Toko_name_key` ON `Toko`(`name`);

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_tokoName_fkey` FOREIGN KEY (`tokoName`) REFERENCES `Toko`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
