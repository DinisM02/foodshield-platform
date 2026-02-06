import { describe, it, expect } from 'vitest';
import { uploadImage } from './cloudinary';

describe('Profile Picture Upload', () => {
  it('should upload a base64 image to Cloudinary', async () => {
    // Create a small 1x1 red pixel PNG in base64
    const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
    
    const result = await uploadImage(base64Image, 'test_uploads');
    
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('publicId');
    expect(result.url).toContain('cloudinary.com');
    expect(result.url).toContain('test_uploads');
    expect(typeof result.url).toBe('string');
    expect(typeof result.publicId).toBe('string');
  }, 15000); // 15 second timeout for upload
});
