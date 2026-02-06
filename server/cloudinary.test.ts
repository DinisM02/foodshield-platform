import { describe, it, expect } from 'vitest';
import { testCloudinaryConnection } from './cloudinary';

describe('Cloudinary Configuration', () => {
  it('should connect to Cloudinary with provided credentials', async () => {
    const isConnected = await testCloudinaryConnection();
    expect(isConnected).toBe(true);
  }, 10000); // 10 second timeout for API call
});
