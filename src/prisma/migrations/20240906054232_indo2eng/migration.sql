/*
  Warnings:

  - You are about to drop the column `harga` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `jenis` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `namaProduk` on the `produk` table. All the data in the column will be lost.
  - Added the required column `imgUrl` to the `Produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `harga`,
    DROP COLUMN `img`,
    DROP COLUMN `jenis`,
    DROP COLUMN `namaProduk`,
    ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
