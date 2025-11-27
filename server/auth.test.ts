import { describe, it, expect, beforeAll } from 'vitest';
import { getUserByOpenId, upsertUser } from './db';

describe('Authentication Flow', () => {
  const testUser = {
    openId: 'test-user-' + Date.now(),
    name: 'Test User',
    email: 'test@example.com',
    loginMethod: 'google',
  };

  beforeAll(async () => {
    // Clean up any existing test user
    const existing = await getUserByOpenId(testUser.openId);
    if (existing) {
      console.log('Test user already exists, skipping cleanup');
    }
  });

  it('should create a new user via upsertUser', async () => {
    await upsertUser({
      openId: testUser.openId,
      name: testUser.name,
      email: testUser.email,
      loginMethod: testUser.loginMethod,
    });

    const user = await getUserByOpenId(testUser.openId);
    expect(user).toBeDefined();
    expect(user?.openId).toBe(testUser.openId);
    expect(user?.name).toBe(testUser.name);
    expect(user?.email).toBe(testUser.email);
  });

  it('should update existing user via upsertUser', async () => {
    const updatedName = 'Updated Test User';
    
    await upsertUser({
      openId: testUser.openId,
      name: updatedName,
      email: testUser.email,
      loginMethod: testUser.loginMethod,
    });

    const user = await getUserByOpenId(testUser.openId);
    expect(user?.name).toBe(updatedName);
  });

  it('should retrieve user by openId', async () => {
    const user = await getUserByOpenId(testUser.openId);
    
    expect(user).toBeDefined();
    expect(user?.openId).toBe(testUser.openId);
    expect(user?.role).toBeDefined();
  });

  it('should return undefined for non-existent user', async () => {
    const user = await getUserByOpenId('non-existent-user-' + Date.now());
    expect(user).toBeUndefined();
  });

  it('should have user role as admin or user', async () => {
    const user = await getUserByOpenId(testUser.openId);
    expect(user?.role).toMatch(/^(admin|user)$/);
  });

  it('should have timestamps for user', async () => {
    const user = await getUserByOpenId(testUser.openId);
    expect(user?.createdAt).toBeDefined();
    expect(user?.updatedAt).toBeDefined();
    expect(user?.lastSignedIn).toBeDefined();
  });
});

describe('User Properties', () => {
  it('should have all required user fields', async () => {
    const testOpenId = 'test-props-' + Date.now();
    
    await upsertUser({
      openId: testOpenId,
      name: 'Test User',
      email: 'test@example.com',
      loginMethod: 'google',
    });

    const user = await getUserByOpenId(testOpenId);
    
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('openId');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('loginMethod');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
    expect(user).toHaveProperty('lastSignedIn');
  });
});
