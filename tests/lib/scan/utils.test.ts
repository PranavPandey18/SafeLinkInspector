import { describe, it, expect } from 'vitest'
import { normalizeUrl, getVerdict, calculateRiskScore } from '@/lib/scan/utils'

describe('lib/scan/utils', () => {
  it('normalizes protocol-less URL to https', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com/')
  })

  it('throws on empty URL', () => {
    expect(() => normalizeUrl('')).toThrow('Enter a URL to scan.')
  })

  it('throws on unsupported protocol', () => {
    expect(() => normalizeUrl('ftp://example.com')).toThrow('Only HTTP and HTTPS URLs can be scanned.')
  })

  it('calculates verdict and risk correctly', () => {
    const stats = { malicious: 1, suspicious: 2, harmless: 3, undetected: 4 }
    expect(getVerdict(stats)).toBe('malicious')
    expect(calculateRiskScore(stats)).toBeGreaterThanOrEqual(0)
  })
})
