/*
  Warnings:

  - The values [Delivered] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('Pending', 'Processing', 'Ready', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending';
