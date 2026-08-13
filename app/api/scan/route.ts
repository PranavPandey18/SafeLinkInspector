// Built by PRANAV PANDEY
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { encodeUrlId, normalizeUrl, getVerdict, calculateRiskScore } from '@/lib/scan/utils'

const VIRUSTOTAL_URL = 'https://www.virustotal.com/api/v3'

export async function POST(request: Request) {
  try {
    const url = normalizeUrl((await request.json()).url)
    const apiKey = process.env.VIRUSTOTAL_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Scanning service is not configured.' }, { status: 503 })

    const headers = { 'x-apikey': apiKey, accept: 'application/json' }
    let response = await fetch(`${VIRUSTOTAL_URL}/urls/${encodeUrlId(url)}`, { headers, cache: 'no-store' })

    if (!response.ok && response.status === 404) {
      response = await fetch(`${VIRUSTOTAL_URL}/urls`, {
        method: 'POST',
        headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url }).toString(),
        cache: 'no-store',
      })
      if (response.ok) {
        const submission = await response.json()
        const analysisId = submission?.data?.id
        if (analysisId) {
          await new Promise((resolve) => setTimeout(resolve, 1200))
          const analysisResponse = await fetch(`${VIRUSTOTAL_URL}/analyses/${analysisId}`, { headers, cache: 'no-store' })
          if (analysisResponse.ok) {
            const analysis = await analysisResponse.json()
            const stats = analysis?.data?.attributes?.stats ?? {}
            const result = await saveResult(url, stats, url, analysis)
            return NextResponse.json(result)
          }
        }
      }
    }

    if (!response.ok) {
      const details = await response.text()
      console.error('[v0] Scan provider request failed:', response.status, details)
      return NextResponse.json({ error: 'The URL could not be scanned right now.' }, { status: 502 })
    }

    const report = await response.json()
    const stats = report?.data?.attributes?.last_analysis_stats ?? report?.data?.attributes?.stats ?? {}
    const finalUrl = report?.data?.attributes?.last_final_url ?? url
    return NextResponse.json(await saveResult(url, stats, finalUrl, report))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to scan this URL.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

async function saveResult(url: string, stats: AnalysisStats, finalUrl: string, report: unknown) {
  const verdict = getVerdict(stats)
  const malicious = stats.malicious ?? 0
  const suspicious = stats.suspicious ?? 0
  const harmless = stats.harmless ?? 0
  const undetected = stats.undetected ?? 0
  const riskScore = calculateRiskScore(stats)
  const supabase = await createClient()
  const { error } = await supabase.from('scan_history').insert({
    url,
    final_url: finalUrl,
    verdict,
    risk_score: riskScore,
    malicious_count: malicious,
    suspicious_count: suspicious,
    harmless_count: harmless,
    undetected_count: undetected,
    report,
  })
  if (error) console.error('[v0] Could not save scan history:', error.message)
  return { url, finalUrl, verdict, riskScore, stats: { malicious, suspicious, harmless, undetected } }
}
