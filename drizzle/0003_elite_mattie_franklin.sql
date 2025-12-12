CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productId` int NOT NULL,
	`productName` text NOT NULL,
	`quantity` int NOT NULL,
	`price` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `orders` ADD `deliveryAddress` text NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `deliveryCity` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `deliveryPhone` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `paymentMethod` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `notes` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;