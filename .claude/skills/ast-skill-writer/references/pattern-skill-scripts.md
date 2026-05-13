---
title: Pattern de scripts para skills
description: Define quando criar scripts, como referenciá-los e como desenhar interfaces não interativas para uso por agentes.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 00:41
  version: "1.0.0"
---

# Pattern de scripts para skills

## Objetivo

Padronizar quando uma skill deve ganhar `scripts/` e como esses scripts devem ser desenhados para uso confiavel por agentes.

## Quando criar um script

- quando a validacao precisa ser repetida muitas vezes;
- quando um comando cresce demais e fica dificil acertar de primeira;
- quando o fluxo se beneficia de comportamento mais deterministico;
- quando a skill precisa processar arquivos, gerar relatorios ou validar estrutura com saida previsivel.

## Quando nao criar um script

- quando um comando unico e curto ja resolve o caso com seguranca;
- quando o trabalho depende mais de julgamento do que de execucao repetitiva;
- quando o script criaria mais manutencao do que ganho real.

## Regras de desenho

- scripts devem ser nao interativos;
- toda entrada deve vir por flags, stdin ou variaveis de ambiente;
- o script deve expor `--help` com uso, flags e exemplos;
- erros devem dizer o que falhou, o que era esperado e como corrigir;
- stdout deve priorizar dados estruturados;
- stderr deve ficar para diagnosticos e progresso;
- operacoes sensiveis devem preferir `--dry-run`, `--confirm` ou salvaguarda equivalente.

Exemplo de uso neste pacote:

```bash
uv run scripts/validate_skill_package.py . --format text
```

Fallback aceitavel quando a dependencia ja estiver instalada localmente:

```bash
python3 scripts/validate_skill_package.py . --format text
```

## Dependencias

- para Python, prefira script autocontido com metadata inline e execucao por `uv run`;
- quando usar uma dependencia externa, declare isso no proprio script e no `SKILL.md`;
- se o repositorio ja tiver a dependencia disponivel localmente, ainda assim mantenha a interface do script clara e portavel.

## Referencia no `SKILL.md`

- cite o script por caminho relativo a partir da raiz da skill;
- explique quando rodar e o que esperar da saida;
- nao esconda a existencia do script so em `references/`.

## Checklist rapido

- o script roda sem prompt interativo?
- o `--help` ensina o uso minimo?
- a saida e previsivel para o agente?
- o erro ajuda a proxima tentativa?
- o script realmente reduz fragilidade do fluxo?
