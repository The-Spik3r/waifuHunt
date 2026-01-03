CREATE TABLE `votes` (
	`id` varchar(36) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`waifuId` varchar(36) NOT NULL,
	`value` tinyint NOT NULL DEFAULT 1,
	`source` varchar(32) NOT NULL DEFAULT 'normal',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `waifus` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`imageUrl` varchar(1024) NOT NULL,
	`source` varchar(255),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `waifus_id` PRIMARY KEY(`id`),
	CONSTRAINT `waifus_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `user` ADD `username` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD `displayUsername` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `votes_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `votes_waifuId_waifus_id_fk` FOREIGN KEY (`waifuId`) REFERENCES `waifus`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `votes_waifu_idx` ON `votes` (`waifuId`);--> statement-breakpoint
CREATE INDEX `votes_user_idx` ON `votes` (`userId`);--> statement-breakpoint
CREATE INDEX `votes_waifu_user_idx` ON `votes` (`waifuId`,`userId`);--> statement-breakpoint
CREATE INDEX `votes_created_idx` ON `votes` (`createdAt`);--> statement-breakpoint
CREATE INDEX `waifus_slug_idx` ON `waifus` (`slug`);