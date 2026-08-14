Title: test: add security testing and CI validation

Summary

Added automated tests and CI validation for SafeLinkInspector to improve security posture and prevent regressions.

Changes

- Added `vitest` and Testing Library test setup.
- Extracted scan helpers to `lib/scan/utils.ts` and added unit tests.
- Added SSRF protections: `normalizeUrl` now rejects private/local/metadata addresses.
- Added a new SSRF test: `tests/lib/scan/ssrf.test.ts`.
- Added a basic component integration test for `SafeLinkApp` (mocked external calls).
- CI workflow updated to run tests before build (`.github/workflows/tests.yml`).

Testing

Run locally:

```bash
pnpm install
pnpm test
```

Notes

- Tests mock external services; no real calls to VirusTotal or Supabase.
- `.env` remains ignored; do not commit secrets.
- If local `pnpm install` fails due to build-script approvals, run `pnpm approve-builds`.

Checklist

- [ ] Tests pass locally
- [ ] CI passes on GitHub Actions
- [ ] PR reviewed and merged

If you want, I can open the GitHub PR for you (requires `gh` CLI auth), or you can paste this body when creating the PR via the GitHub web UI.
