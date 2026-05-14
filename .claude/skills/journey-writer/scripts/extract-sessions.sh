#!/usr/bin/env bash
# extract-sessions.sh — lista sessoes Claude Code do projeto atual com filtros
# definidos via 5+ perguntas interativas. Saida pronta para o agente decidir
# quais .jsonl ler em detalhe via extract-conversation.sh.
#
# Uso:
#   bash scripts/extract-sessions.sh                       # modo interativo (default)
#   bash scripts/extract-sessions.sh --non-interactive \   # modo headless (CI/agente)
#        --periodo all|YYYY-MM-DD..YYYY-MM-DD \
#        --branches all|current|<lista> \
#        --min-size-kb N \
#        --include-empty yes|no \
#        --order date-asc|date-desc|size-desc \
#        --format table|json
#
# Pre-requisito: jq.

set -uo pipefail
# nao usar -e: jq | head causa SIGPIPE em arquivos grandes (exit 141) que
# combinado com pipefail mataria o script.

PROJECT_ROOT="$(pwd)"
ENCODED_CWD=$(echo "$PROJECT_ROOT" | sed -e 's|/|-|g' -e 's|\.|-|g')
SESSIONS_DIR="$HOME/.claude/projects/$ENCODED_CWD"

if ! command -v jq >/dev/null 2>&1; then
  echo "erro: jq nao instalado. instale jq antes de continuar." >&2
  exit 2
fi

if [[ ! -d "$SESSIONS_DIR" ]]; then
  echo "erro: $SESSIONS_DIR nao existe" >&2
  echo "       encoded_cwd derivado de: $PROJECT_ROOT" >&2
  exit 2
fi

INTERACTIVE=1
PERIODO="all"
BRANCHES_FILTER="all"
MIN_SIZE_KB=0
INCLUDE_EMPTY="no"
ORDER="date-asc"
FORMAT="table"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --non-interactive) INTERACTIVE=0; shift ;;
    --periodo) PERIODO="$2"; shift 2 ;;
    --branches) BRANCHES_FILTER="$2"; shift 2 ;;
    --min-size-kb) MIN_SIZE_KB="$2"; shift 2 ;;
    --include-empty) INCLUDE_EMPTY="$2"; shift 2 ;;
    --order) ORDER="$2"; shift 2 ;;
    --format) FORMAT="$2"; shift 2 ;;
    -h|--help) sed -n '1,20p' "$0"; exit 0 ;;
    *) echo "arg desconhecido: $1" >&2; exit 2 ;;
  esac
done

if [[ "$INTERACTIVE" -eq 1 ]]; then
  echo "extract-sessions.sh — modo interativo"
  echo "projeto: $PROJECT_ROOT"
  echo "sessoes em: $SESSIONS_DIR"
  echo

  # Pergunta 1: periodo
  echo "[1/6] Periodo a contemplar"
  echo "  - 'all'                              -> todas as sessoes do projeto"
  echo "  - 'YYYY-MM-DD..YYYY-MM-DD'           -> intervalo fechado"
  echo "  - 'YYYY-MM-DD..'                     -> a partir desta data"
  echo "  - '..YYYY-MM-DD'                     -> ate esta data"
  read -r -p "  resposta [all]: " ans
  PERIODO="${ans:-all}"

  # Pergunta 2: branches
  echo
  echo "[2/6] Branches a incluir"
  current_branch=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "nao-git")
  echo "  - 'all'                              -> todas as branches que aparecerem"
  echo "  - 'current'                          -> so '$current_branch' (branch atual)"
  echo "  - 'branch1,branch2'                  -> lista separada por virgula"
  read -r -p "  resposta [all]: " ans
  BRANCHES_FILTER="${ans:-all}"

  # Pergunta 3: tamanho minimo
  echo
  echo "[3/6] Tamanho minimo da sessao em KB (descarta sessoes muito pequenas)"
  echo "  - '0'                                -> nenhum filtro"
  echo "  - '10'                               -> >= 10 KB (recomendado pra cortar ruido)"
  read -r -p "  resposta [10]: " ans
  MIN_SIZE_KB="${ans:-10}"

  # Pergunta 4: incluir sessoes vazias
  echo
  echo "[4/6] Incluir sessoes sem mensagem do usuario?"
  echo "  - 'no'                               -> filtra sessoes que so tem assistant/tool (recomendado)"
  echo "  - 'yes'                              -> inclui tudo"
  read -r -p "  resposta [no]: " ans
  INCLUDE_EMPTY="${ans:-no}"

  # Pergunta 5: ordenacao
  echo
  echo "[5/6] Ordenacao da saida"
  echo "  - 'date-asc'                         -> mais antigas primeiro (recomendado pra cronologia)"
  echo "  - 'date-desc'                        -> mais recentes primeiro"
  echo "  - 'size-desc'                        -> maiores primeiro (pra ranquear densidade)"
  read -r -p "  resposta [date-asc]: " ans
  ORDER="${ans:-date-asc}"

  # Pergunta 6: formato
  echo
  echo "[6/6] Formato da saida"
  echo "  - 'table'                            -> tabela legivel (recomendado pra leitura humana)"
  echo "  - 'json'                             -> json estruturado (pra outros scripts)"
  read -r -p "  resposta [table]: " ans
  FORMAT="${ans:-table}"

  echo
  echo "filtros confirmados:"
  echo "  periodo:       $PERIODO"
  echo "  branches:      $BRANCHES_FILTER"
  echo "  min-size-kb:   $MIN_SIZE_KB"
  echo "  include-empty: $INCLUDE_EMPTY"
  echo "  order:         $ORDER"
  echo "  format:        $FORMAT"
  echo
  read -r -p "executar? [Y/n] " ans
  if [[ "${ans:-Y}" =~ ^[Nn] ]]; then
    echo "cancelado."; exit 0
  fi
  echo
fi

# Parse periodo
PERIODO_INI=""
PERIODO_FIM=""
if [[ "$PERIODO" != "all" ]]; then
  PERIODO_INI="${PERIODO%%..*}"
  PERIODO_FIM="${PERIODO##*..}"
  [[ "$PERIODO_INI" == "$PERIODO" ]] && PERIODO_INI=""
fi

# Parse branches
if [[ "$BRANCHES_FILTER" == "current" ]]; then
  current_branch=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  BRANCH_LIST="$current_branch"
elif [[ "$BRANCHES_FILTER" == "all" ]]; then
  BRANCH_LIST=""
else
  BRANCH_LIST="$BRANCHES_FILTER"
fi

# Coleta dados de cada sessao
TMP=$(mktemp)
trap "rm -f $TMP" EXIT

for f in "$SESSIONS_DIR"/*.jsonl; do
  [[ -f "$f" ]] || continue
  id=$(basename "$f" .jsonl)
  size_b=$(stat -c %s "$f" 2>/dev/null || stat -f %z "$f")
  size_kb=$(( size_b / 1024 ))

  [[ "$size_kb" -lt "$MIN_SIZE_KB" ]] && continue

  branch=$(jq -r 'select(.gitBranch != null) | .gitBranch' "$f" 2>/dev/null | sort -u | head -1)
  [[ -z "$branch" ]] && branch="(none)"

  first_ts=$(jq -r 'select(.timestamp != null) | .timestamp' "$f" 2>/dev/null | sort | head -1)
  last_ts=$(jq -r 'select(.timestamp != null) | .timestamp' "$f" 2>/dev/null | sort | tail -1)
  first_date="${first_ts:0:10}"
  last_date="${last_ts:0:10}"

  user_msgs=$(jq -r 'select(.type=="user") | .message.content
    | if type=="array" then (.[] | select(.type=="text") | .text) else . end' "$f" 2>/dev/null | grep -cv '^$' || true)

  if [[ "$INCLUDE_EMPTY" == "no" && "$user_msgs" -eq 0 ]]; then
    continue
  fi

  # Filtro de periodo
  if [[ -n "$PERIODO_INI" && -n "$first_date" && "$first_date" < "$PERIODO_INI" ]]; then continue; fi
  if [[ -n "$PERIODO_FIM" && -n "$first_date" && "$first_date" > "$PERIODO_FIM" ]]; then continue; fi

  # Filtro de branches
  if [[ -n "$BRANCH_LIST" ]]; then
    match=0
    IFS=',' read -ra blist <<< "$BRANCH_LIST"
    for b in "${blist[@]}"; do
      b_trim=$(echo "$b" | xargs)
      [[ "$branch" == "$b_trim" ]] && match=1 && break
    done
    [[ "$match" -eq 0 ]] && continue
  fi

  echo "$first_date|$last_date|$branch|$id|$size_kb|$user_msgs" >> "$TMP"
done

# Ordenacao
case "$ORDER" in
  date-asc)   sort -t'|' -k1,1 "$TMP" > "$TMP.sorted" ;;
  date-desc)  sort -t'|' -k1,1 -r "$TMP" > "$TMP.sorted" ;;
  size-desc)  sort -t'|' -k5,5n -r "$TMP" > "$TMP.sorted" ;;
  *)          sort -t'|' -k1,1 "$TMP" > "$TMP.sorted" ;;
esac
mv "$TMP.sorted" "$TMP"

# Output
total=$(wc -l < "$TMP")

if [[ "$FORMAT" == "json" ]]; then
  echo "{"
  echo "  \"project\": \"$PROJECT_ROOT\","
  echo "  \"filters\": {"
  echo "    \"periodo\": \"$PERIODO\","
  echo "    \"branches\": \"$BRANCHES_FILTER\","
  echo "    \"min_size_kb\": $MIN_SIZE_KB,"
  echo "    \"include_empty\": \"$INCLUDE_EMPTY\","
  echo "    \"order\": \"$ORDER\""
  echo "  },"
  echo "  \"total\": $total,"
  echo "  \"sessions\": ["
  first=1
  while IFS='|' read -r fd ld br id sz um; do
    [[ $first -eq 0 ]] && echo ","
    printf '    {"id":"%s","branch":"%s","first_date":"%s","last_date":"%s","size_kb":%s,"user_msgs":%s}' \
      "$id" "$br" "$fd" "$ld" "$sz" "$um"
    first=0
  done < "$TMP"
  echo
  echo "  ]"
  echo "}"
else
  echo "extract-sessions.sh @ $PROJECT_ROOT"
  echo "filtros: periodo=$PERIODO branches=$BRANCHES_FILTER min-kb=$MIN_SIZE_KB empty=$INCLUDE_EMPTY order=$ORDER"
  echo "total: $total sessoes"
  echo
  printf '%-12s %-12s %-22s %-38s %8s %8s\n' "FIRST" "LAST" "BRANCH" "SESSION_ID" "SIZE_KB" "USR_MSG"
  printf '%-12s %-12s %-22s %-38s %8s %8s\n' "------" "------" "------" "----------" "-------" "-------"
  while IFS='|' read -r fd ld br id sz um; do
    printf '%-12s %-12s %-22s %-38s %8s %8s\n' "$fd" "$ld" "${br:0:22}" "$id" "$sz" "$um"
  done < "$TMP"
fi
