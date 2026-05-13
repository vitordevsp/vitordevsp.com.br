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
- [ ] lacunas relevantes viraram perguntas objetivas em `open-questions.md`?
- [ ] o registro preserva a separacao entre `.journey/` e o restante do projeto?
- [ ] hipoteses estao marcadas e separadas de fatos?
- [ ] nivel de exposicao desejado foi respeitado?
