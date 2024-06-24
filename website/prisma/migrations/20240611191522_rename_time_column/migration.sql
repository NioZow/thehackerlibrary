-- CreateTable
CREATE TABLE `authors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authors_link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` INTEGER NULL,
    `resource_id` INTEGER NULL,

    INDEX `author_id`(`author_id`),
    INDEX `resource_id`(`resource_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(10) NULL,
    `name` VARCHAR(150) NULL,
    `date` VARCHAR(11) NULL,
    `url` VARCHAR(150) NULL,
    `price` SMALLINT NULL,
    `difficulty` TINYINT NULL,
    `time` SMALLINT NULL,

    UNIQUE INDEX `url`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_id` INTEGER NULL,
    `resource_id` INTEGER NULL,

    INDEX `resource_id`(`resource_id`),
    INDEX `tag_id`(`tag_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authors_link` ADD CONSTRAINT `authors_link_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `authors_link` ADD CONSTRAINT `authors_link_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tags_link` ADD CONSTRAINT `tags_link_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tags_link` ADD CONSTRAINT `tags_link_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
