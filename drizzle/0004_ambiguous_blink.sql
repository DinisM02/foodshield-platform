ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `address` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `profilePicture` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emailNotifications` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `orderUpdates` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `promotions` boolean DEFAULT false NOT NULL;