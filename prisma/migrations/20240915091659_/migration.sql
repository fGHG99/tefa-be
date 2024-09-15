-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tokoId` INTEGER NOT NULL,
    `favId` INTEGER NOT NULL,

    UNIQUE INDEX `Favorite_favId_key`(`favId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
