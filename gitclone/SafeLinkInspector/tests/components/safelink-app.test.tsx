import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { SafeLinkApp } from '@/components/safelink-app'

// Mock the Supabase client used by components to avoid needing env vars
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ from: () => ({ insert: async () => ({}) }) }),
}))

describe('SafeLinkApp integration', () => {
  it('shows error for empty input', async () => {
    render(<SafeLinkApp initialHistory={[]} />)
    const button = screen.getByRole('button', { name: /scan url/i })
    fireEvent.click(button)
    expect(await screen.findByText(/enter a url to scan/i)).toBeTruthy()
  })

  it('performs scan and displays result', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ url: 'https://example.com', finalUrl: 'https://example.com', verdict: 'safe', riskScore: 0, stats: { malicious: 0, suspicious: 0, harmless: 0, undetected: 0 } }) })) as any
    render(<SafeLinkApp initialHistory={[]} />)
    const input = screen.getByPlaceholderText(/paste a link to scan/i)
    const button = screen.getByRole('button', { name: /scan url/i })
    fireEvent.change(input, { target: { value: 'https://example.com' } })
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText(/looks safe/i)).toBeInTheDocument())
  })
})
