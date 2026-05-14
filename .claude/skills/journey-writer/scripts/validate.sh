#!/usr/bin/env bash
# validate.sh — audita .journey/ buscando refs orfas, frontmatter incompleto,
# last_review defasado e inconsistencia titulo-vs-arquivo.
#
# Uso: bash scripts/validate.sh [--root <path>] [--max-age-days N] [--json]
#
# Saida humana (default): blocos categorizados com contagens.
# Saida --json: estrutura para consumo por outros scripts ou agentes.
#
# Codigo de saida: 0 = OK, 1 = pendencias encontradas, 2 = erro de uso.

set -uo pipefail
# nao usar -e porque grep/sed retornam 1 em varios casos legitimos (no match)

ROOT="$(pwd)/.journey"
MAX_AGE_DAYS=30
JSON_OUT=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --root) ROOT="$2"; shift 2 ;;
    --max-age-days) MAX_AGE_DAYS="$2"; shift 2 ;;
    --json) JSON_OUT=1; shift ;;
    -h|--help)
      sed -n '1,15p' "$0"; exit 0 ;;
    *) echo "arg desconhecido: $1" >&2; exit 2 ;;
  esac
done

if [[ ! -d "$ROOT" ]]; then
  echo "erro: $ROOT nao existe" >&2
  exit 2
fi

declare -a ORPHAN_REFS=()
declare -a INCOMPLETE_FM=()
declare -a STALE_REVIEW=()
declare -a TITLE_MISMATCH=()
declare -a NO_SOURCES=()

EPISODES_DIR="$ROOT/episodes"
TODAY_TS=$(date +%s)

# 1. Refs orfas: grep por episodes/NNN em todos os md e checa se arquivo existe
if [[ -d "$EPISODES_DIR" ]]; then
  EXISTING_EPS=$(ls "$EPISODES_DIR" 2>/dev/null | grep -E '^[0-9]{3}-' | sed 's/\.md$//' | sort -u)
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    file="${line%%:*}"
    ref=$(echo "$line" | grep -oE 'episodes/[0-9]{3}-[a-z0-9.-]+' | head -1)
    [[ -z "$ref" ]] && continue
    slug="${ref#episodes/}"
    slug="${slug%.md}"
    if ! echo "$EXISTING_EPS" | grep -qx "$slug"; then
      ORPHAN_REFS+=("$file -> $ref")
    fi
  done < <(grep -rnE 'episodes/[0-9]{3}-[a-z0-9.-]+' "$ROOT" --include='*.md' 2>/dev/null || true)
fi

# 2. Frontmatter completo nos episodios + last_review defasado + title mismatch + sources
if [[ -d "$EPISODES_DIR" ]]; then
  for ep in "$EPISODES_DIR"/*.md; do
    [[ -f "$ep" ]] || continue
    base=$(basename "$ep" .md)
    fm=$(awk '/^---$/{c++; next} c==1{print} c>=2{exit}' "$ep")

    has_title=$(echo "$fm" | grep -c '^title:' || true)
    has_status=$(echo "$fm" | grep -c '^status:' || true)
    has_type=$(echo "$fm" | grep -c '^type:' || true)
    has_era=$(echo "$fm" | grep -c '^  era:' || true)
    has_lentes=$(echo "$fm" | grep -c '^  lentes:' || true)
    has_sources=$(echo "$fm" | grep -c '^  sources:' || true)

    missing=()
    [[ "$has_title" -eq 0 ]] && missing+=("title")
    [[ "$has_status" -eq 0 ]] && missing+=("status")
    [[ "$has_type" -eq 0 ]] && missing+=("type")
    [[ "$has_era" -eq 0 ]] && missing+=("metadata.era")
    [[ "$has_lentes" -eq 0 ]] && missing+=("metadata.lentes")

    if [[ ${#missing[@]} -gt 0 ]]; then
      INCOMPLETE_FM+=("$base: faltam ${missing[*]}")
    fi

    if [[ "$has_sources" -eq 0 ]]; then
      NO_SOURCES+=("$base")
    fi

    # title vs filename
    fm_title=$(echo "$fm" | grep '^title:' | sed -E 's/^title:\s*"?([^"]*)"?\s*$/\1/' | head -1)
    if [[ -n "$fm_title" ]]; then
      # extrai "EP-NNN" do title e do filename
      tnum=$(echo "$fm_title" | grep -oE 'EP-[0-9]+' | head -1 | sed 's/EP-//')
      fnum=$(echo "$base" | grep -oE '^[0-9]+')
      if [[ -n "$tnum" && -n "$fnum" && "$tnum" != "$fnum" ]]; then
        TITLE_MISMATCH+=("$base: title='$fm_title' fname=$fnum")
      fi
    fi

    # last_review defasado
    status=$(echo "$fm" | grep '^status:' | sed -E 's/^status:\s*"?([^"]*)"?\s*$/\1/' | head -1)
    review=$(echo "$fm" | grep '^  last_review:' | sed -E 's/^  last_review:\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2}).*$/\1/' | head -1)
    if [[ -n "$review" && "$status" != "publicado" ]]; then
      review_ts=$(date -d "$review" +%s 2>/dev/null || echo 0)
      if [[ "$review_ts" -gt 0 ]]; then
        age_days=$(( (TODAY_TS - review_ts) / 86400 ))
        if [[ "$age_days" -gt "$MAX_AGE_DAYS" ]]; then
          STALE_REVIEW+=("$base: $age_days dias (last_review=$review)")
        fi
      fi
    fi
  done
fi

# Output
total_issues=$(( ${#ORPHAN_REFS[@]} + ${#INCOMPLETE_FM[@]} + ${#STALE_REVIEW[@]} + ${#TITLE_MISMATCH[@]} ))

if [[ "$JSON_OUT" -eq 1 ]]; then
  printf '{\n'
  printf '  "root": "%s",\n' "$ROOT"
  printf '  "summary": { "orphan_refs": %d, "incomplete_frontmatter": %d, "stale_review": %d, "title_mismatch": %d, "no_sources": %d },\n' \
    "${#ORPHAN_REFS[@]}" "${#INCOMPLETE_FM[@]}" "${#STALE_REVIEW[@]}" "${#TITLE_MISMATCH[@]}" "${#NO_SOURCES[@]}"
  for cat in orphan_refs incomplete_frontmatter stale_review title_mismatch no_sources; do
    case "$cat" in
      orphan_refs) arr=("${ORPHAN_REFS[@]:-}") ;;
      incomplete_frontmatter) arr=("${INCOMPLETE_FM[@]:-}") ;;
      stale_review) arr=("${STALE_REVIEW[@]:-}") ;;
      title_mismatch) arr=("${TITLE_MISMATCH[@]:-}") ;;
      no_sources) arr=("${NO_SOURCES[@]:-}") ;;
    esac
    printf '  "%s": [' "$cat"
    first=1
    for item in "${arr[@]}"; do
      [[ -z "$item" ]] && continue
      [[ $first -eq 0 ]] && printf ','
      printf '\n    %s' "$(printf '%s' "$item" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')"
      first=0
    done
    if [[ "$cat" != "no_sources" ]]; then
      printf '\n  ],\n'
    else
      printf '\n  ]\n'
    fi
  done
  printf '}\n'
else
  echo "validate.sh @ $ROOT"
  echo "================================"
  echo
  echo "[refs orfas: ${#ORPHAN_REFS[@]}]"
  for r in "${ORPHAN_REFS[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "[frontmatter incompleto: ${#INCOMPLETE_FM[@]}]"
  for r in "${INCOMPLETE_FM[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "[last_review > $MAX_AGE_DAYS dias: ${#STALE_REVIEW[@]}]"
  for r in "${STALE_REVIEW[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "[title vs filename: ${#TITLE_MISMATCH[@]}]"
  for r in "${TITLE_MISMATCH[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "[eps sem metadata.sources: ${#NO_SOURCES[@]}]"
  for r in "${NO_SOURCES[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "================================"
  echo "total pendencias acionaveis: $total_issues"
fi

[[ "$total_issues" -gt 0 ]] && exit 1 || exit 0
