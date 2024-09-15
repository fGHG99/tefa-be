/*
  Warnings:

  - You are about to drop the column `expired` on the `produk` table. All the data in the column will be lost.
  - Added the required column `img` to the `Produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis` to the `Produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `expired`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenis` VARCHAR(191) NOT NULL;
