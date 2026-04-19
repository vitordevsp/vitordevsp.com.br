---
name: build-changelog
description: Criar, revisar ou evoluir CHANGELOG.md com base em commits, planos, mudanças estruturais e regras de versionamento, priorizando leitura humana, agrupamento por impacto e semver coerente.
last_updated: 2026-04-18 17:05
---

# Build Changelog

Use esta skill quando a tarefa for criar, revisar ou evoluir `CHANGELOG.md`.

Ela existe para transformar histórico técnico em memória pública útil, sem copiar commits cegamente nem perder mudanças relevantes do projeto ou do framework.

## Quando usar

Use esta skill quando:

- um ciclo de trabalho relevante foi concluído;
- vários commits precisam virar entrada legível de changelog;
- existe dúvida sobre o que merece ou não entrar em `CHANGELOG.md`;
- a mudança tem relação com versionamento semântico;
- o changelog precisa ser reorganizado, resumido ou padronizado.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/versionamento.md`
2. `docs/patterns/documentacao.md`
3. `git log --oneline -n 50`
4. `git log --format='%h%n%s%n%b%n---' -n 20`

Depois, carregue também:

- planos concluídos ou atualizados na frente;
- `CHANGELOG.md`, se já existir;
- `docs/skills/build-commit/SKILL.md`, quando for importante cruzar agrupamento de commits;
- `docs/plans/README.md`, quando a frente estiver bem distribuída entre planos.

## Entradas

O contexto ideal inclui:

- histórico recente de commits;
- planos e frentes concluídas;
- entendimento do impacto da mudança;
- changelog atual, quando existir;
- noção do escopo público ou interno do que mudou.

## Sequência recomendada

1. Identifique o período ou frente que o changelog precisa cobrir.
2. Levante os commits e agrupe por assunto real, não só por ordem temporal.
3. Cruze com planos concluídos e ferramentas criadas ou alteradas.
4. Classifique o impacto com base em `docs/patterns/versionamento.md`.
5. Decida o que entra e o que fica apenas no histórico de git.
6. Escreva ou atualize `CHANGELOG.md` com linguagem curta e orientada a leitura humana.
7. Se houver dúvida de versão, sinalize explicitamente a recomendação.

## O que esta skill deve verificar

- se o changelog está registrando mudança relevante, e não ruído de implementação;
- se a classificação por categoria está clara;
- se a mudança sugere `major`, `minor` ou `patch`;
- se o texto está legível sem exigir leitura do commit original;
- se mudanças estruturais do framework ou da documentação foram tratadas com peso proporcional.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. `CHANGELOG.md` criado ou atualizado;
2. agrupamento das mudanças por impacto;
3. indicação de bump semântico quando fizer sentido;
4. ressalvas explícitas quando a mudança ainda depender de validação externa.

## O que esta skill não deve fazer

Esta skill não deve:

- copiar commits linha por linha;
- transformar o changelog em dump completo de histórico;
- inventar versão sem base de impacto;
- esconder ambiguidade de classificação quando ela existir.
