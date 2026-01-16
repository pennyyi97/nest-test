CREATE TABLE `ProfileInfo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metadata` json,
	`userId` int,
	CONSTRAINT `ProfileInfo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ProfileInfo` ADD CONSTRAINT `ProfileInfo_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;