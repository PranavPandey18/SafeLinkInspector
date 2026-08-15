SafeLink

Privacy-first cybersecurity toolkit for everyday digital safety.

SafeLink is a modern cybersecurity web application that brings practical security tools into one interface. It helps users investigate suspicious URLs, analyze password strength, generate stronger passwords, and encrypt/decrypt files locally.

Designed as a BCA Cyber Security mini project with production-oriented security and software-engineering practices.

Features

URL Security Scanner

URL validation

VirusTotal-powered URL reputation analysis

Malicious/suspicious/harmless detection counts

Threat labels and vendor detections

Reputation information where available

RDAP/WHOIS and SSL information where configured

Risk scoring

Scan history

Security reports

OpenRouter-powered explanations

Important: VirusTotal is the primary URL reputation source. OpenRouter explains findings and recommendations; it does not override the security verdict.

Password Security Analyzer

Password length analysis

Uppercase/lowercase/number/symbol checks

Repeated and sequential pattern detection

Keyboard-pattern detection

Common-password checks

Entropy

Estimated crack time

Strength score

Recommendations

Password analysis is designed to run locally in the browser.

Secure Password Generator

Supports:

Random mode

Custom mode

Custom words/names

Custom letters

Custom numbers

Custom symbols

Length selection

Uppercase/lowercase/numbers/symbols

Exclusion of similar characters

Cryptographic randomness

Copy and regenerate

Generated passwords are not sent to external APIs or stored.

File Encryption

Client-side file protection using the Web Crypto API:

AES-256-GCM encryption

Password-based key derivation

Drag and drop

File decryption

SHA-256 hashing

Integrity verification

Download encrypted files

Restore original filename

Files are intended to remain on the user's device during encryption/decryption.

Other

Dashboard

Scan/activity history

Responsive sidebar/navigation

Light/dark theme where configured

Responsive mobile layout

Loading, empty, and error states

Smooth, lightweight animations

Architecture

                         SafeLink
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
        URL Scanner    Password Tools   File Encryption
              |             |             |
              v             v             v
         VirusTotal       Browser       Web Crypto API
              |
              v
         OpenRouter
       (explanation only)

                    Supabase
              (history/data where used)

URL scanning

User
  |
  v
SafeLink Frontend
  |
  v
Server API
  |
  +----> VirusTotal
  +----> RDAP/WHOIS (when configured)
  +----> SSL/domain checks (when configured)
  |
  v
Normalized findings
  |
  v
OpenRouter
(explanation/recommendations)

Password tools

User
  |
  v
Browser
  +--> Analysis
  +--> Entropy
  +--> Strength score
  +--> Password generation

File encryption

User File
   |
   v
Browser
   +--> Random salt
   +--> Random IV/nonce
   +--> Password-based key derivation
   +--> AES-256-GCM
   +--> SHA-256
   |
   v
Encrypted .safelink file

Technology Stack

Frontend: Next.js, React, TypeScript

UI: Tailwind CSS, shadcn/ui where used

Animation: Framer Motion where used

Icons: Lucide Icons where used

Backend: Next.js server/API routes

Database: Supabase where configured

URL Intelligence: VirusTotal API

AI Explanation: OpenRouter API

Cryptography: Web Crypto API, AES-256-GCM, SHA-256

Deployment: Netlify

Project Structure

The exact repository structure is the source of truth. A typical structure is:

safelink/
├── app/
│   ├── api/
│   │   ├── scan/
│   │   ├── scans/
│   │   └── passwords/
│   ├── about/
│   ├── file-encryption/
│   ├── history/
│   ├── password-analyzer/
│   ├── scan/
│   ├── globals.css
│   └── layout.tsx
├── components/
├── lib/
├── public/
├── package.json
├── pnpm-lock.yaml
├── next.config.*
├── netlify.toml
├── tsconfig.json
└── README.md

Requirements

Node.js 20+ recommended

pnpm

Git

Check:

node --version
pnpm --version
git --version

Installation

git clone https://github.com/YOUR_USERNAME/safelink.git
cd safelink
pnpm install
pnpm dev

Open http://localhost:3000.

Environment Variables

Create .env.local locally. Never commit real secrets.

VIRUSTOTAL_API_KEY=
OPENROUTER_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

Use the exact variable names referenced by the implementation.

Secret handling

Keep these server-side:

VIRUSTOTAL_API_KEY
OPENROUTER_API_KEY
SUPABASE_SERVICE_ROLE_KEY

Do not rename secret keys to NEXT_PUBLIC_*.

Only public Supabase configuration should be available to browser code where appropriate:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

VirusTotal

SafeLink uses VirusTotal as the primary URL reputation service.

Configure:

VIRUSTOTAL_API_KEY=your_key

The key must remain server-side.

VirusTotal results are not an absolute guarantee that a URL is safe. Results depend on available engines, reputation data, API limits, and service availability.

OpenRouter

OpenRouter provides AI-assisted explanations of security findings.

Configure:

OPENROUTER_API_KEY=your_key

OpenRouter should explain findings and recommendations. It should not override VirusTotal's security findings.

Supabase

Supabase can store non-sensitive application data such as scan history where implemented.

Do not store:

Raw passwords

Generated passwords

Encryption keys

File contents

Encryption passwords

Never expose SUPABASE_SERVICE_ROLE_KEY to browser code.

File Encryption Security

The intended flow is:

File
 ↓
Random salt
 ↓
Password-based key derivation
 ↓
256-bit AES key
 ↓
AES-256-GCM
 ↓
Encrypted file

AES-GCM provides authenticated encryption, so tampered ciphertext should fail authentication.

Passwords and encryption keys must never be stored in the encrypted file.

Password Security

Password analysis and generation should happen locally.

SafeLink should not:

Upload passwords

Store passwords

Send passwords to OpenRouter

Send passwords to VirusTotal

Send passwords to Supabase

Password strength and crack-time values are estimates, not guarantees.

Development

pnpm dev

Production build:

pnpm build

Production server:

pnpm start

Before deployment:

pnpm install
pnpm build

Netlify Deployment

SafeLink is a Next.js application with server-side API routes. The recommended deployment flow is:

GitHub
   ↓
Netlify
   ↓
Install dependencies
   ↓
pnpm run build
   ↓
Next.js production deployment

Do not deploy SafeLink as a purely static site because the URL scanner requires server-side handling of API credentials.

Recommended build command:

pnpm run build

Do not use:

next export

Do not expose API secrets through NEXT_PUBLIC_* variables.

After changing Netlify environment variables, trigger a new deployment.

Performance

SafeLink prioritizes fast interaction while preserving security:

Local password analysis

Local password generation

Local file encryption

Avoid duplicate API requests

Loading states for network operations

Limited/paginated history queries where appropriate

Lightweight animations

Responsive components

Server-side external API calls

Privacy

Passwords

Processed locally.

Generated passwords

Generated locally.

Files

Encrypted/decrypted locally.

URL scans

URLs are sent to the configured reputation service because remote threat intelligence is required.

Users should understand that submitting a URL to VirusTotal is subject to VirusTotal's API/service behavior and policies.

Responsible Use

SafeLink is intended for:

Personal security awareness

Cybersecurity education

Defensive security analysis

URL reputation checking

Password hygiene

File protection

BCA cybersecurity coursework

Only analyze URLs and systems where you have appropriate authorization.

Limitations

SafeLink does not guarantee that:

Every malicious URL will be detected

Every safe URL will remain safe

Every password is uncrackable

Encryption protects a compromised device

Third-party services are always available

VirusTotal, OpenRouter, Supabase, and other external services may have availability and rate limits.

Roadmap

Potential improvements:

Advanced URL heuristics

Expanded threat-intelligence providers

QR-code URL scanner

Browser extension

Security notifications

More encryption format options

Web Worker optimization for very large files

Automated security tests

Accessibility improvements

Internationalization

Educational Objectives

SafeLink demonstrates:

Cybersecurity

Threat intelligence

URL analysis

Secure API integration

API-key management

Password security

Entropy

Cryptography

AES-256-GCM

SHA-256

Client-side security

Server-side API design

Supabase

Next.js

TypeScript

Responsive UI development

Secure software architecture

Project Status

Status: Active development / BCA Cyber Security Mini Project

