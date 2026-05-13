# Pre-Release Readiness (Legacy Routine)

## Purpose

Provide a release readiness checklist right before tagging/publishing: confirm scope, changelog quality, version bump, plan closure, and blocking risks.

## Useful legacy guidance

- Confirm release scope is clear and coherent.
- Run the “finalize changelog” pass before deciding readiness.
- Validate the candidate version against semver and the project conventions.
- Explicitly list blocking risks/pending items instead of shipping with hidden uncertainty.

## Current Agents Studio interpretation

- Treat this as a workflow reference inside `ast-release-manager` (not as a separate skill).
- Use it to produce a short decision: ready vs blocked, plus next actions.
- Prefer referencing existing release references owned by `ast-release-manager`:
  - commit grouping + validations
  - changelog wording + versioning rationale

## Source legacy files

- `docs/routines/pre-release/ROUTINE.md`
- `docs/routines/pre-release/README.md`

