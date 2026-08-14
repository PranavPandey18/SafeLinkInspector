// Built by PRANAV PANDEY
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Activity, FileKey2, History, Info, LayoutDashboard, Link2, Menu, Settings, ShieldCheck, Users, X } from 'lucide-react'

const items = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scanner', label: 'URL Scanner', icon: Link2 },
  { href: '/password-analyzer', label: 'Password Analyzer', icon: ShieldCheck },
  { href: '/file-encryption', label: 'File Encryption', icon: FileKey2 },
  { href: '/history', label: 'History', icon: History },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contribution', label: 'Contribution', icon: Users },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-card transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><ShieldCheck /></span><span className="text-lg font-semibold tracking-tight">SafeLink</span></Link>
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
          {items.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}><Icon />{label}</Link> })}
        </nav>
        <div className="border-t border-border px-5 py-4 text-xs text-muted-foreground"><div className="flex items-center gap-2"><Activity className="text-safe" /> All systems operational</div><p className="mt-2">Your sensitive data stays on your device.</p></div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}
      <div className={open ? 'md:pl-72' : ''}><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6"><button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" onClick={() => setOpen((current) => !current)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}><Menu /></button><div className="text-sm text-muted-foreground">Private security workspace</div><div className="ml-auto flex items-center gap-3"><span className="size-2 rounded-full bg-safe" /><span className="text-sm text-muted-foreground">Protected session</span></div></header><main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main><footer className="mx-auto flex w-full max-w-7xl border-t border-border px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8"><span>© {new Date().getFullYear()} Pranav Pandey. All rights reserved.</span></footer></div>
    </div>
  )
}
