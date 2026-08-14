import { describe, it, expect } from 'vitest'
import { normalizeUrl } from '../../../lib/scan/utils'

describe('SSRF protections in normalizeUrl', () => {
  const rejects = [
    'http://127.0.0.1',
    'http://localhost',
    'http://192.168.0.1',
    'http://10.0.0.5',
    'http://172.16.0.1',
    'http://169.254.169.254',
    'http://[::1]',
    'http://[fc00::1]'
  ]

  for (const url of rejects) {
    it(`rejects ${url}`, () => {
      expect(() => normalizeUrl(url)).toThrow(/Refusing to scan/)
    })
  }

  it('accepts a normal public URL', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com/')
  })
})
