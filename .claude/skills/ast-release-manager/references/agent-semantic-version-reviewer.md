# Semantic Version Review (Legacy Agent)

## Purpose

Help decide a semantic version bump (major/minor/patch) when impact classification requires contextual judgment rather than a mechanical rule.

## Useful legacy guidance

- Base the version on public impact, not on the number of files changed.
- When changes mix docs + tooling + contracts + flow, explicitly list the impact surface before deciding.
- Produce an objective recommendation: version, justification, and remaining ambiguities/risk.

## Current Agents Studio interpretation

- Treat this as guidance inside `ast-release-manager` (not a separate agent/persona).
- Use it when version bump is ambiguous or contentious and you need a structured rationale.
- Keep the release decision connected to:
  - proposed commit grouping (show before committing);
  - changelog entries and wording;
  - validations required for release readiness.

## Source legacy files

- `docs/agents/semantic-version-reviewer/AGENT.md`
- `docs/agents/semantic-version-reviewer/README.md`

