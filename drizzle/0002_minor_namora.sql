CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titlePt` text NOT NULL,
	`titleEn` text NOT NULL,
	`excerptPt` text NOT NULL,
	`excerptEn` text NOT NULL,
	`contentPt` text NOT NULL,
	`contentEn` text NOT NULL,
	`author` varchar(100) NOT NULL,
	`category` varchar(100) NOT NULL,
	`imageUrl` text NOT NULL,
	`readTime` int NOT NULL,
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titlePt` text NOT NULL,
	`titleEn` text NOT NULL,
	`descriptionPt` text NOT NULL,
	`descriptionEn` text NOT NULL,
	`specialist` varchar(100) NOT NULL,
	`price` int NOT NULL,
	`priceType` enum('hourly','daily','project') NOT NULL,
	`features` text,
	`available` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
