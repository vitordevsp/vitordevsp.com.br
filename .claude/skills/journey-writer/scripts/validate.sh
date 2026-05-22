#!/usr/bin/env bash
# validate.sh — audita .journey/ (eps flat legado + pacotes v2)
#
# Uso: bash scripts/validate.sh [--root <path>] [--max-age-days N] [--json]

set -uo pipefail

ROOT="$(pwd)/.journey"
MAX_AGE_DAYS=30
JSON_OUT=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --root) ROOT="$2"; shift 2 ;;
    --max-age-days) MAX_AGE_DAYS="$2"; shift 2 ;;
    --json) JSON_OUT=1; shift ;;
    -h|--help) sed -n '1,12p' "$0"; exit 0 ;;
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
declare -a LEGACY_FLAT=()
declare -a PACKAGE_ISSUES=()

EPISODES_DIR="$ROOT/episodes"
TODAY_TS=$(date +%s)

# Slugs existentes (flat .md ou pacote NNN-slug/episode.md)
declare -a EXISTING_SLUGS=()
if [[ -d "$EPISODES_DIR" ]]; then
  for f in "$EPISODES_DIR"/*.md; do
    [[ -f "$f" ]] || continue
    base=$(basename "$f" .md)
    [[ "$base" =~ ^[0-9]{3}-.* ]] || continue
    EXISTING_SLUGS+=("$base")
  done
  for d in "$EPISODES_DIR"/*/; do
    [[ -d "$d" ]] || continue
    [[ -f "${d}episode.md" ]] && EXISTING_SLUGS+=("$(basename "$d")")
  done
fi

slug_exists() {
  local s="$1"
  local x
  for x in "${EXISTING_SLUGS[@]}"; do
    [[ "$x" == "$s" ]] && return 0
  done
  return 1
}

# 1. Refs orfas
if [[ -d "$EPISODES_DIR" ]]; then
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    file="${line%%:*}"
    ref=$(echo "$line" | grep -oE 'episodes/[0-9]{3}-[a-z0-9.-]+(\.md|/episode\.md)?' | head -1)
    [[ -z "$ref" ]] && continue
    slug="${ref#episodes/}"
    slug="${slug%/episode.md}"
    slug="${slug%.md}"
    if ! slug_exists "$slug"; then
      ORPHAN_REFS+=("$file -> $ref")
    fi
  done < <(grep -rnE 'episodes/[0-9]{3}-[a-z0-9.-]+' "$ROOT" --include='*.md' 2>/dev/null | grep -v '/sources/' || true)
fi

audit_ep_file() {
  local ep="$1"
  local base="$2"
  local fm
  fm=$(awk '/^---$/{c++; next} c==1{print} c>=2{exit}' "$ep")

  local has_title has_status has_type has_era has_lentes has_sources
  has_title=$(echo "$fm" | grep -c '^title:' || true)
  has_status=$(echo "$fm" | grep -c '^status:' || true)
  has_type=$(echo "$fm" | grep -c '^type:' || true)
  has_era=$(echo "$fm" | grep -c '^  era:' || true)
  has_lentes=$(echo "$fm" | grep -c '^  lentes:' || true)
  has_sources=$(echo "$fm" | grep -c '^  sources:' || true)

  local missing=()
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

  local fm_title tnum fnum
  fm_title=$(echo "$fm" | grep '^title:' | sed -E 's/^title:\s*"?([^"]*)"?\s*$/\1/' | head -1)
  if [[ -n "$fm_title" ]]; then
    tnum=$(echo "$fm_title" | grep -oE 'EP-[0-9]+' | head -1 | sed 's/EP-//')
    fnum=$(echo "$base" | grep -oE '^[0-9]+')
    if [[ -n "$tnum" && -n "$fnum" && "$tnum" != "$fnum" ]]; then
      TITLE_MISMATCH+=("$base: title='$fm_title' fname=$fnum")
    fi
  fi

  local status review
  status=$(echo "$fm" | grep '^status:' | sed -E 's/^status:\s*"?([^"]*)"?\s*$/\1/' | head -1)
  review=$(echo "$fm" | grep '^  last_review:' | sed -E 's/^  last_review:\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2}).*$/\1/' | head -1)
  if [[ -n "$review" && "$status" != "publicado" ]]; then
    local review_ts age_days
    review_ts=$(date -d "$review" +%s 2>/dev/null || echo 0)
    if [[ "$review_ts" -gt 0 ]]; then
      age_days=$(( (TODAY_TS - review_ts) / 86400 ))
      if [[ "$age_days" -gt "$MAX_AGE_DAYS" ]]; then
        STALE_REVIEW+=("$base: $age_days dias (last_review=$review)")
      fi
    fi
  fi
}

# 2. Flat legado
if [[ -d "$EPISODES_DIR" ]]; then
  for ep in "$EPISODES_DIR"/*.md; do
    [[ -f "$ep" ]] || continue
    base=$(basename "$ep" .md)
    [[ "$base" =~ ^[0-9]{3}-.* ]] || continue
    audit_ep_file "$ep" "$base"
    if grep -q '^    sessions:' "$ep" 2>/dev/null || grep -q '^  sessions:' "$ep" 2>/dev/null; then
      LEGACY_FLAT+=("$base: lista sessions no frontmatter — migrar para pacote + digests")
    fi
  done
fi

# 3. Pacotes v2
if [[ -d "$EPISODES_DIR" ]]; then
  for pkg in "$EPISODES_DIR"/*/; do
    [[ -d "$pkg" ]] || continue
    epfile="${pkg}episode.md"
    [[ -f "$epfile" ]] || continue
    base=$(basename "$pkg")
    audit_ep_file "$epfile" "$base"

    index="${pkg}sources/INDEX.md"
    if [[ ! -f "$index" ]]; then
      PACKAGE_ISSUES+=("$base: falta sources/INDEX.md")
      continue
    fi

    has_index_ref=$(echo "$(awk '/^---$/{c++; next} c==1{print} c>=2{exit}' "$epfile")" | grep -c 'index:' || true)
    if [[ "$has_index_ref" -eq 0 ]]; then
      PACKAGE_ISSUES+=("$base: metadata.sources.index ausente no episode.md")
    fi

    conv_dir="${pkg}sources/conversations"
    if [[ -d "$conv_dir" ]]; then
      while IFS= read -r digest; do
        [[ -z "$digest" ]] && continue
        dbase=$(basename "$digest")
        if ! grep -qF "$dbase" "$index" 2>/dev/null; then
          PACKAGE_ISSUES+=("$base: digest $dbase nao listado em sources/INDEX.md")
        fi
        dfm=$(awk '/^---$/{c++; next} c==1{print} c>=2{exit}' "$digest")
        if ! echo "$dfm" | grep -qE '^  path:' && ! echo "$dfm" | grep -q 'path: unknown'; then
          PACKAGE_ISSUES+=("$base: $dbase sem storage.path")
        fi
        if ! echo "$dfm" | grep -qE '^  id: (claude-code|cursor|codex|antigravity|claude-web|chatgpt|gemini|other)'; then
          PACKAGE_ISSUES+=("$base: $dbase sem tool.id valido")
        fi
      done < <(find "$conv_dir" -maxdepth 1 -name '*.md' -type f 2>/dev/null)
    fi
  done
fi

total_issues=$(( ${#ORPHAN_REFS[@]} + ${#INCOMPLETE_FM[@]} + ${#STALE_REVIEW[@]} + ${#TITLE_MISMATCH[@]} + ${#NO_SOURCES[@]} + ${#PACKAGE_ISSUES[@]} ))

if [[ "$JSON_OUT" -eq 1 ]]; then
  printf '{"root":"%s","legacy_flat_warnings":%d,"summary":{"orphan_refs":%d,"incomplete_frontmatter":%d,"stale_review":%d,"title_mismatch":%d,"no_sources":%d,"package_issues":%d}}\n' \
    "$ROOT" "${#LEGACY_FLAT[@]}" "${#ORPHAN_REFS[@]}" "${#INCOMPLETE_FM[@]}" "${#STALE_REVIEW[@]}" "${#TITLE_MISMATCH[@]}" "${#NO_SOURCES[@]}" "${#PACKAGE_ISSUES[@]}"
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
  echo "[pacote v2: ${#PACKAGE_ISSUES[@]}]"
  for r in "${PACKAGE_ISSUES[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "[aviso migracao flat: ${#LEGACY_FLAT[@]}]"
  for r in "${LEGACY_FLAT[@]:-}"; do [[ -n "$r" ]] && echo "  - $r"; done
  echo
  echo "================================"
  echo "total pendencias acionaveis: $total_issues"
fi

[[ "$total_issues" -gt 0 ]] && exit 1 || exit 0
