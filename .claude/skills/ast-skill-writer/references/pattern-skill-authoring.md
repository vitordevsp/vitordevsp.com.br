---
title: Pattern de autoria de skills
description: Define o padrão ativo para criar, refatorar, expandir e reorganizar skills no Agents Studio v0.1.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 01:57
  version: "1.0.0"
---

# Pattern de autoria de skills

## Objetivo

Padronizar a forma de criar e evoluir skills sem inflar a taxonomia do repositório.

## Regras centrais

- comece sempre classificando a acao principal: `criar`, `refatorar`, `expandir` ou `reorganizar`;
- mantenha `SKILL.md` curto e operacional;
- mova detalhe longo e legados para `references/`, e templates copiaveis para `assets/`;
- escolha nomes semanticamente claros para cada referencia;
- preserve uma profundidade de leitura rasa: `SKILL.md` aponta diretamente para o que precisa ser carregado.
- mantenha o `name` da skill igual ao nome da pasta, em minusculas e com hifens.

## Contrato minimo de uma skill

- `SKILL.md` com frontmatter `name`, `description`, `compatibility` quando fizer sentido e `metadata`;
- `agents/openai.yaml` coerente com a habilidade principal da skill;
- `references/` com pelo menos um `pattern`, `sequence-workflows.md` e `version-history.md`;
- `assets/` com pelo menos um template copiavel;
- `scripts/` quando a skill ganhar validacao ou utilitarios determinísticos.
- caminhos referenciados em `SKILL.md` sempre rasos e relativos a raiz da skill.

## Estrutura recomendada do `SKILL.md`

Uma boa skill deste repositório costuma ter:

1. `Inicio rapido`
2. `O que esta skill faz`
3. `Quando usar`
4. `Quando nao usar`
5. `Acoes que esta skill interpreta`
6. `Entradas tipicas`
7. `Workflow recomendado`
8. `Estrutura minima esperada`
9. `Versionamento leve`
10. `Antipadroes`
11. `Referencias sob demanda`
12. `Limites e seguranca`

Nem toda skill precisa exatamente dessas seções, mas ela deve sempre deixar claros:

- papel;
- fronteiras;
- acao principal interpretada;
- entradas esperadas;
- saidas esperadas.

## Pattern para `agents/openai.yaml`

Neste repositório, use o formato simples:

```yaml
display_name: "Nome humano"
short_description: "Resumo curto e direto"
default_prompt: "Use $nome-da-skill para ..."
```

Boas regras:

- `display_name`: legível por humanos e coerente com o nome da skill;
- `short_description`: curta, concreta e fácil de escanear;
- `default_prompt`: uma frase só, mencionando explicitamente `$nome-da-skill`;
- o prompt default pode partir de uma ação principal, mas deve deixar espaço para a skill interpretar a frase inicial do usuário.
- quando a skill aceitar mais de uma acao, o prompt default deve mencionar que a frase inicial do usuario orienta a classificacao.

## Pattern para `assets/`

- use `assets/` para templates, esqueletos, exemplos copiaveis e recursos usados na saida;
- prefira `assets/` quando o conteúdo for melhor consumido como estrutura a copiar do que como regra a ler;
- templates longos devem sair do `SKILL.md` e ser referenciados por caminho relativo.

## Pattern para `references/sequence-workflows.md`

- use um unico arquivo por skill para reduzir dispersao;
- separe por secao quando a skill tiver mais de uma acao principal;
- cada secao deve ter uma explicacao curta e um bloco Mermaid;
- prefira diagramas de sequencia simples, orientados a decisao e handoff, e nao mapas decorativos;
- o `SKILL.md` deve apontar explicitamente para esse arquivo em `Referencias sob demanda`.

## Pattern para `scripts/`

- crie `scripts/` quando a skill se beneficiar de validacao deterministica, processamento repetitivo ou comandos longos demais;
- scripts devem aceitar flags, evitar prompts interativos e oferecer `--help`;
- saida principal deve ser estruturada e previsivel sempre que possivel.

## Validacao minima

- valide o frontmatter contra a convenção do repositório, e nao apenas contra o validador minimo da `skill-creator`;
- valide `agents/openai.yaml` no formato simples usado pelo repositório atual;
- confirme que `SKILL.md` e `references/` apontam diretamente para as leituras sob demanda corretas;
- confirme que `references/sequence-workflows.md` cobre as acoes principais sem repetir o `SKILL.md`;
- confirme que `metadata.version` e `references/version-history.md` continuam coerentes.

## Regras de versionamento

- mantenha semver simples;
- inicie novas skills da base em `1.0.0`;
- use `-local` apenas quando houver customização local futura sobre uma base do framework já distribuída;
- registre toda mudança significativa em `references/version-history.md`;
- não use versionamento para microajustes sem consequência operacional.

## O que evitar

- skill nova para problema pontual;
- pacote de references inchado logo no nascimento;
- diagrama Mermaid espalhado em varios arquivos sem criterio claro;
- `SKILL.md` sem entradas e saidas;
- `openai.yaml` genérico demais para o papel da skill;
- referencias sem dono claro ou sem papel claro dentro da skill.
