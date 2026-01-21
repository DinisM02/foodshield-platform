import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema";
import { getDb } from "./db";
import {
  getAllUsers,
  deleteUser,
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  updateUserProfile,
  getUserFavorites,
  addFavorite,
  removeFavorite,
  isFavorited,
  getProductReviews,
  createReview,
  getProductAverageRating,
  getUserCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    markWelcomeSeen: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      await db.update(users).set({ isFirstLogin: false }).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),
  }),

  // ===== ADMIN USERS MANAGEMENT =====
  admin: router({
    users: router({
      list: adminProcedure.query(async () => {
        return await getAllUsers();
      }),
      create: adminProcedure
        .input(
          z.object({
            name: z.string(),
            email: z.string().email(),
            role: z.enum(["user", "admin"]).optional(),
          })
        )
        .mutation(async ({ input }) => {
          return { success: true, id: Math.random() };
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            name: z.string().optional(),
            role: z.enum(["user", "admin"]).optional(),
          })
        )
        .mutation(async ({ input }) => {
          return { success: true };
        }),
      delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        const success = await deleteUser(input.id);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete user" });
        }
        return { success: true };
      }),
    }),

    // ===== ADMIN BLOG MANAGEMENT =====
    blog: router({
      list: adminProcedure.query(async () => {
        return await getAllBlogPosts();
      }),
      get: adminProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        return await getBlogPostById(input.id);
      }),
      create: adminProcedure
        .input(
          z.object({
            titlePt: z.string(),
            titleEn: z.string(),
            excerptPt: z.string(),
            excerptEn: z.string(),
            contentPt: z.string(),
            contentEn: z.string(),
            author: z.string(),
            category: z.string(),
            imageUrl: z.string(),
            readTime: z.number(),
            published: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const result = await createBlogPost({
            ...input,
            published: input.published ?? false,
          });
          return result;
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            titlePt: z.string().optional(),
            titleEn: z.string().optional(),
            excerptPt: z.string().optional(),
            excerptEn: z.string().optional(),
            contentPt: z.string().optional(),
            contentEn: z.string().optional(),
            author: z.string().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            readTime: z.number().optional(),
            published: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          const success = await updateBlogPost(id, data);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update blog post" });
          }
          return { success: true };
        }),
      delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        const success = await deleteBlogPost(input.id);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete blog post" });
        }
        return { success: true };
      }),
    }),

    // ===== ADMIN PRODUCTS MANAGEMENT =====
    products: router({
      uploadImage: adminProcedure
        .input(
          z.object({
            file: z.string(), // base64 encoded image
            filename: z.string(),
            contentType: z.string(),
          })
        )
        .mutation(async ({ input }) => {
          const { storagePut } = await import("./storage");
          
          // Convert base64 to buffer
          const base64Data = input.file.split(',')[1] || input.file;
          const buffer = Buffer.from(base64Data, 'base64');
          
          // Generate unique filename
          const timestamp = Date.now();
          const randomSuffix = Math.random().toString(36).substring(2, 8);
          const ext = input.filename.split('.').pop() || 'jpg';
          const key = `products/${timestamp}-${randomSuffix}.${ext}`;
          
          // Upload to S3
          const { url } = await storagePut(key, buffer, input.contentType);
          
          return { url, key };
        }),
      list: adminProcedure.query(async () => {
        return await getAllProducts();
      }),
      get: adminProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        return await getProductById(input.id);
      }),
      create: adminProcedure
        .input(
          z.object({
            name: z.string(),
            description: z.string(),
            price: z.number(),
            category: z.string(),
            imageUrl: z.string(),
            stock: z.number().optional(),
            sustainabilityScore: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const result = await createProduct({
            ...input,
            stock: input.stock ?? 0,
            sustainabilityScore: input.sustainabilityScore ?? 85,
          });
          return result;
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            name: z.string().optional(),
            description: z.string().optional(),
            price: z.number().optional(),
            category: z.string().optional(),
            imageUrl: z.string().optional(),
            stock: z.number().optional(),
            sustainabilityScore: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          const success = await updateProduct(id, data);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update product" });
          }
          return { success: true };
        }),
      delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        const success = await deleteProduct(input.id);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete product" });
        }
        return { success: true };
      }),
    }),

    // ===== ADMIN SERVICES MANAGEMENT =====
    services: router({
      list: adminProcedure.query(async () => {
        return await getAllServices();
      }),
      get: adminProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        return await getServiceById(input.id);
      }),
      create: adminProcedure
        .input(
          z.object({
            titlePt: z.string(),
            titleEn: z.string(),
            descriptionPt: z.string(),
            descriptionEn: z.string(),
            specialist: z.string(),
            price: z.number(),
            priceType: z.enum(["hourly", "daily", "project"]),
            features: z.string().optional(),
            available: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const result = await createService({
            ...input,
            available: input.available ?? true,
          });
          return result;
        }),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            titlePt: z.string().optional(),
            titleEn: z.string().optional(),
            descriptionPt: z.string().optional(),
            descriptionEn: z.string().optional(),
            specialist: z.string().optional(),
            price: z.number().optional(),
            priceType: z.enum(["hourly", "daily", "project"]).optional(),
            features: z.string().optional(),
            available: z.boolean().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          const success = await updateService(id, data);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update service" });
          }
          return { success: true };
        }),
      delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        const success = await deleteService(input.id);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete service" });
        }
        return { success: true };
      }),
    }),
  }),

  // ===== ORDERS =====
  orders: router({
    getUserOrders: protectedProcedure.query(async ({ ctx }) => {
      return await getUserOrders(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        deliveryAddress: z.string().min(1),
        deliveryCity: z.string().min(1),
        deliveryPhone: z.string().min(1),
        paymentMethod: z.string().min(1),
        notes: z.string().optional(),
        items: z.array(z.object({
          productId: z.number(),
          productName: z.string(),
          quantity: z.number(),
          price: z.number(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const totalAmount = input.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderId = await createOrder({
          userId: ctx.user!.id,
          totalAmount,
          deliveryAddress: input.deliveryAddress,
          deliveryCity: input.deliveryCity,
          deliveryPhone: input.deliveryPhone,
          paymentMethod: input.paymentMethod,
          notes: input.notes || null,
          status: "pending",
        }, input.items);

        if (!orderId) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create order" });
        }

        return { orderId, success: true };
      }),

    myOrders: protectedProcedure.query(async ({ ctx }) => {
      return await getUserOrders(ctx.user!.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const order = await getOrderById(input.id);
        if (!order) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
        }
        // Verify ownership
        if (order.userId !== ctx.user!.id && ctx.user!.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
        }
        return order;
      }),

    // Admin procedures
    all: adminProcedure.query(async () => {
      return await getAllOrders();
    }),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        const success = await updateOrderStatus(input.id, input.status);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update order status" });
        }
        return { success: true };
      }),
  }),

  // ===== CONSULTATIONS =====
  consultations: router({
    list: adminProcedure.query(async () => {
      const { getDb } = await import('./db.js');
      const { consultations } = await import('../drizzle/schema.js');
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(consultations).orderBy(consultations.createdAt);
    }),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'approved', 'completed', 'cancelled']),
      }))
      .mutation(async ({ input }) => {
        const { getDb } = await import('./db.js');
        const { consultations } = await import('../drizzle/schema.js');
        const { eq } = await import('drizzle-orm');
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        await db.update(consultations).set({ status: input.status }).where(eq(consultations.id, input.id));
        return { success: true };
      }),
  }),

  // ===== USER PROFILE =====
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),
    uploadProfilePicture: protectedProcedure
      .input(z.object({
        file: z.string(), // base64 encoded image
        filename: z.string(),
        contentType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { storagePut } = await import("./storage");
        
        // Convert base64 to buffer
        const base64Data = input.file.split(',')[1] || input.file;
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Generate unique filename
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const ext = input.filename.split('.').pop() || 'jpg';
        const key = `profiles/${ctx.user!.id}-${timestamp}-${randomSuffix}.${ext}`;
        
        // Upload to S3
        const { url } = await storagePut(key, buffer, input.contentType);
        
        // Update user profile picture
        const updatedUser = await updateUserProfile(ctx.user!.id, { profilePicture: url });
        if (!updatedUser) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update profile picture" });
        }
        
        return { url, key };
      }),
    update: protectedProcedure
      .input(z.object({
        phone: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        bio: z.string().optional().nullable(),
        profilePicture: z.string().optional().nullable(),
        emailNotifications: z.boolean().optional(),
        orderUpdates: z.boolean().optional(),
        promotions: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const updatedUser = await updateUserProfile(ctx.user!.id, input);
        if (!updatedUser) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update profile" });
        }
        return updatedUser;
      }),
  }),

  // Favorites router
  favorites: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserFavorites(ctx.user!.id);
    }),
    add: protectedProcedure
      .input(z.object({
        itemType: z.enum(["product", "blog"]),
        itemId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await addFavorite({
          userId: ctx.user!.id,
          itemType: input.itemType,
          itemId: input.itemId,
        });
      }),
    remove: protectedProcedure
      .input(z.object({
        itemType: z.enum(["product", "blog"]),
        itemId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await removeFavorite(ctx.user!.id, input.itemType, input.itemId);
        return { success: true };
      }),
    check: protectedProcedure
      .input(z.object({
        itemType: z.enum(["product", "blog"]),
        itemId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        return await isFavorited(ctx.user!.id, input.itemType, input.itemId);
      }),
  }),

  // Reviews
  reviews: router({
    list: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        return await getProductReviews(input.productId);
      }),
    create: protectedProcedure
      .input(z.object({
        productId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await createReview({
          userId: ctx.user!.id,
          productId: input.productId,
          rating: input.rating,
          comment: input.comment || null,
        });
      }),
    average: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        return await getProductAverageRating(input.productId);
      }),
  }),

  // Cart
  cart: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await getUserCart(ctx.user!.id);
    }),
    add: protectedProcedure
      .input(z.object({
        productId: z.number(),
        quantity: z.number().default(1),
      }))
      .mutation(async ({ ctx, input }) => {
        return await addToCart(ctx.user!.id, input.productId, input.quantity);
      }),
    updateQuantity: protectedProcedure
      .input(z.object({
        cartItemId: z.number(),
        quantity: z.number(),
      }))
      .mutation(async ({ input }) => {
        await updateCartItemQuantity(input.cartItemId, input.quantity);
        return { success: true };
      }),
    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input }) => {
        await removeFromCart(input.cartItemId);
        return { success: true };
      }),
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await clearCart(ctx.user!.id);
      return { success: true };
    }),
  }),

  // Public Blog Posts
  blogPosts: router({
    list: publicProcedure.query(async () => {
      const posts = await getAllBlogPosts();
      return posts.filter(p => p.published);
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getBlogPostById(input.id);
      }),
  }),

  // Events
  events: router({
    list: publicProcedure.query(async () => {
      return await getAllEvents();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getEventById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        titlePt: z.string(),
        titleEn: z.string(),
        descriptionPt: z.string(),
        descriptionEn: z.string(),
        location: z.string(),
        eventDate: z.date(),
        imageUrl: z.string().optional(),
        category: z.string(),
        organizerName: z.string(),
        maxParticipants: z.number().optional(),
        registrationDeadline: z.date().optional(),
        status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return await createEvent(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        descriptionPt: z.string().optional(),
        descriptionEn: z.string().optional(),
        location: z.string().optional(),
        eventDate: z.date().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        organizerName: z.string().optional(),
        maxParticipants: z.number().optional(),
        registrationDeadline: z.date().optional(),
        status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateEvent(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteEvent(input.id);
        return { success: true };
      }),
  }),

  // News
  news: router({
    list: publicProcedure.query(async () => {
      return await getAllNews();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getNewsById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        titlePt: z.string(),
        titleEn: z.string(),
        contentPt: z.string(),
        contentEn: z.string(),
        summaryPt: z.string(),
        summaryEn: z.string(),
        imageUrl: z.string().optional(),
        category: z.string(),
        author: z.string(),
        source: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createNews(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titlePt: z.string().optional(),
        titleEn: z.string().optional(),
        contentPt: z.string().optional(),
        contentEn: z.string().optional(),
        summaryPt: z.string().optional(),
        summaryEn: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        author: z.string().optional(),
        source: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateNews(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteNews(input.id);
        return { success: true };
      }),
  }),

  // Global search
  search: router({
    global: publicProcedure
      .input(z.object({ query: z.string().min(1) }))
      .query(async ({ input }) => {
        const { query } = input;
        const lowerQuery = query.toLowerCase();
        
        const products = await getAllProducts();
        const blogPosts = await getAllBlogPosts();
        const services = await getAllServices();
        
        const results = [
          ...products
            .filter(p => 
              p.name.toLowerCase().includes(lowerQuery) || 
              p.description.toLowerCase().includes(lowerQuery) ||
              p.category.toLowerCase().includes(lowerQuery)
            )
            .map(p => ({
              id: p.id,
              title: p.name,
              category: p.category,
              type: 'marketplace' as const,
              href: '/marketplace',
            })),
          ...blogPosts
            .filter(b => 
              b.titlePt.toLowerCase().includes(lowerQuery) || 
              b.excerptPt.toLowerCase().includes(lowerQuery) ||
              b.category.toLowerCase().includes(lowerQuery)
            )
            .map(b => ({
              id: b.id,
              title: b.titlePt,
              category: b.category,
              type: 'blog' as const,
              href: '/knowledge',
            })),
          ...services
            .filter(s => 
              s.titlePt.toLowerCase().includes(lowerQuery) || 
              s.descriptionPt.toLowerCase().includes(lowerQuery) ||
              s.specialist.toLowerCase().includes(lowerQuery)
            )
            .map(s => ({
              id: s.id,
              title: s.titlePt,
              category: 'Serviço',
              type: 'services' as const,
              href: '/services',
            })),
        ];
        
        return results;
      }),
  }),

  // Seed procedure (admin only)
  seed: router({
    all: adminProcedure.mutation(async () => {
      const { getDb } = await import('./db.js');
      const { products, blogPosts, services, events, news } = await import('../drizzle/schema.js');
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });

      const seedProducts = [
        { name: "Sementes Orgânicas de Milho", description: "Sementes certificadas, livres de OGM", price: 250, category: "Sementes", imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800", sustainabilityScore: 95, stock: 50 },
        { name: "Fertilizante Orgânico", description: "Composto natural rico em nutrientes", price: 180, category: "Insumos", imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800", sustainabilityScore: 90, stock: 100 },
        { name: "Sistema de Irrigação por Gotejamento", description: "Economize até 70% de água", price: 1500, category: "Equipamentos", imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800", sustainabilityScore: 88, stock: 20 },
        { name: "Kit de Compostagem", description: "Transforme resíduos orgânicos em adubo", price: 450, category: "Equipamentos", imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800", sustainabilityScore: 92, stock: 35 },
        { name: "Tomate Orgânico Local", description: "Produção local certificada", price: 80, category: "Produtos Frescos", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800", sustainabilityScore: 85, stock: 200 },
        { name: "Mel Silvestre", description: "Mel puro de abelhas nativas", price: 350, category: "Produtos Frescos", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784720?q=80&w=800", sustainabilityScore: 93, stock: 45 },
      ];

      const seedBlogPosts = [
        { titlePt: "Agricultura Sustentável", titleEn: "Sustainable Agriculture", excerptPt: "Descubra as melhores práticas", excerptEn: "Discover best practices", contentPt: "A agricultura sustentável é fundamental para garantir a segurança alimentar e preservar o meio ambiente para as próximas gerações.", contentEn: "Sustainable agriculture is fundamental to ensure food security and preserve the environment for future generations.", author: "Admin", category: "Agricultura", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", readTime: 5, published: true },
        { titlePt: "Compostagem", titleEn: "Composting", excerptPt: "Aprenda a fazer compostagem", excerptEn: "Learn how to compost", contentPt: "A compostagem é uma técnica simples e eficaz para reduzir resíduos orgânicos e criar adubo natural de alta qualidade.", contentEn: "Composting is a simple and effective technique to reduce organic waste and create high-quality natural fertilizer.", author: "Admin", category: "Sustentabilidade", imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800", readTime: 4, published: true },
        { titlePt: "Irrigação Eficiente", titleEn: "Efficient Irrigation", excerptPt: "Técnicas modernas de irrigação", excerptEn: "Modern irrigation techniques", contentPt: "Sistemas eficientes podem reduzir 70% do consumo de água, economizando recursos e aumentando a produtividade.", contentEn: "Efficient systems can reduce water consumption by 70%, saving resources and increasing productivity.", author: "Admin", category: "Tecnologia", imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800", readTime: 6, published: true },
      ];

      const seedServices = [
        { titlePt: "Consultoria em Agricultura", titleEn: "Agriculture Consulting", descriptionPt: "Orientação especializada", descriptionEn: "Specialized guidance", specialist: "Dr. Silva", price: 500, priceType: "hourly" as const, features: JSON.stringify(["Análise", "Planejamento"]), available: true },
        { titlePt: "Análise de Solo", titleEn: "Soil Analysis", descriptionPt: "Análise completa do solo", descriptionEn: "Complete soil analysis", specialist: "Eng. Santos", price: 300, priceType: "project" as const, features: JSON.stringify(["Coleta", "Relatório"]), available: true },
        { titlePt: "Treinamento em Compostagem", titleEn: "Composting Training", descriptionPt: "Workshop prático", descriptionEn: "Practical workshop", specialist: "Prof. Costa", price: 200, priceType: "daily" as const, features: JSON.stringify(["Teoria", "Prática"]), available: true },
      ];

      const seedEvents = [
        {
          titlePt: "Workshop de Agricultura Orgânica",
          titleEn: "Organic Agriculture Workshop",
          descriptionPt: "Aprenda técnicas práticas de agricultura orgânica com especialistas locais. Workshop de 2 dias com certificação.",
          descriptionEn: "Learn practical organic agriculture techniques with local experts. 2-day workshop with certification.",
          location: "Maputo, Moçambique",
          eventDate: new Date('2026-02-15'),
          imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
          category: "Workshop",
          organizerName: "SustainHub",
          maxParticipants: 30,
          registrationDeadline: new Date('2026-02-10'),
          status: "upcoming" as const,
        },
        {
          titlePt: "Feira de Produtos Sustentáveis",
          titleEn: "Sustainable Products Fair",
          descriptionPt: "Encontro de produtores locais e consumidores conscientes. Produtos orgânicos, artesanato e muito mais.",
          descriptionEn: "Meeting of local producers and conscious consumers. Organic products, crafts and more.",
          location: "Matola, Moçambique",
          eventDate: new Date('2026-03-20'),
          imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800",
          category: "Feira",
          organizerName: "SustainHub",
          maxParticipants: 200,
          registrationDeadline: new Date('2026-03-15'),
          status: "upcoming" as const,
        },
        {
          titlePt: "Seminário de Segurança Alimentar",
          titleEn: "Food Security Seminar",
          descriptionPt: "Discussão sobre desafios e soluções para segurança alimentar em Moçambique com palestrantes internacionais.",
          descriptionEn: "Discussion on challenges and solutions for food security in Mozambique with international speakers.",
          location: "Beira, Moçambique",
          eventDate: new Date('2026-04-10'),
          imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
          category: "Seminário",
          organizerName: "SustainHub",
          maxParticipants: 150,
          registrationDeadline: new Date('2026-04-05'),
          status: "upcoming" as const,
        },
        {
          titlePt: "Curso de Compostagem Doméstica",
          titleEn: "Home Composting Course",
          descriptionPt: "Curso prático de 1 dia sobre como fazer compostagem em casa. Inclui kit inicial de compostagem.",
          descriptionEn: "1-day practical course on how to compost at home. Includes starter composting kit.",
          location: "Nampula, Moçambique",
          eventDate: new Date('2026-02-28'),
          imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
          category: "Curso",
          organizerName: "SustainHub",
          maxParticipants: 25,
          registrationDeadline: new Date('2026-02-25'),
          status: "upcoming" as const,
        },
      ];

      const seedNews = [
        {
          titlePt: "Nova Parceria com Produtores Locais",
          titleEn: "New Partnership with Local Producers",
          summaryPt: "SustainHub anuncia parceria com 50 produtores locais",
          summaryEn: "SustainHub announces partnership with 50 local producers",
          contentPt: "SustainHub anuncia parceria estratégica com 50 produtores locais de Maputo e Matola para expandir o marketplace de produtos orgânicos. A iniciativa visa fortalecer a cadeia de valor local e garantir preços justos para agricultores.",
          contentEn: "SustainHub announces strategic partnership with 50 local producers from Maputo and Matola to expand the organic products marketplace. The initiative aims to strengthen the local value chain and ensure fair prices for farmers.",
          category: "Parceria",
          author: "Equipe SustainHub",
          imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
          status: "published" as const,
          publishedAt: new Date('2026-01-15'),
        },
        {
          titlePt: "Recorde de Vendas de Produtos Sustentáveis",
          titleEn: "Record Sales of Sustainable Products",
          summaryPt: "Dezembro registrou recorde de vendas com aumento de 150%",
          summaryEn: "December recorded sales record with 150% increase",
          contentPt: "Dezembro de 2025 registrou recorde histórico de vendas na plataforma SustainHub, com aumento de 150% em relação ao mês anterior. Sementes orgânicas e sistemas de irrigação eficiente foram os produtos mais procurados.",
          contentEn: "December 2025 recorded historic sales record on the SustainHub platform, with a 150% increase compared to the previous month. Organic seeds and efficient irrigation systems were the most sought-after products.",
          category: "Mercado",
          author: "Equipe SustainHub",
          imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800",
          status: "published" as const,
          publishedAt: new Date('2026-01-10'),
        },
        {
          titlePt: "Novo Centro de Conhecimento Online",
          titleEn: "New Online Knowledge Center",
          summaryPt: "Biblioteca digital com mais de 100 recursos disponíveis",
          summaryEn: "Digital library with over 100 resources available",
          contentPt: "Lançamento da biblioteca digital com mais de 100 artigos, vídeos e guias práticos sobre agricultura sustentável. O conteúdo está disponível gratuitamente em português e inglês para todos os usuários.",
          contentEn: "Launch of digital library with over 100 articles, videos and practical guides on sustainable agriculture. Content is available for free in Portuguese and English for all users.",
          category: "Tecnologia",
          author: "Equipe SustainHub",
          imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800",
          status: "published" as const,
          publishedAt: new Date('2026-01-05'),
        },
        {
          titlePt: "Prêmio de Inovação em Sustentabilidade",
          titleEn: "Sustainability Innovation Award",
          summaryPt: "SustainHub recebe Prêmio Nacional de Inovação 2025",
          summaryEn: "SustainHub receives National Innovation Award 2025",
          contentPt: "SustainHub foi reconhecida com o Prêmio Nacional de Inovação em Sustentabilidade 2025 pelo impacto positivo na transformação de sistemas alimentares em Moçambique. A cerimônia de premiação aconteceu em Maputo.",
          contentEn: "SustainHub was recognized with the National Sustainability Innovation Award 2025 for its positive impact on transforming food systems in Mozambique. The award ceremony took place in Maputo.",
          category: "Prêmio",
          author: "Equipe SustainHub",
          imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
          status: "published" as const,
          publishedAt: new Date('2025-12-20'),
        },
      ];

      await Promise.all(seedProducts.map(p => db.insert(products).values(p)));
      await Promise.all(seedBlogPosts.map(p => db.insert(blogPosts).values(p)));
      await Promise.all(seedServices.map(s => db.insert(services).values(s)));
      await Promise.all(seedEvents.map(e => db.insert(events).values(e)));
      await Promise.all(seedNews.map(n => db.insert(news).values(n)));

      return { success: true, message: 'Database seeded successfully with products, blog posts, services, events and news!' };
    }),
  }),
});

export type AppRouter = typeof appRouter;
