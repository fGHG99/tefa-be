/*
  Warnings:

  - Added the required column `tokoId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `tokoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
