// Built by PRANAV PANDEY
import { Loader2, ShieldCheck } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><ShieldCheck /></span>
        <Loader2 className="size-5 animate-spin text-primary" aria-label="Loading" />
        <p className="text-sm text-muted-foreground">Loading your security workspace…</p>
      </div>
    </div>
  )
}
