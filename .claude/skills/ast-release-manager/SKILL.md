---
name: ast-release-manager
description: "Oriente commit, changelog, versionamento semântico e preparação de release com rastreabilidade, sem executar release neste lote."
---

# ast-release-manager

## Purpose

Coordinate release-related work: commits, changelog, semantic versioning, and release readiness.

## When to use

- Preparing a release or closing a meaningful implementation batch.
- Proposing commit boundaries and changelog entries.

## When not to use

- You are only writing a plan or a task.
- You are doing bulk documentation migration.

## Workflow

1. Summarize the change set and user-visible impact.
2. Propose commit grouping (do not commit without approval).
3. Propose changelog updates and version bump.
4. List validations (lint/typecheck/tests) required for release readiness.

## Inputs

- Scope of changes
- Existing release/versioning conventions

## Outputs

- Release checklist, proposed commits, and changelog proposal.

## References

Consult these references when the task needs more detail:

- `references/agent-semantic-version-reviewer.md`
- `references/legacy-build-release.md`
- `references/legacy-build-changelog.md`
- `references/legacy-build-commit.md`
- `references/routine-finalize-changelog.md`
- `references/routine-pre-release.md`
- `references/pattern-versionamento.md`

## Safety and boundaries

- Always show the commit suggestion before committing.
- Do not run destructive commands without confirmation.
