#!/usr/bin/env bash
# extract-conversation.sh — extrai conversa completa de uma sessao .jsonl,
# intercalando USER e ASSISTANT como se fosse pair-programming. Texto do
# assistant e tao importante quanto o do usuario: e nele que aparecem
# diagnosticos, decisoes, raciocinio e propostas.
#
# Por padrao, descarta blocos tool_use/tool_result (ruido alto). Use --include-tools
# para incluir um sumario por tool call.
#
# Uso:
#   bash scripts/extract-conversation.sh <session-id>
#   bash scripts/extract-conversation.sh <session-id> --include-tools
#   bash scripts/extract-conversation.sh <session-id> --format markdown|plain
#   bash scripts/extract-conversation.sh <session-id> --grep "<keyword>"
#   bash scripts/extract-conversation.sh <session-id> --range 50:120
#
# Saida vai para stdout. Redirecione para arquivo se quiser persistir.

set -uo pipefail
# nao usar -e: jq/grep podem retornar non-zero em casos legitimos (sem match,
# SIGPIPE em pipes).

if ! command -v jq >/dev/null 2>&1; then
  echo "erro: jq nao instalado" >&2; exit 2
fi

SESSION_ID=""
INCLUDE_TOOLS=0
FORMAT="markdown"
GREP_PATTERN=""
RANGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --include-tools) INCLUDE_TOOLS=1; shift ;;
    --format) FORMAT="$2"; shift 2 ;;
    --grep) GREP_PATTERN="$2"; shift 2 ;;
    --range) RANGE="$2"; shift 2 ;;
    -h|--help) sed -n '1,18p' "$0"; exit 0 ;;
    *)
      if [[ -z "$SESSION_ID" ]]; then SESSION_ID="$1"; shift
      else echo "arg extra: $1" >&2; exit 2
      fi ;;
  esac
done

if [[ -z "$SESSION_ID" ]]; then
  echo "uso: extract-conversation.sh <session-id> [opcoes]" >&2; exit 2
fi

PROJECT_ROOT="$(pwd)"
ENCODED_CWD=$(echo "$PROJECT_ROOT" | sed -e 's|/|-|g' -e 's|\.|-|g')
SESSION_FILE="$HOME/.claude/projects/$ENCODED_CWD/$SESSION_ID.jsonl"

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "erro: sessao nao encontrada: $SESSION_FILE" >&2; exit 2
fi

# Extrai turnos. Cada evento user/assistant vira um turno.
# - user.message.content pode ser string ou array de blocos (text|tool_result)
# - assistant.message.content e array de blocos (text|tool_use|thinking)
# Output normalizado: TIMESTAMP|ROLE|KIND|TEXT
# KIND: text | tool_use | tool_result (tool_use/tool_result filtrados a menos que --include-tools)

TMP=$(mktemp)
trap "rm -f $TMP" EXIT

jq -r --argjson incl "$INCLUDE_TOOLS" '
  select(.type=="user" or .type=="assistant") |
  . as $evt |
  ($evt.timestamp // "") as $ts |
  ($evt.type) as $role |
  ($evt.message.content) as $c |
  if ($c | type) == "string" then
    [$ts, $role, "text", $c]
  elif ($c | type) == "array" then
    $c[] |
    if .type == "text" then [$ts, $role, "text", .text]
    elif .type == "tool_use" and $incl == 1 then
      [$ts, $role, "tool_use", "[\(.name)] " + ((.input // {}) | tostring | .[0:200])]
    elif .type == "tool_result" and $incl == 1 then
      [$ts, $role, "tool_result", ((.content // "") | if type=="array" then (map(.text // "") | join(" ")) else . end | tostring | .[0:200])]
    else empty
    end
  else empty
  end |
  @tsv
' "$SESSION_FILE" > "$TMP"

# Range
if [[ -n "$RANGE" ]]; then
  ini="${RANGE%%:*}"
  fim="${RANGE##*:}"
  sed -n "${ini},${fim}p" "$TMP" > "$TMP.r" && mv "$TMP.r" "$TMP"
fi

# Grep
if [[ -n "$GREP_PATTERN" ]]; then
  grep -i "$GREP_PATTERN" "$TMP" > "$TMP.g" || true
  mv "$TMP.g" "$TMP"
fi

total_turns=$(wc -l < "$TMP")

if [[ "$FORMAT" == "plain" ]]; then
  while IFS=$'\t' read -r ts role kind text; do
    [[ -z "$role" ]] && continue
    [[ "$kind" != "text" && "$INCLUDE_TOOLS" -eq 0 ]] && continue
    label=$(echo "$role" | tr '[:lower:]' '[:upper:]')
    [[ "$kind" != "text" ]] && label="$label/$kind"
    echo "[$ts] $label:"
    echo "$text" | sed 's/\\n/\n/g'
    echo
  done < "$TMP"
else
  echo "# Conversa — $SESSION_ID"
  echo
  echo "Projeto: \`$PROJECT_ROOT\`"
  echo "Turnos exibidos: $total_turns"
  [[ -n "$GREP_PATTERN" ]] && echo "Filtro grep: \`$GREP_PATTERN\`"
  [[ -n "$RANGE" ]] && echo "Range: \`$RANGE\`"
  echo
  echo "---"
  echo
  while IFS=$'\t' read -r ts role kind text; do
    [[ -z "$role" ]] && continue
    if [[ "$role" == "user" ]]; then
      heading="## USER"
    else
      heading="## ASSISTANT"
    fi
    [[ "$kind" != "text" ]] && heading="$heading _($kind)_"
    echo "$heading"
    echo "_${ts}_"
    echo
    echo "$text" | sed 's/\\n/\n/g'
    echo
  done < "$TMP"
fi
