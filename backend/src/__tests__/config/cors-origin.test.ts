import { describe, it, expect } from 'vitest';
import { validateCorsOrigin } from '../../config/env.js';

describe('validateCorsOrigin', () => {
  it('accepts any origin outside production', () => {
    expect(validateCorsOrigin('http://localhost:5173', false)).toBe('http://localhost:5173');
    expect(validateCorsOrigin('http://example.com', false)).toBe('http://example.com');
  });

  it('accepts https origins in production', () => {
    expect(validateCorsOrigin('https://app.example.com', true)).toBe('https://app.example.com');
  });

  it('accepts plain-http localhost origins in production for local simulation', () => {
    expect(validateCorsOrigin('http://localhost', true)).toBe('http://localhost');
    expect(validateCorsOrigin('http://localhost:4000', true)).toBe('http://localhost:4000');
    expect(validateCorsOrigin('http://127.0.0.1:80', true)).toBe('http://127.0.0.1:80');
  });

  it('rejects other plain-http origins in production', () => {
    expect(() => validateCorsOrigin('http://example.com', true)).toThrow(/HTTPS/);
    expect(() => validateCorsOrigin('http://localhost.evil.com', true)).toThrow(/HTTPS/);
    expect(() => validateCorsOrigin('http://localhost:80@evil.com', true)).toThrow(/HTTPS/);
  });
});
