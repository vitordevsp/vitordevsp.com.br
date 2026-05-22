---

title: EP-004 - Reset total como marca do protagonista
status: refinando
type: meta
metadata:
  owner: journey-writer
  created_at: 2026-05-13 17:30
  updated_at: 2026-05-13 19:00
  tags:
    - episode
    - meta
    - reset
    - identidade-tecnica
  era: atemporal
  lentes:
    - transformacao
    - descoberta
  sources:
    sessions: []
    commits:
      - 5fab737
      - 414bdb8
      - 218da0a
    files:
      - CHANGELOG.md
    derived_from:
      - 002-v1-e-v2-anos-de-aprendizado-base
      - 003-v3-e-v3.1-sass-bem-e-notion-continua
      - 005-v32-nasce-com-sdd-desde-primeira-linha
    note: episodio meta. Consolida material dos episodios cronologicos vizinhos e CHANGELOG, sem sessoes proprias.
last_review: 2026-05-13 20:30

---

# EP-004 — Reset total como marca do protagonista

## Sobre este episodio

Episodio meta. Atravessa os dois resets totais do repositorio (2023-12-05 e 2026-05-04) e o padrao que os une. Vem antes do episodio sobre o nascimento da branch atual (`[005-v32-nasce-com-sdd-desde-primeira-linha.md](./005-v32-nasce-com-sdd-desde-primeira-linha.md)`) porque o segundo reset so faz sentido a luz do primeiro.

## Gancho

Dois resets totais em pouco mais de dois anos. Apagar tudo, comecar do zero, recomecar com hello world. O mesmo gesto, em momentos diferentes, por motivos diferentes.

Isso nao e acidente. Isso e marca.

## Contexto

O repositorio `vitordevsp.com.br` tem cinco anos de historia (primeiro commit em 2021-05-25). Nesse periodo, dois eventos rompem com o padrao normal de evolucao: dois resets totais em que todos os arquivos foram apagados e o projeto reiniciou do zero.

**Reset 1 — 2023-12-05 (rumo a v3):**

- commit `5fab737`: "exclui todos os arquivos do projeto";
- commit `414bdb8`: "Initial commit v3";
- saiu de v2 (Chakra UI + Notion antigo + API Routes internas + modulo content) para nova base com Tailwind (depois substituido por Sass + BEM) + Notion v2 + estrutura de componentes nova.

**Reset 2 — 2026-05-04 (rumo a v3.2):**

- commit `218da0a`: "feat: nova base para a v3.2";
- saiu de v3.1.x (Sass + BEM + Notion wrapper proprio) para Next.js 16 hello world + SDD + tres camadas (`docs/`, `.claude/`, `.journey/`).

Entre os dois resets: v3.0.0 (2025-04-01), v3.1.0 (2025-04-10), v3.1.x ate maio/2026. Ver `[003-v3-e-v3.1-sass-bem-e-notion-continua.md](./003-v3-e-v3.1-sass-bem-e-notion-continua.md)`.

## Conflito

A leitura facil seria: o Vitor e indeciso, nao termina o que comeca, gosta de comecar do zero por capricho.

A leitura honesta e diferente. Cada reset tinha motivo claro:

**Reset 1 (tecnico):** a stack v2 (Chakra UI + Notion antigo) tinha envelhecido. Manter custaria mais que reconstruir. A v3 trouxe modernizacao tecnica — Sass + BEM, Notion v2, melhor responsividade.

**Reset 2 (metodologico):** a v3.1.x estava tecnicamente bem. O problema era que ela nao tinha como receber SDD por dentro. A v3.2 nao e modernizacao tecnica — e mudanca de modo de criar.

Cada reset respondeu a um tipo de saturacao diferente. O conflito interno nao e "comecar de novo", e "saber distinguir saturacao tecnica de saturacao metodologica".

## Virada

Aceitar que reset total faz parte do repertorio do protagonista — nao como falha, mas como ferramenta.

A maioria dos devs trata reset como derrota silenciosa: prefere refatorar incremental ate o codigo ficar irreconhecivel mas tecnicamente "preservado". O Vitor escolheu o oposto duas vezes: quando manter custa mais que reconstruir, apaga e reinicia.

Reset total tem dois sinais que o justificam:

1. arquitetura insustentavel onde evoluir custa mais que reconstruir;
2. impossibilidade de operar com agente porque o codigo nao tem fonte de verdade.

Quando os dois aparecem juntos, reset e mais barato que migracao.

## O que apaga e o que fica

Reset total nao significa trocar tudo. Significa apagar o codigo, manter o aprendizado e as decisoes de longa duracao.

O que sobreviveu aos dois resets, mesmo com tudo apagado:

- **Notion como CMS editorial.** A unica decisao arquitetural que atravessou v2 -> v3 -> v3.2 sem ser questionada com seriedade. Ver absorcao em `[002-v1-e-v2-anos-de-aprendizado-base.md](./002-v1-e-v2-anos-de-aprendizado-base.md)` (onde entrou) e `[003-v3-e-v3.1-sass-bem-e-notion-continua.md](./003-v3-e-v3.1-sass-bem-e-notion-continua.md)` (sobrevivencia ao reset 1);
- **portugues como idioma do projeto**;
- **conventional commits**;
- **deploy na Vercel**;
- **preferencia por verbosidade explicita** (BEM, CSS Modules, plans em draft) sobre magia curta;
- **postura curatorial sobre conteudo proprio** — aprendida na v2, nunca abandonada.

Apagar tudo nao e desculpa pra trocar tudo. Saber o que apagar e o que manter e parte do metodo.

## Aprendizado

**Aprendizado 1: existem dois tipos de reset.**

- reset tecnico: troca de stack porque a base envelheceu;
- reset metodologico: troca de modo de criar porque o codigo atual nao acomoda o metodo novo.

A v3 foi tipo 1. A v3.2 e tipo 2. Confundir os dois leva ou a refatoracao infinita (quando deveria resetar) ou a reset desnecessario (quando deveria refatorar).

**Aprendizado 2: SDD pode quebrar o ciclo.**

Se a v3.2 sustentar de verdade SDD + agentes governados por contexto, este pode ser o ultimo reset total. A pergunta editorial em aberto: SDD e antidoto para resets metodologicos futuros, ou SDD tambem vai envelhecer e precisar de reset proprio em alguns anos?

> Hipotese editorial: o ciclo de resets e sintoma de que o codigo cresce mais rapido que o metodo de criar. SDD inverte isso — o metodo cresce primeiro, o codigo segue. Se a hipotese for verdadeira, este e o ultimo reset.

**Aprendizado 3: reset publico vira material.**

A maioria dos devs apaga em silencio (forka, abandona, comeca repo novo). Apagar publicamente, no mesmo repo, com commit nomeado, transforma reset em narrativa. O `git log` deste repo conta cinco anos de evolucao com dois cortes claros — isso e portfolio de honestidade tecnica que poucos perfis publicam.

**Aprendizado 4: identidade tecnica vem da decisao que voce nao troca.**

Cada dev tem seu padrao de "o que sempre fica". Para o Vitor, e Notion como local de escrita e fonte de verdade do conteudo, mais conventional commits, mais portugues como idioma. Reconhecer isso afia o filtro: novidades futuras precisam coexistir com essas decisoes ou justificar muito bem por que devem substitui-las.

## Possivel conteudo publico

- Formato sugerido: post de tese + video curto + capitulo em curso
- Titulo possivel: "Apaguei meu site duas vezes em cinco anos. Aqui esta a regra que eu sigo"
- Promessa: criterio para distinguir saturacao tecnica de saturacao metodologica e decidir entre refatorar e resetar
- Publico: devs experientes que tem projetos pessoais com varias versoes acumuladas

## Perguntas abertas

- Se SDD funcionar como antidoto, este sera o ultimo reset total deste repo? Ou reset e padrao permanente?
- Existe um terceiro tipo de reset (filosofico, identitario) que ainda nao apareceu mas pode aparecer?
- Quanto tempo precisa passar entre o reset de 2026 e o proximo (se houver) para confirmar que SDD quebrou o ciclo?
- Existe outra decisao deste repo que sobreviveu a tudo e ainda nao foi formalizada como ADR (portugues, conventional commits, deploy na Vercel)?

## Fragmentos aproveitaveis

> O primeiro reset foi por motivo tecnico. O segundo, por motivo metodologico. Saber distinguir e o que separa metodo de capricho.

> A maioria dos devs trata reset como derrota silenciosa. Apagar publicamente, no mesmo repo, com commit nomeado, transforma reset em narrativa.

> Apagar tudo nao e desculpa pra trocar tudo. Saber o que apagar e o que manter e parte do metodo.

> Identidade tecnica vem da decisao que voce nao troca.

> Hipotese editorial: SDD pode ser o antidoto para resets metodologicos futuros — se a v3.2 sustentar, este e o ultimo.

## Commits relacionados

- `5fab737` (2023-12-05): "exclui todos os arquivos do projeto" — reset 1.
- `414bdb8` (2023-12-05): "Initial commit v3" — restart pos reset 1.
- `218da0a` (2026-05-04): "feat: nova base para a v3.2" — reset 2.

Ver tambem: `[005-v32-nasce-com-sdd-desde-primeira-linha.md](./005-v32-nasce-com-sdd-desde-primeira-linha.md)` (foco no reset 2 especifico) e `[../../CHANGELOG.md](../../CHANGELOG.md)` (visao completa do repositorio).