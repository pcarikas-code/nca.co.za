import { describe, it, expect } from 'vitest';

describe('SharedCount API', () => {
  it('should validate the API key with a simple request', async () => {
    const apiKey = process.env.VITE_SHAREDCOUNT_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_SHAREDCOUNT_API_KEY is not set');
    }

    const url = 'https://google.com';
    const response = await fetch(`https://api.sharedcount.com/v1.0/?url=${encodeURIComponent(url)}&apikey=${apiKey}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    expect(data).toHaveProperty('Facebook');
    // Pinterest might be missing or 0, but Facebook object usually exists even if empty
  });
});
