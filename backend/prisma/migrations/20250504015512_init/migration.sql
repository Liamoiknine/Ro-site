-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `images` JSON NOT NULL,
    `price` DOUBLE NOT NULL,
    `category` ENUM('NECKLACE', 'BRACELET', 'RING', 'EARRINGS', 'OTHER') NOT NULL DEFAULT 'OTHER',
    `description` VARCHAR(191) NOT NULL,
    `details` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
