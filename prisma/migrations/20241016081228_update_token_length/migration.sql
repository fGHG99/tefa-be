-- DropIndex
DROP INDEX `Token_token_key` ON `token`;

-- AlterTable
ALTER TABLE `token` MODIFY `token` VARCHAR(1024) NOT NULL;
