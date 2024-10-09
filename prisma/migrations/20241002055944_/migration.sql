/*
  Warnings:

  - You are about to drop the `_chatroomuser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_chatroomuser` DROP FOREIGN KEY `_ChatRoomUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_chatroomuser` DROP FOREIGN KEY `_ChatRoomUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_produkId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropTable
DROP TABLE `_chatroomuser`;

-- DropTable
DROP TABLE `chatroom`;

-- DropTable
DROP TABLE `message`;
