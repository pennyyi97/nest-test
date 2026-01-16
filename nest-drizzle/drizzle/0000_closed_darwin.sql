CREATE TABLE `ProfileInfo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metadata` json,
	`userId` int,
	CONSTRAINT `ProfileInfo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(25) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `Users_id` PRIMARY KEY(`id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `ProfileInfo` ADD CONSTRAINT `ProfileInfo_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;