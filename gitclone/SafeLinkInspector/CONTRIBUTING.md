# Contributing to SafeLinkInspector

Thank you for contributing to SafeLinkInspector.

## Development setup

1. Fork the repository.
2. Clone your fork:
   ```bash
git clone https://github.com/YOUR_USERNAME/SafeLinkInspector.git
cd SafeLinkInspector
```
3. Install dependencies:
   ```bash
pnpm install
```
4. Create a feature branch:
   ```bash
git checkout -b feature/your-feature-name
```

## Coding expectations

- Preserve existing UI and functionality.
- Keep changes small and focused.
- Use meaningful names and clear code structure.
- Avoid hardcoding secrets or credentials.
- Do not add unnecessary dependencies.

## Testing

Run the project and tests:
```bash
pnpm install
pnpm test
pnpm build
```

If you add new tests, include them in your PR description and ensure they pass.

## Pull request expectations

- Describe what changed and why.
- Explain how the change was tested.
- Mention any environment variables or configuration required.
- Ensure the PR targets `main` from a feature branch.
