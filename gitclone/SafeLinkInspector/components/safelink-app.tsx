// Built by PRANAV PANDEY
'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock3, ExternalLink, Link2, Loader2, ShieldCheck, ShieldX, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Verdict = 'safe' | 'suspicious' | 'malicious'
type HistoryItem = {
  id: string
  url: string
  final_url: string | null
  verdict: Verdict
  risk_score: number
  malicious_count: number
  suspicious_count: number
  harmless_count: number
  undetected_count: number
  created_at: string
}
type ScanResult = { url: string; finalUrl: string; verdict: Verdict; riskScore: number; stats: Record<string, number> }

const verdictCopy = {
  safe: { label: 'Looks safe', detail: 'No security vendors flagged this URL.', icon: CheckCircle2 },
  suspicious: { label: 'Use caution', detail: 'Some security vendors found signals worth reviewing.', icon: AlertTriangle },
  malicious: { label: 'Threat detected', detail: 'Security vendors flagged this URL as malicious.', icon: ShieldX },
}

export function SafeLinkApp({ initialHistory }: { initialHistory: HistoryItem[] }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [history, setHistory] = useState(initialHistory)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const [securityAlert, setSecurityAlert] = useState<{ verdict: Verdict; url: string } | null>(null)

  async function scanUrl(event: React.FormEvent) {
    event.preventDefault()
    const normalizedUrl = url.trim()
    setIsScanning(true)
    setError('')
    setResult(null)
    try {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 30_000)
      const response = await fetch('/api/scan', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: normalizedUrl }), signal: controller.signal })
      window.clearTimeout(timeout)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Unable to scan this URL.')
      setResult(data)
      setSecurityAlert(data.verdict === 'safe' ? null : { verdict: data.verdict, url: data.finalUrl })
      setHistory((current) => [{ id: crypto.randomUUID(), url: data.url, final_url: data.finalUrl, verdict: data.verdict, risk_score: data.riskScore, malicious_count: data.stats.malicious, suspicious_count: data.stats.suspicious, harmless_count: data.stats.harmless, undetected_count: data.stats.undetected, created_at: new Date().toISOString() }, ...current].slice(0, 8))
    } catch (scanError) {
      setError(scanError instanceof DOMException && scanError.name === 'AbortError' ? 'The scan timed out. Please try again.' : scanError instanceof Error ? scanError.message : 'Unable to scan this URL.')
    } finally {
      setIsScanning(false)
    }
  }

  async function clearHistory() {
    const supabase = createClient()
    const { error: deleteError } = await supabase.from('scan_history').delete().not('id', 'is', null)
    if (!deleteError) setHistory([])
  }

  return (
    <div className="bg-background text-foreground">
      <div id="top" className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <section className="flex flex-col justify-center">
          <h1 className="max-w-2xl text-balance font-sans text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Check before you click.</h1>
          <form onSubmit={scanUrl} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label className="relative flex min-w-0 flex-1 items-center">
              <Link2 className="pointer-events-none absolute left-4 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">URL to scan</span>
              <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Paste a link to scan" className="h-14 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-base outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring" type="url" required aria-describedby={error ? 'scan-error' : undefined} />
            </label>
            <button type="submit" disabled={isScanning} className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {isScanning ? <Loader2 className="animate-spin" aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
              {isScanning ? 'Scanning…' : 'Scan URL'}
            </button>
          </form>
          {error && <p id="scan-error" role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
          {securityAlert && <div role="alert" aria-live="assertive" className={`mt-4 flex items-start justify-between gap-4 rounded-xl border p-4 text-sm ${securityAlert.verdict === 'malicious' ? 'border-danger/30 bg-danger/10 text-danger-foreground' : 'border-caution/40 bg-caution/15 text-caution-foreground'}`}><div><p className="font-semibold">{securityAlert.verdict === 'malicious' ? 'Threat detected' : 'Suspicious URL detected'}</p><p className="mt-1">Avoid opening this link until you have verified it independently.</p><p className="mt-1 max-w-xl truncate text-xs opacity-80" title={securityAlert.url}>{securityAlert.url}</p></div><button type="button" onClick={() => setSecurityAlert(null)} className="shrink-0 rounded-md px-2 py-1 font-medium hover:bg-background/60" aria-label="Dismiss security alert">Dismiss</button></div>}
          <p className="mt-3 text-xs text-muted-foreground">We never visit, store, or share the contents of your links.</p>
        </section>

        <section aria-live="polite" className="flex min-h-[290px] items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {!result && !isScanning && <div className="max-w-xs text-center"><span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary"><ShieldCheck /></span><h2 className="font-sans text-xl font-semibold">Your result will appear here</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Enter a URL to see its reputation, risk score, and vendor breakdown.</p></div>}
          {isScanning && <div className="text-center"><Loader2 className="mx-auto size-9 animate-spin text-primary" /><p className="mt-4 font-medium">Checking security engines…</p><p className="mt-1 text-sm text-muted-foreground">This can take a few seconds.</p></div>}
          {result && <ResultCard result={result} />}
        </section>
      </div>

      <section className="border-t border-border/70 bg-secondary/35">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="font-sans text-xl font-semibold">Recent scans</h2><p className="mt-1 text-sm text-muted-foreground">Your latest checks are kept here for quick reference.</p></div>{history.length > 0 && <button onClick={clearHistory} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><Trash2 data-icon="inline-start" /> Clear history</button>}</div>
          {history.length === 0 ? <div className="rounded-xl border border-dashed border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">No scans yet. Your recent URL checks will show up here.</div> : <div className="grid gap-3 md:grid-cols-2">{history.map((item) => <HistoryRow key={item.id} item={item} />)}</div>}
        </div>
      </section>
    </div>
  )
}

function ResultCard({ result }: { result: ScanResult }) {
  const copy = verdictCopy[result.verdict]
  const Icon = copy.icon
  return <div className="w-full"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className={`flex size-11 items-center justify-center rounded-xl ${result.verdict === 'safe' ? 'bg-safe/15 text-safe-foreground' : result.verdict === 'suspicious' ? 'bg-caution/20 text-caution-foreground' : 'bg-danger/15 text-danger-foreground'}`}><Icon /></span><div><p className="font-sans text-xl font-semibold">{copy.label}</p><p className="mt-1 text-sm text-muted-foreground">{copy.detail}</p></div></div><span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">Risk {result.riskScore}/100</span></div><div className="mt-6 rounded-xl bg-secondary p-4"><p className="truncate text-sm font-medium" title={result.finalUrl}>{result.finalUrl}</p><a className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline" href={result.finalUrl} target="_blank" rel="noreferrer">Open link <ExternalLink data-icon="inline-end" /></a></div><div className="mt-5 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">{Object.entries(result.stats).map(([key, value]) => <div key={key} className="rounded-lg border border-border bg-card px-2 py-3"><p className="text-xl font-semibold">{value}</p><p className="mt-1 text-xs capitalize text-muted-foreground">{key}</p></div>)}</div></div>
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const copy = verdictCopy[item.verdict]
  const Icon = copy.icon
  return <article className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Icon /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium" title={item.url}>{item.url}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 data-icon="inline-start" /> {new Date(item.created_at).toLocaleString()}</p></div><span className="shrink-0 text-right"><span className="block text-sm font-medium capitalize">{item.verdict}</span><span className="text-xs text-muted-foreground">{item.risk_score}/100</span></span></article>
}
