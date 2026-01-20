CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titlePt` text NOT NULL,
	`titleEn` text NOT NULL,
	`descriptionPt` text NOT NULL,
	`descriptionEn` text NOT NULL,
	`location` text NOT NULL,
	`eventDate` timestamp NOT NULL,
	`imageUrl` text,
	`category` varchar(100) NOT NULL,
	`organizerName` text NOT NULL,
	`maxParticipants` int,
	`registrationDeadline` timestamp,
	`status` enum('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titlePt` text NOT NULL,
	`titleEn` text NOT NULL,
	`contentPt` text NOT NULL,
	`contentEn` text NOT NULL,
	`summaryPt` text NOT NULL,
	`summaryEn` text NOT NULL,
	`imageUrl` text,
	`category` varchar(100) NOT NULL,
	`author` text NOT NULL,
	`source` text,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
