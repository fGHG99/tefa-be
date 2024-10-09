/*
  Warnings:

  - You are about to drop the column `tokoId` on the `order` table. All the data in the column will be lost.
  - Added the required column `tokoName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_tokoId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `tokoId`,
    ADD COLUMN `tokoName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tokoName_fkey` FOREIGN KEY (`tokoName`) REFERENCES `Toko`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
