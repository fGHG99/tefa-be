/*
  Warnings:

  - The values [Barang,Lainnya] on the enum `Produk_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `tokoId` to the `Toko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` MODIFY `type` ENUM('Makanan', 'Minuman') NOT NULL;

-- AlterTable
ALTER TABLE `toko` ADD COLUMN `tokoId` INTEGER NOT NULL;
