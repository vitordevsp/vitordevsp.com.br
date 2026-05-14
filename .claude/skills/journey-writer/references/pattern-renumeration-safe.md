---
title: Pattern de renumeracao segura de episodios
description: Como renomear, inserir ou reordenar episodios em .journey/episodes/ sem quebrar refs cruzadas em hero, timeline, content-seeds, open-questions, README e nos proprios eps.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 21:30
  version: "1.0.0"
---

# Pattern de renumeracao segura de episodios

## Objetivo

Permitir reorganizar a cronologia dos episodios (inserir ep no meio, fundir dois, dividir um, renomear) sem deixar refs orfas em outros arquivos. Aprendizado vivido nesta base: renomeacoes feitas sem padrao causam refs quebradas dificeis de detectar a olho nu — `grep` final e obrigatorio.

## Quando aplicar

- cronologia ficou clara depois de novos eps terem entrado;
- novo ep precisa entrar no meio da sequencia existente;
- meta-ep precisa mudar de posicao;
- titulo do ep mudou e arquivo precisa ser renomeado;
- fusao ou divisao de eps existentes.

## Quando nao aplicar

- ep recem-criado ainda sem refs em outros arquivos (mv direto sem ritual);
- so atualizar conteudo do ep, sem mudar o nome do arquivo.

## Procedimento

### 1. Mapear renomeacoes antes de tocar nos arquivos

Construa explicitamente a tabela antigo -> novo. Exemplo real:

```text
Old              New
003-segundo-reset.md       -> 005-v32-nasce-com-sdd.md
004-docs-flat.md           -> 006-docs-flat.md
005-skills.md              -> 007-skills.md
006-dez-plans.md           -> 008-dez-plans.md
007-reset-marca.md         -> 004-reset-marca.md
008-notion-fio.md          -> DELETE (conteudo absorvido em 002, 003, 004)
NEW                        -> 003-v3-e-v3.1.md
NEW                        -> 009-criacao-journey.md
```

### 2. Identificar conflitos de mv

Se o destino ja esta ocupado, o `mv` direto colide. Vacate-then-fill:

- liberar destino primeiro (mv para target livre ou DELETE);
- so depois mover origem para destino vacated.

### 3. Ordem topologica segura

Sequencia que evita colisao. Para o exemplo acima:

```bash
# 1. Apagar arquivos a deletar (libera slots)
rm episodes/008-notion-fio.md

# 2. Mover na ordem que cada destino e liberado pelo passo anterior
mv episodes/006-dez-plans.md episodes/008-dez-plans.md  # 006 livre, 008 livre apos rm
mv episodes/004-docs-flat.md episodes/006-docs-flat.md  # 004 livre, 006 livre apos mv anterior
mv episodes/007-reset-marca.md episodes/004-reset-marca.md  # 007 livre, 004 livre apos mv anterior
mv episodes/005-skills.md episodes/007-skills.md  # 005 livre, 007 livre apos mv anterior
mv episodes/003-segundo-reset.md episodes/005-v32-nasce-com-sdd.md  # 003 livre, 005 livre apos mv anterior

# 3. Criar arquivos novos nos slots agora vagos
# (Write novo conteudo em 003-v3-e-v3.1.md e 009-criacao-journey.md)
```

Regra geral: vai do **destino mais alto** para o mais baixo se aumentando numero, ou inverso se diminuindo. Cascade.

### 4. Cuidados pos-mv

- **mv quebra harness file tracking.** Apos `mv`, o agente precisa rodar `Read` no arquivo no novo path antes do primeiro `Edit`. Sem isso, edit falha com "File has not been read yet".
- Cabecalho interno do arquivo (`# EP-NNN - Titulo`) e frontmatter (`title: EP-NNN - ...`) ainda mostram o numero antigo. Editar para o numero novo.

### 5. Atualizar refs cruzadas

Renumeracao quebra refs em **multiplos** arquivos. Checar todos:

- **`hero.md`** — busca links a `episodes/XXX-...`;
- **`timeline.md`** — links + "Mapa rapido de status";
- **`open-questions.md`** — tags `[origem: ep-NNN]` + links de respostas resolvidas;
- **`seeds/content-seeds.md`** — Origem de cada semente;
- **`notes/raw-insights.md`** — anotacoes `[promovido para: <destino>]`;
- **`README.md`** da `.journey/` — arvore + porta de entrada;
- **Outros eps** — links cruzados (`ver EP-NNN`, `Ver tambem: <arquivo>`);
- **`CHANGELOG.md`** raiz — se ja existir e citar eps.

### 6. Atualizar frontmatter `metadata.sources.derived_from` em eps meta

Eps `type: meta` listam slugs de eps cronologicos. Se algum slug mudou, atualizar.

### 7. Bumpar `metadata.sources.last_review` nos eps tocados

Renomeacao conta como toque em sources (mesmo sem mudar conteudo).

### 8. Validacao final

Comando de auditoria:

```bash
# refs orfas (eps citados que nao existem mais)
grep -rE "episodes/00[0-9]" .journey 2>/dev/null | grep -vE "<lista-de-slugs-validos>" \
  || echo "OK - sem refs orfas"

# arquivos sem frontmatter (eps que perderam frontmatter no processo)
for f in .journey/episodes/*.md; do
  head -1 "$f" | grep -q "^---$" || echo "FALTA frontmatter: $f"
done

# titulos internos vs nome do arquivo (consistencia)
for f in .journey/episodes/*.md; do
  fname=$(basename "$f" .md)
  num=$(echo "$fname" | cut -d- -f1)
  grep -q "^title: EP-$num " "$f" || echo "INCONSISTENTE: $f"
done
```

### 9. Atualizar mapa em `timeline.md`

Tabela de status no rodape do `timeline.md` deve refletir os slugs atuais:

```markdown
| # | Episodio | Status | Tipo | Era |
|---|---|---|---|---|
| 001 | `001-introducao` | draft | introducao | atemporal |
| ... |
```

### 10. Atualizar `version-history.md` se aplicavel

Renomeacao de eps em si nao bumpa versao da skill. Mas se a renomeacao expor um pattern novo ou mudar contrato, considerar bump.

## Antipadroes

- usar `git mv` durante reorganizacao em massa — git pode falhar se arquivo nao esta tracked ou se ha conflitos intermediarios;
- mv em paralelo (varios `mv` em batch sem ordem topologica) — colisoes silenciosas;
- esquecer de rodar `Read` antes de `Edit` apos mv;
- editar so o nome do arquivo sem atualizar `# EP-NNN` interno e `title:` no frontmatter;
- pular grep de validacao final;
- nao atualizar mapa em `timeline.md`.

## Exemplo de saida apos validacao

```text
--- priority remanescente em eps ---
OK - nenhum
--- ## Status remanescente em eps ---
OK - nenhum
--- 000-template ainda referenciado ---
OK - nenhum (so em instrucoes "nao criar")
--- arvore final ---
001-introducao.md
002-v1-e-v2.md
...
```

Esse formato de relatorio fecha a operacao com confianca.

## Quando criar uma renomeacao precisa ser explicito ao usuario

- mudancas em mais de 3 eps;
- mudanca de titulo + numero juntos;
- fusao ou divisao de eps;
- delecao de ep com conteudo a absorver em outros.

Nessas situacoes, mostrar tabela antigo -> novo + mapa de absorcao (se aplicavel) ao usuario antes de executar. Validacao via `AskUserQuestion` reduz retrabalho.
