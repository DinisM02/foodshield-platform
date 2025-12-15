import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
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

  // Seed procedure (admin only)
  seed: router({
    all: adminProcedure.mutation(async () => {
      const { getDb } = await import('./db.js');
      const { products, blogPosts, services } = await import('../drizzle/schema.js');
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

      await Promise.all(seedProducts.map(p => db.insert(products).values(p)));
      await Promise.all(seedBlogPosts.map(p => db.insert(blogPosts).values(p)));
      await Promise.all(seedServices.map(s => db.insert(services).values(s)));

      return { success: true, message: 'Database seeded successfully!' };
    }),
  }),
});

export type AppRouter = typeof appRouter;
