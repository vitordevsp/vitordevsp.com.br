# Pattern: Versionamento

## Purpose

Define how to reason about semantic versioning, release impact, and changelog scope.

## Useful legacy guidance

- Use semantic versioning as the primary language: major/minor/patch.
- Changelog entries should summarize what matters for human reading; they are not a mirror of git history.
- Documentation-only work affects version only when it changes the official way to use, integrate, or operate the system.

## Current Agents Studio interpretation

- Release readiness includes: scope definition, commit grouping proposal, changelog proposal, and version recommendation.
- Always separate “proposal” from “execution” and ask for confirmation before committing or publishing.

## Source legacy files

- `docs/patterns/versionamento.md`
