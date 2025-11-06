CREATE TABLE `consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`scheduledDate` timestamp,
	`status` enum('pending','approved','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titlePt` text NOT NULL,
	`titleEn` text NOT NULL,
	`descriptionPt` text NOT NULL,
	`descriptionEn` text NOT NULL,
	`contentType` enum('article','video','guide','research') NOT NULL,
	`category` varchar(100) NOT NULL,
	`imageUrl` text NOT NULL,
	`accessLevel` enum('free','login','premium') NOT NULL DEFAULT 'free',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalAmount` int NOT NULL,
	`status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`imageUrl` text NOT NULL,
	`stock` int NOT NULL DEFAULT 0,
	`sustainabilityScore` int NOT NULL DEFAULT 85,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `accessLevel` enum('free','login','premium') DEFAULT 'login' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `language` varchar(2) DEFAULT 'pt' NOT NULL;