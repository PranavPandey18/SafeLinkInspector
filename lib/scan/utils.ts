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
  return parsed.toString()
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
