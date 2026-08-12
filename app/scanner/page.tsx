// Built by PRANAV PANDEY
import { SafeLinkApp } from '@/components/safelink-app'
import { AppShell } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/server'

export default async function ScannerPage() { const supabase = await createClient(); const { data } = await supabase.from('scan_history').select('id, url, final_url, verdict, risk_score, malicious_count, suspicious_count, harmless_count, undetected_count, created_at').order('created_at', { ascending: false }).limit(8); return <AppShell><SafeLinkApp initialHistory={data ?? []} /></AppShell> }
