/*
  Warnings:

  - You are about to drop the column `tokoName` on the `order` table. All the data in the column will be lost.
  - Added the required column `tokoId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_tokoName_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `tokoName`,
    ADD COLUMN `tokoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
