/*
  Warnings:

  - The values [Shipped,Delivered] on the enum `TransactionHistory_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [Shipped,Delivered] on the enum `TransactionHistory_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `transactionhistory` MODIFY `status` ENUM('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled') NOT NULL;
