/*
  Warnings:

  - A unique constraint covering the columns `[qrCodeUrl]` on the table `QRCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `QRCode_qrCodeUrl_key` ON `QRCode`(`qrCodeUrl`);
