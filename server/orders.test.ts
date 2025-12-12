import { describe, it, expect } from 'vitest';
import { appRouter } from '../server/routers';
import type { Context } from '../server/_core/context';

describe('Orders API', () => {
  it('should create order successfully', async () => {
    const mockContext: Context = {
      user: {
        id: 1,
        openId: 'test-user',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        loginMethod: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    const result = await caller.orders.create({
      deliveryAddress: 'Rua 25 de Setembro, 123, Maputo',
      deliveryCity: 'Maputo',
      deliveryPhone: '+258 84 123 4567',
      paymentMethod: 'cash',
      notes: 'Test order',
      items: [
        {
          productId: 1,
          productName: 'Kit de Compostagem',
          quantity: 1,
          price: 450,
        },
      ],
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.orderId).toBeGreaterThan(0);
  });
});
