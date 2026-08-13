// Built by PRANAV PANDEY
import { Users } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const contributors = [
  { name: 'Shashank Mangain', role: 'Team Leader' },
  { name: 'Aman Bisht', role: 'Contributor' },
  { name: 'Srishti', role: 'Contributor' },
  { name: 'Priyanshu Semwal', role: 'Contributor' },
]

export default function ContributionPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Users aria-hidden="true" /></span>
          <div>
            <p className="text-sm font-medium text-primary">Project contribution</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Built together.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">SafeLink is a collaborative security workspace created by a focused team.</p>
          </div>
        </div>
        <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Project contributors">
          {contributors.map((person) => (
            <article key={person.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-semibold">{person.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{person.role}</p>
            </article>
          ))}
        </section>
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Our contribution</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Together, the team shaped the product experience, security tools, responsive interface, and privacy-first workflows.</p>
        </section>
      </div>
    </AppShell>
  )
}
