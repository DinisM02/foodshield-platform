import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogPosts, InsertBlogPost, products, services, InsertService, favorites, InsertFavorite, reviews, InsertReview, cartItems, InsertCartItem } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== USER QUERIES =====
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get users: database not available");
    return [];
  }

  return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteUser(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete user: database not available");
    return false;
  }

  await db.delete(users).where(eq(users.id, id));
  return true;
}

export async function updateUserProfile(userId: number, data: {
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  emailNotifications?: boolean;
  orderUpdates?: boolean;
  promotions?: boolean;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user profile: database not available");
    return undefined;
  }

  await db.update(users).set(data).where(eq(users.id, userId));
  return await getUserById(userId);
}

// ===== BLOG POST QUERIES =====
export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog posts: database not available");
    return [];
  }

  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog post: database not available");
    return undefined;
  }

  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create blog post: database not available");
    return null;
  }

  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update blog post: database not available");
    return false;
  }

  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
  return true;
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete blog post: database not available");
    return false;
  }

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return true;
}

// ===== PRODUCT QUERIES =====
export async function getAllProducts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get products: database not available");
    return [];
  }

  return await db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product: database not available");
    return undefined;
  }

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(product: typeof products.$inferInsert) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create product: database not available");
    return null;
  }

  const result = await db.insert(products).values(product);
  return result;
}

export async function updateProduct(id: number, product: Partial<typeof products.$inferInsert>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update product: database not available");
    return false;
  }

  await db.update(products).set(product).where(eq(products.id, id));
  return true;
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete product: database not available");
    return false;
  }

  await db.delete(products).where(eq(products.id, id));
  return true;
}

// ===== SERVICE QUERIES =====
export async function getAllServices() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get services: database not available");
    return [];
  }

  return await db.select().from(services).orderBy(desc(services.createdAt));
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get service: database not available");
    return undefined;
  }

  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create service: database not available");
    return null;
  }

  const result = await db.insert(services).values(service);
  return result;
}

export async function updateService(id: number, service: Partial<InsertService>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update service: database not available");
    return false;
  }

  await db.update(services).set(service).where(eq(services.id, id));
  return true;
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete service: database not available");
    return false;
  }

  await db.delete(services).where(eq(services.id, id));
  return true;
}

// ===== ORDER QUERIES =====
import { orders, orderItems, InsertOrder, InsertOrderItem } from "../drizzle/schema";

export async function createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create order: database not available");
    return null;
  }

  const orderResult = await db.insert(orders).values(order);
  
  // Get the inserted order ID
  const orderId = orderResult[0]?.insertId || (orderResult as any).insertId || (orderResult as any)[0]?.insertId;
  
  if (!orderId) {
    throw new Error('Failed to get order ID after insert');
  }

  const itemsWithOrderId = items.map(item => ({ ...item, orderId: Number(orderId) }));
  await db.insert(orderItems).values(itemsWithOrderId);

  return Number(orderId);
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user orders: database not available");
    return [];
  }

  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order: database not available");
    return null;
  }

  const orderResult = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (orderResult.length === 0) return null;

  const itemsResult = await db.select().from(orderItems).where(eq(orderItems.orderId, id));

  return {
    ...orderResult[0],
    items: itemsResult
  };
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order status: database not available");
    return false;
  }

  await db.update(orders).set({ status: status as any }).where(eq(orders.id, id));
  return true;
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get all orders: database not available");
    return [];
  }

  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

// ===== FAVORITES QUERIES =====
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(favorites).where(eq(favorites.userId, userId)).orderBy(desc(favorites.createdAt));
}

export async function addFavorite(favorite: InsertFavorite) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if already favorited
  const existing = await db.select().from(favorites)
    .where(and(
      eq(favorites.userId, favorite.userId),
      eq(favorites.itemType, favorite.itemType),
      eq(favorites.itemId, favorite.itemId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  const result = await db.insert(favorites).values(favorite);
  return { id: Number(result[0].insertId), ...favorite };
}

export async function removeFavorite(userId: number, itemType: "product" | "blog", itemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(favorites)
    .where(and(
      eq(favorites.userId, userId),
      eq(favorites.itemType, itemType),
      eq(favorites.itemId, itemId)
    ));
}

export async function isFavorited(userId: number, itemType: "product" | "blog", itemId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const result = await db.select().from(favorites)
    .where(and(
      eq(favorites.userId, userId),
      eq(favorites.itemType, itemType),
      eq(favorites.itemId, itemId)
    ))
    .limit(1);
  
  return result.length > 0;
}

// Reviews functions
export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: reviews.id,
    userId: reviews.userId,
    userName: users.name,
    rating: reviews.rating,
    comment: reviews.comment,
    createdAt: reviews.createdAt,
  })
  .from(reviews)
  .leftJoin(users, eq(reviews.userId, users.id))
  .where(eq(reviews.productId, productId))
  .orderBy(desc(reviews.createdAt));
  
  return result;
}

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if user already reviewed this product
  const existing = await db.select().from(reviews)
    .where(and(
      eq(reviews.userId, review.userId),
      eq(reviews.productId, review.productId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    throw new Error("You have already reviewed this product");
  }
  
  const result = await db.insert(reviews).values(review);
  return { id: Number(result[0].insertId), ...review };
}

export async function getProductAverageRating(productId: number): Promise<{ average: number; count: number }> {
  const db = await getDb();
  if (!db) return { average: 0, count: 0 };
  
  const result = await db.select({
    average: sql<number>`AVG(${reviews.rating})`,
    count: sql<number>`COUNT(*)`,
  })
  .from(reviews)
  .where(eq(reviews.productId, productId));
  
  return {
    average: result[0]?.average ? Number(result[0].average.toFixed(1)) : 0,
    count: result[0]?.count ? Number(result[0].count) : 0,
  };
}

// Cart functions
export async function getUserCart(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: cartItems.id,
    productId: cartItems.productId,
    quantity: cartItems.quantity,
    product: products,
  })
  .from(cartItems)
  .leftJoin(products, eq(cartItems.productId, products.id))
  .where(eq(cartItems.userId, userId));
  
  return result;
}

export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if item already in cart
  const existing = await db.select().from(cartItems)
    .where(and(
      eq(cartItems.userId, userId),
      eq(cartItems.productId, productId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    // Update quantity
    await db.update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
    return existing[0];
  }
  
  const result = await db.insert(cartItems).values({ userId, productId, quantity });
  return { id: Number(result[0].insertId), userId, productId, quantity };
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
    return;
  }
  
  await db.update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, cartItemId));
}

export async function removeFromCart(cartItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(cartItems).where(eq(cartItems.userId, userId));
}
