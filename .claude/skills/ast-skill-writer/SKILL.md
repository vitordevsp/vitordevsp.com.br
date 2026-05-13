---
name: ast-skill-writer
description: "Crie, refatore, expanda e reorganize skills em `.claude/skills/`, mantendo `SKILL.md` enxuto, `references/` sob demanda, versionamento leve e fronteiras claras com planos, tasks e docs."
compatibility: "Projetada para Agents Studio v0.1 e ambientes compatíveis com Agent Skills. O script opcional de validação prefere `uv run`, mas pode rodar com `python3` quando as dependencias ja estiverem disponiveis no ambiente."
metadata:
  author: agents-studio
  last_updated: 2026-05-12 01:57
  version: "1.0.0"
---

# ast-skill-writer

## Inicio rapido

1. Leia a primeira frase do usuario e classifique a acao principal: `criar`, `refatorar`, `expandir` ou `reorganizar`.
2. Inspecione a skill alvo e carregue apenas as fontes exatas relevantes.
3. Confirme se o caso realmente merece uma skill nova ou se cabe melhor em skill existente, plano, task ou docs.
4. Mantenha `SKILL.md` enxuto e mova detalhe longo para `references/`.
5. Registre ou revise o fluxo por acao em `references/sequence-workflows.md` com diagramas Mermaid curtos.
6. Se a skill tiver `scripts/`, use-os para validar estrutura e reduzir fragilidade operacional.
7. Feche a mudanca com `agents/openai.yaml`, `references/version-history.md`, `references/sequence-workflows.md` e registros documentais necessarios.

## O que esta skill faz

- criar skills novas quando houver fluxo recorrente, independente e claramente reutilizavel;
- refatorar skills existentes para ganhar clareza, seguranca, estrutura e aderencia ao Agents Studio v0.1;
- expandir skills existentes sem multiplicar artefatos desnecessarios;
- reorganizar pastas, `references/`, templates e versionamento de uma skill sem mudar sua responsabilidade central;
- incorporar conhecimento vindo de docs, execucoes reais ou conversas com agentes para melhorar a skill sem perder foco;
- decidir quando **nao** criar skill e redirecionar para skill existente, `plan`, `task` ou documentacao humana/operacional.

## Quando usar

- o fluxo aparece de forma recorrente ou e previsivelmente recorrente;
- a skill atual nao esta conseguindo orientar bem o trabalho que deveria cobrir;
- existe duvida real entre criar skill nova, expandir uma skill existente ou reorganizar a skill atual;
- a camada operacional precisa de contrato mais claro, referencias melhores ou versionamento minimo.

## Quando nao usar

- o pedido e pontual, pequeno ou descartavel, sem recorrencia real;
- o melhor artefato e uma `task`, um `plan` ou uma atualizacao de `docs/`;
- a mudanca cabe como ajuste localizado em skill existente, sem justificar skill nova;
- a proposta inflaria a v0.1 com muitas skills pequenas ou mal diferenciadas.

## Acoes que esta skill interpreta

| Acao | Quando usar | Entradas esperadas | Saidas esperadas |
|------|------|------|------|
| `criar` | quando o fluxo ainda nao tem skill propria | objetivo da capacidade, exemplos de uso recorrente, limites, skill dona (`ast-*` ou `app-*`) e referencias relacionadas | nova skill em `.claude/skills/<nome>/` com contrato minimo completo |
| `refatorar` | quando a skill existe, mas esta rasa, confusa ou desatualizada | caminho da skill, problemas observados, fontes relevantes e restricoes do repositorio | skill existente reescrita com contrato mais claro, referencias melhores e metadados coerentes |
| `expandir` | quando a skill atual cobre parte do caso, mas precisa absorver mais uma capacidade compatível | skill alvo, nova necessidade, exemplos de uso e fronteiras que devem ser preservadas | skill ampliada sem duplicacao e sem trocar de responsabilidade central |
| `reorganizar` | quando o problema principal esta na estrutura da pasta, nomenclatura, versionamento ou distribucao das referencias | skill alvo, pontos de desorganizacao, contrato que deve ser preservado | mesma skill com pacote mais coerente, referencias renomeadas/normalizadas e historico de versao atualizado |
| `incorporar-conhecimento` | quando o usuario quer transformar material novo em guidance reutilizavel para a skill | tipo de fonte informado na primeira linha do prompt (`doc`, `conversa`, `execucao`, `feedback`) e material correspondente | skill melhorada com conhecimento destilado no lugar certo: `SKILL.md`, `references/`, `assets/`, `scripts/` ou `version-history.md` |

Se a primeira frase do usuario vier ambigua, assuma a acao mais conservadora e registre a suposicao ao final do trabalho. Se a ambiguidade mudar escopo ou risco de forma relevante, pergunte antes de editar.

Nomes equivalentes que podem aparecer na frase inicial do usuario:

- `absorver-conhecimento`
- `destilar-aprendizados`
- `incorporar-contexto`

## Entradas tipicas

- frase inicial descrevendo a acao esperada;
- skill alvo ou necessidade recorrente a ser consolidada;
- exemplos de uso real ou previsivel;
- limites de escopo;
- docs vivas, planos, tasks ou fontes legadas que apoiam a decisao.

Se a entrada estiver incompleta, complete com inspeção do repositório e registre as premissas adotadas.

## Como incorporar conhecimento

Quando a acao principal for incorporar conhecimento:

1. classifique a fonte informada pelo usuario:
   - `doc`: especificacao, docs legadas, RFC, README, guideline externo;
   - `conversa`: troca com agente, review humano, retrospectiva de execucao;
   - `execucao`: tarefa real concluida, validacoes, erros corrigidos, checks;
   - `feedback`: correcao objetiva do usuario sobre comportamento da skill.
2. extraia apenas conhecimento reutilizavel e recorrente;
3. descarte detalhe acidental, historico ruidoso e contexto que nao generaliza;
4. decida o destino correto:
   - contrato principal -> `SKILL.md`;
   - regra ativa -> `references/pattern-*.md`;
   - template copiavel -> `assets/*.md`;
   - historico de evolucao -> `references/version-history.md`;
   - script reutilizavel -> `scripts/`.
5. registre a incorporacao no historico de versao quando ela alterar o comportamento da skill.

## Workflow recomendado

1. Ler a frase inicial e classificar a acao principal.
2. Inspecionar a skill alvo, o estado atual do pacote e as fontes exatas do caso.
3. Decidir se a melhor saida e criar, refatorar, expandir, reorganizar ou redirecionar para outro artefato.
4. Desenhar o pacote minimo da skill:
   - `SKILL.md`
   - `agents/openai.yaml`
   - `references/`
   - `assets/` para templates e recursos copiaveis
   - pelo menos um `pattern`
   - `references/sequence-workflows.md`
   - pelo menos um `template` em `assets/`
   - `references/version-history.md`
   - `scripts/`, quando a skill se beneficiar de validacao ou execucao deterministica
5. Reescrever o `SKILL.md` como contrato curto e operacional, com acoes, entradas, saidas, limites e workflow.
6. Mover detalhe longo para `references/` e templates para `assets/`, preservando progressive disclosure.
7. Criar ou atualizar scripts quando validacao, processamento ou verificacao repetivel justificarem um caminho mais deterministico.
8. Atualizar `agents/openai.yaml` com texto coerente e mais prescritivo.
9. Aplicar versionamento leve:
   - iniciar a base das skills em `1.0.0`;
   - reservar o sufixo `-local` para customizacoes locais futuras depois da base do framework estar consolidada;
   - registrar a versao e o resumo da mudanca em `references/version-history.md`.
10. Validar estrutura, clareza, fronteiras e registros documentais, preferindo os scripts da skill quando existirem.

## Estrutura minima esperada da skill

- frontmatter em `SKILL.md` com `name`, `description`, `compatibility` quando fizer sentido e `metadata`;
- `name` deve continuar alinhado ao nome da pasta da skill, em minusculas e com hifens;
- `agents/openai.yaml` com metadados coerentes com a skill;
- `references/` com nomes semanticos;
- pelo menos um `pattern` que detalhe a forma correta de aplicar a skill;
- `references/sequence-workflows.md` com fluxos Mermaid por acao principal da skill;
- pelo menos um `template` copiavel em `assets/` para o artefato principal da skill;
- `references/version-history.md` para rastrear versao base e customizacao local.

Neste repositorio, `agents/openai.yaml` segue o formato simples com chaves diretas (`display_name`, `short_description`, `default_prompt`). Use a `skill-creator` como base conceitual, nao como copia literal do schema.
Mantenha as referencias do `SKILL.md` rasas e diretas, evitando cadeias profundas de leitura.

## Versionamento leve

- todas as skills desta base nascem em `1.0.0`;
- `1.0.1`, `1.1.0`, `2.0.0`: evolucoes futuras da skill mantendo semver simples;
- `-local` fica reservado para customizacoes locais futuras sobre uma base do framework ja distribuida;
- bump `major` quando a skill muda contrato de forma incompatível;
- bump `minor` quando adiciona capacidade ou referencia estrutural relevante;
- bump `patch` quando melhora clareza, copy, idioma ou pequenos detalhes sem mudar o comportamento principal.

Mantenha o versionamento leve. O objetivo e evitar bagunca, nao criar ritual burocratico.

## Antipadroes

- criar skill nova antes de tentar expandir ou reorganizar uma existente;
- deixar `SKILL.md` generico e empurrar toda a utilidade para `references/`;
- esconder entradas, saidas e limites da skill;
- usar Mermaid como ornamento solto em vez de apoio objetivo para os fluxos da skill;
- recriar `.claude/agents/`, `.claude/patterns/` ou `.claude/routines/` como categorias vivas;
- usar `references/` como deposito sem dono;
- versionar por impulso sem registrar o que mudou.

## Referencias sob demanda

Carregue primeiro as referencias ativas desta skill:

- `references/pattern-skill-authoring.md`
- `references/pattern-skill-taxonomy.md`
- `references/pattern-skill-scripts.md`
- `references/sequence-workflows.md`
- `references/version-history.md`

Carregue assets e scripts quando a tarefa precisar de saidas copiaveis ou validacao deterministica:

- `assets/template-skill-package.md`
- `scripts/validate_skill_package.py`

## Scripts disponiveis

- `scripts/validate_skill_package.py` -> valida `SKILL.md`, `agents/openai.yaml`, `references/` e `assets/` com a convencao local do Agents Studio.

Uso recomendado:

```bash
uv run scripts/validate_skill_package.py . --format text
```

Fallback quando `uv` nao estiver disponivel no ambiente:

```bash
python3 scripts/validate_skill_package.py . --format text
```

## Limites e seguranca

- nao criar skill nova sem recorrencia real;
- nao tratar `product-owner` como fonte normativa;
- nao apagar arquivos existentes sem confirmacao explicita do usuario;
- nao lotar o contexto com leitura ampla de `docs_backup`;
- nao esquecer de atualizar docs/plans/tasks quando a recuperacao fizer parte de uma frente maior.
