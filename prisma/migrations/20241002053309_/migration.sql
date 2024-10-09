/*
  Warnings:

  - The values [Shipped,Delivered] on the enum `TransactionHistory_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cartId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cartId`;
