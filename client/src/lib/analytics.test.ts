import { describe, it, expect } from 'vitest';
import { GA_MEASUREMENT_ID } from './analytics';

describe('Analytics Configuration', () => {
  it('should have a valid GA Measurement ID', () => {
    expect(GA_MEASUREMENT_ID).toBeDefined();
    expect(GA_MEASUREMENT_ID).toMatch(/^G-[A-Z0-9]+$/);
  });
});
