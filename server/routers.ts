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
});

export type AppRouter = typeof appRouter;
