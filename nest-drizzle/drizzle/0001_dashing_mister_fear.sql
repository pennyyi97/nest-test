CREATE TABLE `Posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`authorId` int,
	CONSTRAINT `Posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `ProfileInfo`;--> statement-breakpoint
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_Users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;