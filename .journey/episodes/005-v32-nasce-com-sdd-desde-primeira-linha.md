---
title: EP-005 - v3.2 nasce com SDD desde a primeira linha
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 16:45
  updated_at: 2026-05-13 19:00
  tags:
    - episode
    - cronologico
    - reset
    - v3.2
    - sdd
    - nascimento-branch
    - codex-experiment
    - claude-experiment
  era: v3.2
  lentes:
    - chamado
    - transformacao
  sources:
    sessions:
      - id: 9443c42d-3cc6-4797-8994-fc2e4c557514
        date: 2026-05-04
        relevance: primary
        summary: primeira instrucao "limpe o projeto e deixe so um Hello world" na branch claude_experiment
      - id: 0865f4cc-5b0e-45b2-a98d-062a05eac7d0
        date: 2025-04-09
        relevance: secondary
        summary: codex_experiment - tentativa de criar docs/plans/tasks DENTRO da v3.1.x sem reset
      - id: 4f66e87d-7800-44d4-8f0a-ac68d6b7dc4c
        date: 2026-04-30
        relevance: secondary
        summary: codex_experiment - tentativa de clonar layout via Pencil + chrome-devtools-mcp
      - id: 64e49842-d67a-4d49-9e95-42445dc03b64
        date: 2026-04-19
        relevance: secondary
        summary: codex_experiment - /init para criar CLAUDE.md sobre v3.1.x existente
    commits:
      - 218da0a
    branches:
      - claude_experiment
      - codex_experiment
    last_review: 2026-05-13 20:30
---

# EP-005 — v3.2 nasce com SDD desde a primeira linha

## Sobre este episodio

Marco o nascimento da branch `claude_experiment` em 2026-05-04. Conta o porque o reset aconteceu nesta branch especifica, depois de um experimento mal-sucedido na branch paralela `codex_experiment` de tentar consertar a v3.1.x sem reset.

Para o padrao meta dos dois resets do projeto, ver [`004-reset-total-como-marca.md`](./004-reset-total-como-marca.md). Para o que veio depois, ver [`006-docs-de-categorizado-pra-flat.md`](./006-docs-de-categorizado-pra-flat.md).

## Gancho

Antes de existir a branch `claude_experiment`, existiu a branch `codex_experiment`. Nela, o Vitor tentou o caminho aparentemente sensato: consertar a v3.1.x para receber SDD por dentro, sem precisar apagar nada.

Custou demais.

Quando ficou claro que migrar saia mais caro que reconstruir, o reset aconteceu — mas nao na branch onde o conserto vinha sendo tentado. Aconteceu numa branch nova, com proposito declarado desde o nome: `claude_experiment`. Nesta branch, a v3.2 nasceria com SDD desde a primeira linha. Hello world incluso.

## Contexto

A v3.1.x rodava bem em 2026-04. Sass + BEM, Notion wrapper proprio, Vercel Analytics, paginas estaveis (ver [`003-v3-e-v3.1-sass-bem-e-notion-continua.md`](./003-v3-e-v3.1-sass-bem-e-notion-continua.md)). Tecnicamente, nao tinha o que reclamar.

Em paralelo, o Vitor vinha experimentando agentes de IA em projetos. A v3.1.x era candidata a campo de teste, mas faltava algo basico: fonte de verdade estruturada que o agente pudesse consultar. Sem isso, cada sessao com agente comecava do zero, perdia contexto, desviava, inventava regra.

A hipotese inicial: dava pra adicionar SDD por dentro da v3.1.x. Documentar incrementalmente, ir introduzindo agentes, manter o site no ar. Foi nessa hipotese que a branch `codex_experiment` foi aberta.

## Conflito

`codex_experiment` testou o conserto entre 2025-04-09 e 2026-04-30. Resultado: custo alto demais.

### Evidencias do que foi tentado na branch `codex_experiment`

Mensagens reais nas sessoes daquela branch revelam a natureza do experimento:

- **estruturar docs/plans/tasks dentro da v3.1.x existente** (sessao `0865f4cc`):
  > "criar uma pasta de tasks dentro de cada plano (tirando o 000, ele vc vai renomear para PLAN-000-board), com as tarefas do plano em formato de arquivo e com um id gerado atravez de uma logica simples"
- **gerar CLAUDE.md sobre o codigo existente** (sessao `64e49842`, comando `/init`);
- **clonar layouts de referencia visual via Pencil + chrome-devtools-mcp** (sessao `4f66e87d`);
- **mapear o que precisaria migrar antes do reset** (annotacoes em codigo: `services/postService.ts ← migrar para página RSC direta`).

Padrao: cada movimento adicionava camada nova sobre estrutura velha. Documentar codigo que nao foi escrito para ser auto-explicativo exigiu interpretar muito; cada interpretacao era nova fonte de erro futuro.

### O que se descobriu

A estrutura Sass + BEM nao acomodava CSS Modules sem reescrever; o wrapper proprio do Notion nao foi pensado para servir tambem como contrato de agente; o codigo direto nao tinha camada de decisao explicita; documentar a base atual em retrospectiva exigia interpretar codigo que nunca foi escrito para ser auto-explicativo. Cada passo SDD-friendly esbarrava em decisoes arquiteturais que nao previam SDD.

Em resumo: a v3.1.x estava bem para o que tinha sido construida — mas nao tinha como receber SDD por dentro sem virar Frankenstein.

A pergunta deixou de ser "como migrar a v3.1.x para Next.js 16 + CSS Modules + SDD" e virou "vale a pena migrar uma estrutura que ja nao sustenta o modo de criar que eu quero adotar a partir de agora?".

Resposta: nao.

## Virada

Decisao explicita de apagar tudo e comecar literalmente do hello world — mas nao na branch onde o conserto havia sido tentado. Uma branch nova, `claude_experiment`, foi aberta para o reset estruturado.

A escolha do nome carrega intencao. `codex_experiment` foi tentativa com um agente; `claude_experiment` virou tentativa estruturada com SDD em outro agente. As branches paralelas viraram laboratorio comparativo: dois caminhos com dois agentes, dois resultados, mesma intencao final.

Commit `218da0a` em 2026-05-04: "feat: nova base para a v3.2". Primeira mensagem ao agente: "Iniciei um projeto Next.js do zero pra criar o meu site pessoal, limpe o projeto e deixe so um Hello world sendo renderizado para comecarmos a trabalhar".

O motivo nao foi tecnico no sentido estrito. Foi metodologico: a v3.1.x nao tinha como receber SDD por dentro. Reconstruir do zero criou espaco para a documentacao nascer junto com o codigo, e nao depois dele.

E o mais relevante: este foi o segundo reset total. O primeiro tinha sido por motivo tecnico (ver EP-004); este e por motivo metodologico. A decisao de apagar nao virou trauma — virou ferramenta.

## O que sobreviveu ao reset

Reset apagou codigo, nao decisao. O que ficou intacto na transicao para a v3.2:

- **Notion como CMS** — agora formalizado em `ADR-002-notion-as-cms.md`, primeira vez documentado como compromisso normativo apos cinco anos de uso na pratica;
- **portugues como idioma do projeto**;
- **conventional commits**;
- **deploy na Vercel**;
- **preferencia por verbosidade explicita** (CSS Modules > Sass+BEM > Tailwind).

A v3.2 trouxe, alem disso, tres camadas inteiramente novas: `docs/`, `.claude/`, `.journey/`. Essas camadas sao a infraestrutura nova que a v3.1.x nao tinha como receber.

## Aprendizado

**Aprendizado 1: tentar consertar e parte do metodo.**

A branch `codex_experiment` nao foi tempo perdido. Foi como ficou claro que conserto saia mais caro que reset. Sem esse experimento, o reset pareceria precipitado. Com ele, o reset virou decisao informada.

Hipotese de regra-de-bolso: antes de resetar, tente consertar numa branch paralela. Se o conserto custar mais que o reset, voce tem dado para decidir.

**Aprendizado 2: branches paralelas viram laboratorio comparativo.**

Manter `codex_experiment` no repositorio (em vez de deletar a branch) preserva o teste falho como parte do registro. O `git log` do repo conta nao so o que funcionou, mas tambem o que foi tentado e nao funcionou. Isso e portfolio de honestidade tecnica.

**Aprendizado 3: reset estruturado != reset impulsivo.**

Reset 1 (2023) foi pragmatico — stack antiga, troca direta. Reset 2 (2026) foi estruturado — branch nova, SDD desde a primeira linha, intencao declarada antes do hello world. A diferenca entre os dois e o quanto o metodo cresceu nos dois anos entre eles.

## Possivel conteudo publico

- Formato sugerido: post confessional + video bastidor + thread
- Titulo possivel: "Tentei consertar meu site numa branch. Apaguei tudo na outra."
- Promessa: como decidir entre conserto e reset usando branches paralelas como experimento controlado
- Publico: devs experientes pesando entre refatorar e reescrever

## Perguntas abertas

- [ ] Em que momento exato a sensacao de "nao da mais" virou decisao de apagar a v3.1.x?
- [ ] Quanto tempo o experimento na `codex_experiment` durou antes de o reset ser decidido?
- [ ] O que do legado da v3.1.x ainda merece resgate (textos, imagens, arquitetura de informacao)?
- [ ] A branch `codex_experiment` vai continuar viva no repo como prova do experimento, ou sera deletada apos a v3.2 sair?

## Fragmentos aproveitaveis

> "Limpe o projeto e deixe so um Hello world sendo renderizado para comecarmos a trabalhar."

> Antes de existir `claude_experiment`, existiu `codex_experiment`. Nela, tentei o conserto. Quando ficou claro que ia custar mais que o reset, abri uma branch nova e apaguei tudo.

> A escolha do nome carrega intencao. `claude_experiment` foi onde a v3.2 nasceria com SDD desde a primeira linha.

> Reset estruturado != reset impulsivo. A diferenca entre os dois e o quanto o metodo cresceu entre eles.

## Commits relacionados

- `218da0a` (2026-05-04): "feat: nova base para a v3.2" — segundo reset, na branch `claude_experiment`.

Branch paralela:
- `codex_experiment` — onde a tentativa de conserto da v3.1.x aconteceu antes do reset. ~7 meses de experimentos (2025-04-09 a 2026-04-30) com 8 sessoes Claude Code documentadas. Mantida viva no repo como parte do registro.
