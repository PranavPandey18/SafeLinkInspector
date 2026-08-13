# SafeLinkInspector

SafeLinkInspector is a defensive cybersecurity application built with Next.js and React. It provides URL security scanning, password analysis, local file encryption, and a responsive security dashboard.

## Features

- URL security scanner with VirusTotal reputation checks
- URL validation and structured server-side analysis
- Scan history with verdicts and risk scoring
- Password strength assessment and generator
- Client-side file encryption and decryption
- Supabase-backed storage for scan and encryption activity
- Responsive modern UI with accessibility considerations

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Lucide Icons
- shadcn/ui

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Environment Variables

Copy `.env.example` to `.env` and configure your own values.

Required values:

- `VIRUSTOTAL_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Project Structure

- `app/` — Next.js pages and route handlers
- `components/` — reusable UI components
- `lib/` — helper utilities and Supabase client logic

## Security

SafeLinkInspector is intended for authorized defensive use and security research. It integrates with external reputation services and stores scan data in Supabase. Do not use it to probe or attack unauthorized systems.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Install dependencies
4. Make changes
5. Run `pnpm build`
6. Open a pull request
