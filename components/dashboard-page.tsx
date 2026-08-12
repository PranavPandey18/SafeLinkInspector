// Built by PRANAV PANDEY
'use client'

import Link from 'next/link'
import { ArrowRight, Check, FileKey2, Link2, LockKeyhole, ShieldCheck, Sparkles, Zap } from 'lucide-react'

type DashboardProps = { scans: number; threats: number; safe: number; encrypted: number; averageScore: number; recent: Array<{ label: string; detail: string; tone: string }> }

export function DashboardPage({ scans, threats, safe, encrypted }: DashboardProps) {
  const tools = [
    { title: 'URL Scanner', description: 'Check a link before you open it.', href: '/scanner', icon: Link2, accent: 'text-primary', meta: 'Instant verdicts' },
    { title: 'Password Analyzer', description: 'Create and test strong passwords locally.', href: '/password-analyzer', icon: Sparkles, accent: 'text-safe-foreground', meta: 'Nothing leaves your browser' },
    { title: 'File Encryption', description: 'Protect sensitive files with browser encryption.', href: '/file-encryption', icon: FileKey2, accent: 'text-caution-foreground', meta: 'AES-256-GCM' },
  ]
  const stats = [['URLs checked', scans], ['Threats caught', threats], ['Safe results', safe], ['Files protected', encrypted]]
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="pointer-events-none absolute right-8 top-16 hidden size-40 rounded-full border border-primary/20 lg:block motion-safe:animate-[spin_18s_linear_infinite]" />
        <div className="pointer-events-none absolute right-24 top-32 hidden size-24 rounded-full border border-safe/20 lg:block motion-safe:animate-[spin_12s_linear_infinite_reverse]" />
        <div className="relative max-w-3xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-reduce:animate-none">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="size-2 rounded-full bg-safe" /> Private security, made simple</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Make safer decisions <span className="text-primary">before</span> the risk.</h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">SafeLink brings everyday security essentials into one focused workspace. Check links, improve passwords, and protect files without giving up control.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/scanner" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5">Scan a URL <ArrowRight data-icon="inline-end" /></Link><Link href="/password-analyzer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary">Explore tools</Link></div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><LockKeyhole className="size-4 text-safe-foreground" /> Local-first tools</span><span className="flex items-center gap-2"><Zap className="size-4 text-caution-foreground" /> Fast feedback</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Clear results</span></div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30 px-4 py-8 sm:px-8 lg:px-12"><div className="grid grid-cols-2 gap-6 lg:grid-cols-4">{stats.map(([label, value]) => <div key={String(label)}><p className="text-2xl font-semibold tracking-tight sm:text-3xl">{String(value)}</p><p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p></div>)}</div></section>

      <section className="px-4 py-16 sm:px-8 lg:px-12"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-primary">Your toolkit</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Security tools that get out of the way</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Focused utilities, readable outcomes, and no unnecessary setup.</p></div><div className="mt-8 grid gap-4 md:grid-cols-3">{tools.map(({ title, description, href, icon: Icon, accent, meta }, index) => <Link key={title} href={href} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-reduce:animate-none" style={{ animationDelay: `${index * 100}ms` }}><div className={`flex size-11 items-center justify-center rounded-xl bg-secondary ${accent}`}><Icon /></div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-6 flex items-center justify-between text-xs text-muted-foreground"><span>{meta}</span><ArrowRight className="transition-transform group-hover:translate-x-1" /></div></Link>)}</div></section>

      <section className="border-y border-border px-4 py-16 sm:px-8 lg:px-12"><div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="text-sm font-semibold text-primary">How it works</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Security without the noise.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Every feature is designed around one principle: show you what matters, then let you act confidently.</p></div><div className="grid gap-4 sm:grid-cols-3">{[['01', 'Check', 'Run a URL through the scanner.'], ['02', 'Understand', 'See a clear result and useful context.'], ['03', 'Protect', 'Generate, encrypt, or move forward safely.']].map(([number, title, body]) => <div key={number} className="rounded-2xl bg-card p-5"><span className="font-mono text-xs text-primary">{number}</span><h3 className="mt-8 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>)}</div></div></section>

      <section className="px-4 py-16 text-center sm:px-8 lg:px-12"><div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><ShieldCheck /></div><h2 className="mt-6 text-3xl font-semibold tracking-tight">Ready to make the next click safer?</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Start with a URL scan or explore the full privacy toolkit.</p><Link href="/scanner" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Open scanner <ArrowRight /></Link><div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">{['No account required', 'Local password tools', 'Clear security results'].map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="size-3 text-safe-foreground" />{item}</span>)}</div></div></section>
    </div>
  )
}
