# Legacy: Build Commit

## Purpose

Preserve the useful workflow for proposing commit boundaries and messages from the current repository state.

## Useful legacy guidance

- Start from the current change set and propose commit groups by real subject.
- Keep commits small enough to be reviewable.
- Always show commit suggestions before executing commits.
- Run the appropriate validations before closing a batch.

## Current Agents Studio interpretation

- Commit work is part of release readiness in v0.1.
- Prefer deterministic, non-interactive operations when execution is approved.

## Source legacy files

- `docs/skills/build-commit/SKILL.md`
