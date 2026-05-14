---
title: Pattern de autoria narrativa para .journey/
description: Define principios editoriais, tom, lentes narrativas, estrategia de perguntas e checklist de qualidade aplicados em todo registro de jornada.
metadata:
  author: agents-studio
  last_updated: 2026-05-13 00:00
  version: "1.0.0"
---

# Pattern de autoria narrativa para .journey/

## Objetivo

Garantir que todo registro feito pela skill seja editorial, autoral e reutilizavel para conteudo publico, sem virar documentacao tecnica e sem inventar narrativa.

## Posicionamento narrativo

Tratar o projeto como jornada do heroi aplicada a desenvolvimento de software com IA.

A narrativa central nao e: "Como implementei um site."

A narrativa central e: "Como reconstrui meu proprio sistema de criacao usando SDD, agentes e contexto como infraestrutura."

A jornada deve vender a transformacao antes de vender a tecnica.

## Principios editoriais

1. **Narrativa antes da tecnica.** Comece por tensao, incomodo, decisao ou descoberta. Stack, arquitetura ou ferramenta entram como evidencia da transformacao, nao como abertura.
2. **Jornada real, nao propaganda vazia.** Registre duvidas, tropecos, mudancas de ideia, decisoes imperfeitas, aprendizados em construcao, contradicoes produtivas. Autoridade vem da honestidade do processo.
3. **SDD como transformacao.** Posicione SDD como mudanca de mentalidade: de codigo direto para intencao estruturada, de tarefa solta para plano executavel, de prompt improvisado para contexto governado, de conversa descartavel para memoria de projeto, de implementacao isolada para sistema de execucao.
4. **O agente como espelho e amplificador.** A IA aparece como espelho de raciocinio, parceira de estruturacao, forca de execucao, fonte de atrito quando mal orientada e amplificador quando recebe bom contexto. Nao retrate apenas como ferramenta de produtividade.
5. **Conteudo com destino.** Todo registro tenta identificar usos futuros: post, aula, lead magnet, estudo de caso, roteiro de video, modulo de curso, trecho de landing page, newsletter.
6. **Material real antes de interpretacao.** Antes de qualquer escrita substancial, buscar fontes objetivas (sessoes JSONL, git log, CHANGELOG, planos). Rascunho generico criado sem historico e **sempre reescrito depois** — desperdicio confirmado na pratica. Quando ha session JSONL disponivel, citar usuario verbatim em quote block ao inves de parafrasear. Detalhe operacional em [`pattern-source-extraction.md`](./pattern-source-extraction.md).
7. **Numeros e tabelas > prosa abstrata.** Quando ha dados objetivos (contagens, percentuais, datas, listas finitas), preferir tabela ou bullet list com numero exato a frases tipo "varios", "alguns", "muitos". Ep cronologico saudavel cita pelo menos 1 commit, 1 quote verbatim (se houver session primary) e 1 numero objetivo.
8. **Hipoteses editoriais marcadas.** Onde interpretacao supera fato, marcar com `> Hipotese editorial: ...`. Onde ha lacuna sabida, marcar com `> Em aberto: ...`. Distinguir fato, interpretacao e hipotese reduz custo de refinacao futura.

## Tom de voz

Tom deve ser narrativo, reflexivo, direto, autoral, maduro, levemente provocativo quando fizer sentido, orientado a aprendizado.

Evite excesso de hype, tom corporativo, linguagem generica de marketing, frases motivacionais vazias, tecnicismo desnecessario e documentacao fria demais.

Bom tom:

> Eu nao comecei reconstruindo um site. Comecei tentando resolver um problema mais antigo: a sensacao de que meus projetos dependiam demais da minha memoria, do meu humor e da minha capacidade de retomar contexto depois de dias ou semanas.

Tom ruim:

> Este projeto utiliza SDD para maximizar produtividade com agentes de IA por meio de documentacao estruturada e fluxos otimizados.

## Lentes narrativas

Ao analisar qualquer insumo, classifique com uma ou mais lentes:

| Lente | Pergunta-chave | Exemplos |
|------|------|------|
| `chamado` | O que fez a jornada comecar? | incomodo com site antigo, vontade de reconstruir o jardim digital, criar metodo proprio com agentes |
| `atrito` | Que dificuldade apareceu? | excesso de contexto perdido, agentes alterando comportamento sem fonte de verdade, documentacao espalhada |
| `descoberta` | Que percepcao nova surgiu? | SDD como forma de governar intencao, `.journey/` como camada narrativa separada, prompts como artefatos de engenharia |
| `metodo` | Que padrao esta comecando a se repetir? | conversa -> sintese -> plano -> tarefa -> execucao -> registro |
| `transformacao` | O que mudou no protagonista? | de executor para designer de sistemas de execucao, de programador para arquiteto de contexto |
| `oferta` | Que parte pode virar produto, curso ou lead magnet? | curso introdutorio de SDD, template de `.agents/`, checklist de jornada com agentes |

Um mesmo insumo pode acionar varias lentes. Registre todas que se aplicam antes de escolher destino.

## Tipos de insumo

- `conversa`
- `decisao`
- `plano`
- `erro`
- `reflexao`
- `mudanca-de-direcao`
- `duvida`
- `conteudo-bruto`

Para cada tipo, extraia: conflito, decisao, aprendizado, virada, consequencia, pergunta aberta, conteudo potencial.

## Estagios da jornada

- `mundo-comum`
- `chamado`
- `recusa` ou `resistencia`
- `encontro-com-metodo`
- `primeiros-testes`
- `provacoes`
- `recompensa` ou `aprendizado`
- `integracao`
- `ensino-do-metodo`

## Decisao de destino

| Sinal no insumo | Destino |
|------|------|
| arco principal, identidade do protagonista, transformacao em curso | `hero.md` |
| evento datado com tensao e aprendizado | `timeline.md` |
| episodio com gancho, conflito, virada e aprendizado claros | `episodes/<nnn>-titulo.md` |
| lacuna importante para a narrativa ou oferta futura | `open-questions.md` |
| ideia reaproveitavel para post, aula, video, newsletter ou lead magnet | `seeds/content-seeds.md` |
| fragmento solto, insight ainda nao maduro | `notes/raw-insights.md` |

Quando o destino for ambiguo, prefira `notes/raw-insights.md` e marque a lacuna em `open-questions.md`.

## Marcacoes editoriais especiais

| Marcacao | Onde usar | Proposito |
|---|---|---|
| `> Hipotese editorial: ...` | em qualquer ep, quando interpretacao supera fato | distinguir leitura editorial de fato registrado |
| `> Em aberto: ...` | em hero.md ou ep, quando ha lacuna por preencher | sinalizar que o autor sabe que ali falta material |
| `[promovido para: <destino>]` | em `notes/raw-insights.md` apos insight virar ep ou seed | preservar historico sem duplicar |
| `[ainda raw]` | em `notes/raw-insights.md` | sinalizar insight nao promovido |
| `[origem: ep-NNN]` | em `open-questions.md` por pergunta | rastreabilidade reversa pergunta -> ep que gerou |
| `[origem: hero]` / `[origem: timeline]` | em `open-questions.md` | quando pergunta nasceu fora de ep especifico |
| `**[origem: ep-NNN]**` (negrito) | em open-questions formatadas | destaque visual do origem |

Marcacoes nao sao decoracao — sao contrato com o futuro agente que vai refinar. Sem elas, o proximo agente precisa reinterpretar tudo do zero.

## Estrategia de validacao via AskUserQuestion estruturada

Antes de escrever ep cronologico substancial, apresente sintese ao usuario e pergunte de forma estruturada:

1. **mapa da linha do tempo** com sessoes identificadas + datas;
2. **mapa de temas** detectados nos materiais;
3. **AskUserQuestion** com 2-4 perguntas multipla escolha cobrindo:
   - "A sintese bate?" (sim / bate em parte / nao bate);
   - "Quais marcos viram episodio?" (multi-select);
   - "Qual angulo do hero?";
   - "Qual o foco editorial?".

Usuario responde em segundos via opcoes; agente ganha confianca antes de escrever. Reduz retrabalho significativamente vs escrever direto e depois reescrever apos feedback.

Confirmado na pratica: tres rodadas de `AskUserQuestion` antes de criar lote de eps gerou material que so precisou de ajuste leve em vez de reescrita.

## Estrategia de perguntas

Pergunte somente o que melhora a narrativa, a clareza ou a oferta futura. Evite perguntas genericas.

Boas perguntas:

- Qual foi o incomodo concreto que fez voce decidir reconstruir o site agora?
- O que voce quer provar para si mesmo com essa versao?
- Que parte dessa jornada poderia virar a primeira aula de um curso de SDD?
- Qual era o jeito antigo de trabalhar que voce esta tentando abandonar?
- Em que momento voce percebeu que nao estava so criando um site, mas um metodo?
- Que erro com agentes te ensinou mais ate agora?
- Qual transformacao voce quer que uma pessoa enxergue acompanhando essa serie?

Perguntas ruins (so se forem relevantes para a narrativa):

- Qual stack voce vai usar?
- Qual banco de dados sera utilizado?
- Qual framework foi escolhido?
- Qual e o prazo final?

## Regras de saida

- escrever em portugues brasileiro;
- preferir primeira pessoa quando fizer sentido;
- preservar tom autoral do usuario;
- nao inventar fatos;
- marcar hipoteses como hipoteses (`> Hipotese editorial:` ou `> Em aberto:`);
- preferir poucos registros bons a muitos registros rasos;
- nao duplicar conteudo entre arquivos;
- conectar aprendizado a SDD/agentes/contexto quando for natural, sem forcar.

## Checklist de qualidade

Antes de fechar qualquer registro, valide:

- [ ] o texto registra uma transformacao, tensao ou aprendizado?
- [ ] esta claro por que esse momento importa na jornada?
- [ ] a tecnica aparece como parte da historia, nao como centro frio?
- [ ] existe potencial de reaproveitamento em conteudo publico?
- [ ] o texto evita marketing generico?
- [ ] o texto evita documentacao tecnica excessiva?
- [ ] lacunas relevantes viraram perguntas objetivas em `open-questions.md` com `[origem: ep-NNN]`?
- [ ] o registro preserva a separacao entre `.journey/` e o restante do projeto?
- [ ] hipoteses estao marcadas (`> Hipotese editorial:`) e separadas de fatos?
- [ ] nivel de exposicao desejado foi respeitado?
- [ ] ep cita pelo menos 1 commit hash + 1 numero objetivo (se cronologico) ou 2+ eps em `derived_from` (se meta)?
- [ ] frontmatter completo com `metadata.sources` atualizado e `last_review` bumpado?
- [ ] nenhuma ref orfa apos a escrita (rodar `grep -rE "episodes/00[0-9]"` em `.journey/`)?
