import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  accessLevel: mysqlEnum("accessLevel", ["free", "login", "premium"]).default("login").notNull(),
  language: varchar("language", { length: 2 }).default("pt").notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  bio: text("bio"),
  profilePicture: text("profilePicture"),
  emailNotifications: boolean("emailNotifications").default(true).notNull(),
  orderUpdates: boolean("orderUpdates").default(true).notNull(),
  promotions: boolean("promotions").default(false).notNull(),
  isFirstLogin: boolean("isFirstLogin").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const contents = mysqlTable("contents", {
  id: int("id").autoincrement().primaryKey(),
  titlePt: text("titlePt").notNull(),
  titleEn: text("titleEn").notNull(),
  descriptionPt: text("descriptionPt").notNull(),
  descriptionEn: text("descriptionEn").notNull(),
  contentType: mysqlEnum("contentType", ["article", "video", "guide", "research"]).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  accessLevel: mysqlEnum("accessLevel", ["free", "login", "premium"]).default("free").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: int("price").notNull(), // in MZN (Metical)
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  stock: int("stock").default(0).notNull(),
  sustainabilityScore: int("sustainabilityScore").default(85).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  totalAmount: int("totalAmount").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  deliveryCity: varchar("deliveryCity", { length: 100 }).notNull(),
  deliveryPhone: varchar("deliveryPhone", { length: 20 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  productName: text("productName").notNull(),
  quantity: int("quantity").notNull(),
  price: int("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  scheduledDate: timestamp("scheduledDate"),
  status: mysqlEnum("status", ["pending", "approved", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  titlePt: text("titlePt").notNull(),
  titleEn: text("titleEn").notNull(),
  excerptPt: text("excerptPt").notNull(),
  excerptEn: text("excerptEn").notNull(),
  contentPt: text("contentPt").notNull(),
  contentEn: text("contentEn").notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  readTime: int("readTime").notNull(), // in minutes
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  titlePt: text("titlePt").notNull(),
  titleEn: text("titleEn").notNull(),
  descriptionPt: text("descriptionPt").notNull(),
  descriptionEn: text("descriptionEn").notNull(),
  specialist: varchar("specialist", { length: 100 }).notNull(),
  price: int("price").notNull(), // in MZN
  priceType: mysqlEnum("priceType", ["hourly", "daily", "project"]).notNull(),
  features: text("features"), // JSON array as string
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  itemType: mysqlEnum("itemType", ["product", "blog"]).notNull(),
  itemId: int("itemId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  rating: int("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Content = typeof contents.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type Consultation = typeof consultations.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;
