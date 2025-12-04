import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogPosts, InsertBlogPost, products, services, InsertService } from "../drizzle/schema";
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
