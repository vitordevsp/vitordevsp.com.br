# Finalize Changelog (Legacy Routine)

## Purpose

Provide a last-pass checklist to finalize `CHANGELOG.md` before release, merge, or external communication.

## Useful legacy guidance

- Ensure entries represent meaningful user-visible changes (not just a commit list).
- Keep categories readable and consistent.
- If the version bump is unclear, explicitly flag the ambiguity rather than guessing.
- Ensure related plans are reflected in the changelog wording.

## Current Agents Studio interpretation

- Treat this as a workflow reference inside `ast-release-manager` (not as a separate skill).
- Use alongside:
  - `references/legacy-build-changelog.md`
  - `references/pattern-versionamento.md`
  - `references/agent-semantic-version-reviewer.md` (when classification is ambiguous)
- Keep output focused: what to change in the changelog, what is missing, and what is ready.

## Source legacy files

- `docs/routines/finalize-changelog/ROUTINE.md`
- `docs/routines/finalize-changelog/README.md`

