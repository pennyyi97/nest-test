CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`text` varchar(255) NOT NULL,
	`authorId` int,
	`postId` int,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Groups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `UsersToGroups` (
	`userId` int NOT NULL,
	`groupId` int NOT NULL,
	CONSTRAINT `UsersToGroups_userId_groupId_pk` PRIMARY KEY(`userId`,`groupId`)
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_authorId_Users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_postId_Posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UsersToGroups` ADD CONSTRAINT `UsersToGroups_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UsersToGroups` ADD CONSTRAINT `UsersToGroups_groupId_Groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `Groups`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userIdIndex` ON `UsersToGroups` (`userId`);