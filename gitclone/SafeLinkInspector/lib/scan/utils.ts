// Small helper utilities for URL normalization and risk scoring
export type AnalysisStats = {
  malicious?: number
  suspicious?: number
  harmless?: number
  undetected?: number
}

export function encodeUrlId(url: string) {
  return Buffer.from(url).toString('base64').replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

export function normalizeUrl(value: unknown) {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error('Enter a URL to scan.')
  const candidate = value.trim()
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`
  const parsed = new URL(withProtocol)
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Only HTTP and HTTPS URLs can be scanned.')
  // Reject scanning of private, loopback, link-local, and metadata addresses to reduce SSRF risk.
  const host = parsed.hostname
  if (isHostUnsafe(host)) throw new Error('Refusing to scan private or local network addresses.')
  return parsed.toString()
}

function isIPv4(host: string) {
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)
}

function isIPv6(host: string) {
  return host.includes(':')
}

function isHostUnsafe(host: string) {
  const h = host.toLowerCase()
  // Common local hostnames
  if (h === 'localhost' || h === 'ip6-localhost' || h.endsWith('.local')) return true

  // IPv4 literals
  if (isIPv4(h)) {
    const parts = h.split('.').map(n => Number(n))
    if (parts.length !== 4 || parts.some(p => Number.isNaN(p) || p < 0 || p > 255)) return true
    const [a, b] = parts
    // 10.0.0.0/8
    if (a === 10) return true
    // 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) return true
    // 192.168.0.0/16
    if (a === 192 && b === 168) return true
    // 127.0.0.0/8 loopback
    if (a === 127) return true
    // link-local 169.254.0.0/16 (metadata patterns use 169.254.169.254)
    if (a === 169 && b === 254) return true
    return false
  }

  // IPv6 basics: loopback and unique-local/link-local
  if (isIPv6(h)) {
    // Strip zone id if present
    const hostNoZone = h.split('%')[0]
    if (hostNoZone === '::1' || hostNoZone === '0:0:0:0:0:0:0:1') return true
    // Unique local addresses: fc00::/7 (fc or fd prefix)
    if (hostNoZone.startsWith('fc') || hostNoZone.startsWith('fd')) return true
    // Link-local fe80::/10
    if (hostNoZone.startsWith('fe80')) return true
    return false
  }

  // Otherwise a DNS name — treat obvious metadata hostnames as unsafe
  if (h === '169.254.169.254' || h.endsWith('.internal') || h === 'metadata.google.internal') return true

  return false
}

export function getVerdict(stats: AnalysisStats) {
  if ((stats.malicious ?? 0) > 0) return 'malicious' as const
  if ((stats.suspicious ?? 0) > 0) return 'suspicious' as const
  return 'safe' as const
}

export function calculateRiskScore(stats: AnalysisStats) {
  const malicious = stats.malicious ?? 0
  const suspicious = stats.suspicious ?? 0
  const harmless = stats.harmless ?? 0
  const undetected = stats.undetected ?? 0
  const total = malicious + suspicious + harmless + undetected
  return total ? Math.min(100, Math.round(((malicious * 100) + suspicious * 40) / total)) : 0
}
