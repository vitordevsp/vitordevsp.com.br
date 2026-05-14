---
title: EP-006 - docs/ inflou e virou flat
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 16:50
  updated_at: 2026-05-13 19:00
  tags:
    - episode
    - cronologico
    - docs
    - arquitetura-documental
    - dois-agentes
  era: v3.2
  lentes:
    - atrito
    - descoberta
    - metodo
  sources:
    sessions:
      - id: 796e894d-0acb-4454-9108-1a6755b5b1a4
        date: 2026-05-08
        relevance: primary
        summary: prompt inicial do scaffold categorizado de docs/
      - id: df9a9cbe-0ef1-4d43-b1dd-0ea9bb9b7b5f
        date: 2026-05-08
        relevance: secondary
        summary: pedido "claude.md mais flat" + commits convencionais
      - id: 748c1940-398e-419a-8ab2-38107bb479f3
        date: 2026-05-12
        relevance: primary
        summary: diagnostico cruzado, numeros (5921 -> 2335), consolidacao em flat, ADRs enxutos
    commits:
      - a90a144
      - 3a91d78
      - 1ae4ffc
      - 16af8bd
      - 4f080ee
    files:
      - docs/
      - docs/decisions/
    last_review: 2026-05-13 20:15
---

# EP-006 — `docs/` inflou e virou flat

## Gancho

A primeira versao de `docs/` chegou inflada por dois agentes em sequencia. O conteudo bruto foi gerado em uma conversa com ChatGPT, dumpado no repositorio, e expandido em cinco subpastas semanticas com Claude Code (commit `a90a144`, 2026-05-08).

Quatro dias depois, a mesma estrutura foi apagada (commit `1ae4ffc`, 2026-05-12). O motivo: "docs ficou muito inflada com informacoes que podem ser menos repetitivas e arquivos mais flat".

A frase "mais flat" virou refrao da branch.

## Contexto

Pos-reset, o projeto precisava de uma camada documental para sustentar o modo de trabalho com agentes. Pipeline inicial:

1. **ChatGPT** gerou o conteudo bruto a partir de uma conversa exploratoria sobre o projeto;
2. esse material foi colado no repositorio;
3. **Claude Code** estruturou em pastas semanticas (`product/`, `architecture/`, `agent/`, `decisions/`, `reference/`) e preencheu cada arquivo.

Em 2026-05-08, dois commits sequenciais executaram essa intuicao:

- `a90a144` reestruturou o guia do projeto e adicionou a camada documental categorizada;
- `3a91d78` preencheu o scaffold com conteudo inicial.

Funcionou enquanto a estrutura estava vazia. Quando comecou a ser preenchida com material gerado em outra ferramenta + reescrito por agente local, o problema apareceu.

## Conflito

Apos quatro dias preenchidos, `docs/` tinha:

- **19 arquivos** distribuidos em **5 subpastas** (`product/` 5, `architecture/` 4, `agent/` 3, `decisions/` 6 ADRs, `reference/` 1);
- **5921 linhas** totais;
- **redundancia estimada em 30-40%** do conteudo, com a mesma informacao aparecendo em 2 ou mais arquivos;
- **stack e restricoes do MVP duplicadas em 8 arquivos diferentes** (top redundancia detectada);
- **modelos internos (`TextPost`, `Project`, `Video`...) listados em 5 arquivos** (`README.md`, `content-model.md`, `architecture/overview.md` + 2);
- secoes "Criterio de sucesso" e "O que evitar" duplicadas entre `product/` e `agent/`;
- ADRs longos (varias dezenas a centenas de linhas cada) com explicacao + contexto + alternativas misturados.

Cada subpasta puxava ceremoniosamente um README, um `index`, um conjunto de links cruzados. Cada categoria empurrava o agente a preencher uma caixa, e cada caixa preenchida produzia repeticao com a anterior.

A documentacao nao estava errada. Estava inflada. E a inflacao tinha duas fontes: conteudo bruto gerado em ChatGPT que repetia conceitos em angulos diferentes, mais a pressao estrutural das subpastas que pediam para ser preenchidas.

Pior: o sinal de inflacao so apareceu depois que a estrutura ja existia. Categorizar cedo cria pressao para preencher; a pressao produz redundancia; a redundancia so e visivel quando ja ha o que comparar.

## Virada

Em 2026-05-12, instrucao explicita ao agente: "Criei uma pasta docs para esse projeto mas acho que ela ficou muito inflada com informacoes que podem ser menos repetitivas e arquivos mais flat. Faca uma analise e cruze a informacao dos arquivos e gere um relatorio final em `docs/` com sugestoes de alteracoes nos documentos com base em sua analise. Nao altere nada ainda."

A virada nao foi reescrever do zero. Foi pedir um diagnostico antes da edicao.

O agente cruzou conteudo, identificou redundancia em 30-40%, mapeou as 8 duplicacoes de stack/MVP, propos duas ondas de limpeza:

**Onda 1 (segura, sem mudar arquivos):**
- cortar redundancia interna de cada arquivo, sem renomear ou fundir;
- resolver divergencias silenciosas entre arquivos sobre o mesmo tema.
Reducao esperada: ~5921 → ~4000 linhas.

**Onda 2 (estrutural):**
- fundir docs de `product/`, `architecture/`, `agent/` e `reference/` em arquivos flat;
- manter `decisions/` so para ADRs;
- enxugar ADRs em template normativo.

Depois, com aprovacao, foi aplicado:

- `1ae4ffc` (2026-05-12): consolida `docs/` em layout flat;
- `16af8bd` (2026-05-12): enxuga ADRs 001-005 para template normativo (cada ADR ficou com 32-44 linhas);
- `4f080ee` (2026-05-12): atualiza `CLAUDE.md` com nova estrutura flat.

## Resultado em numeros

| Metrica | Antes | Depois | Variacao |
|---|---|---|---|
| Arquivos | 19 | 13 | **-32%** |
| Linhas | 5921 | 2335 | **-60%** |
| Subpastas | 5 | 1 (`decisions/`) | **-80%** |
| ADRs | longos | 32-44 linhas cada | enxutos |
| Redundancia detectada | 30-40% | virtualmente zero | resolvida |

### Distribuicao final por arquivo (depois)

```
docs/
  README.md          ~150 linhas    indice + decisoes consolidadas + restricoes MVP
  product.md         ~300 linhas    visao, posicionamento, principios, sitemap
  content-model.md    386 linhas    modelos internos canonicos
  architecture.md    ~250 linhas    arquitetura geral + organizacao frontend
  notion.md           562 linhas    integracao Notion + databases (mais denso)
  styling.md         ~200 linhas    padrao de estilos (CSS Modules)
  agents.md           286 linhas    guia para agentes (instrucoes, workflow, DoD)
  roadmap.md         ~100 linhas    (depois absorvido nos plans, ver EP-008)
  decisions/          186 linhas    5 ADRs enxutos (32-44 linhas cada)
  ─────────────────────────────────
  TOTAL              2335 linhas
```

Estrutura final: 6 arquivos flat (`product.md`, `content-model.md`, `architecture.md`, `notion.md`, `styling.md`, `agents.md`) + `decisions/` para ADRs + arquivos de raiz (`README.md`, `roadmap.md` — depois removido em EP-008).

Quatro dias entre criar e desfazer. Custo baixo do erro porque a inflacao foi diagnosticada cedo.

## Aprendizado

**Aprendizado 1: agentes diferentes inflam de jeitos diferentes.**

ChatGPT inflou por excesso de angulos (mesmo conceito em 3 formulacoes). Claude Code inflou por pressao estrutural (subpastas vazias pedem preenchimento). Pipeline com dois agentes em sequencia combinou as duas inflacoes. Diagnostico tem que reconhecer ambas.

**Aprendizado 2: comecar flat venceu por evidencia, nao por opiniao.**

A regra-de-bolso que emergiu: comecar flat; categorizar so quando a mesma categoria se justificar tres vezes — ou seja, quando tres arquivos do mesmo tema realmente existirem e nao puderem ser consolidados. Antes disso, subpasta e overhead.

**Aprendizado 3: o agente preenche o que o humano pede.**

Se o humano cria caixa, o agente preenche caixa. Cabe ao humano resistir a impulso de organizar antes de ter o que organizar.

**Aprendizado 4: "Faca uma analise. Nao altere nada ainda" virou padrao reaproveitavel.**

Pedir diagnostico antes da edicao foi o que reduziu o custo. Esse padrao migrou para outras viradas posteriores na branch.

## Possivel conteudo publico

- Formato sugerido: post tecnico curto com numeros + thread
- Titulo possivel: "De 5921 linhas para 2335: como minha pasta docs/ encolheu 60% em quatro dias"
- Promessa: regra-de-bolso simples para parar de criar subpastas precoces + diagnostico de inflacao em documentacao gerada por agentes
- Publico: devs que usam agentes (ChatGPT, Claude Code, Cursor) para gerar documentacao de projeto

## Perguntas abertas

- [ ] Quando, ao longo do projeto, sera honesto reabrir subpastas em `docs/`? Que sinal vai indicar?
- [ ] Esse aprendizado vale tambem para `.claude/skills/` e `.journey/episodes/`, ou e especifico de `docs/`?
- [ ] Qual o limite de inflacao aceitavel quando se usa um agente para gerar conteudo inicial vs editar?

## Fragmentos aproveitaveis

> "Mais flat" — virou refrao recorrente da branch.

> "Faca uma analise. Nao altere nada ainda" — virou padrao para reduzir custo de erro em viradas estruturais.

> ChatGPT inflou por excesso de angulos. Claude Code inflou por pressao estrutural. Dois agentes em sequencia, duas inflacoes somadas.

> O agente nao infla a documentacao sozinho. Ele preenche as caixas que o humano cria. O remedio nao e prompt melhor, e estrutura menor.

> De 5921 para 2335 linhas em quatro dias. Reducao de 60% sem perda de informacao.

## Commits relacionados

- `a90a144` (2026-05-08): scaffold inicial categorizado.
- `3a91d78` (2026-05-08): preenche scaffold com conteudo inicial.
- `1ae4ffc` (2026-05-12): consolida em layout flat. **Commit-chave do episodio**.
- `16af8bd` (2026-05-12): enxuga ADRs 001-005 para template normativo.
- `4f080ee` (2026-05-12): atualiza `CLAUDE.md` com nova estrutura flat.
