# Versionamento

## Objetivo

Definir como o projeto e o framework devem pensar versionamento, `CHANGELOG.md`, release e semver.

Este arquivo existe para evitar releases arbitrárias, changelog inconsistente e decisões de versão baseadas apenas em intuição.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar ou manter `CHANGELOG.md`;
- decidir versão de release;
- classificar impacto de uma mudança;
- revisar se uma frente merece `major`, `minor` ou `patch`;
- criar ferramentas como `build-changelog`, `build-release` ou agentes de curadoria de versão.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- critérios de classificação de mudanças;
- relação entre changelog e semver;
- categorias recomendadas de release;
- regras para decidir se uma mudança entra ou não em changelog;
- fronteira entre documentação interna e mudança pública.

Este arquivo não cobre:

- convenção de mensagens de commit em detalhe;
- processo de publicação automatizada;
- workflow de CI/CD.

## Regras principais

- O projeto deve usar semver como linguagem principal de versão: `major.minor.patch`.
- `major` representa quebra pública relevante de contrato, fluxo ou interface esperada.
- `minor` representa adição compatível de capacidade, fluxo ou ferramenta.
- `patch` representa correção compatível, ajuste local ou melhoria sem ampliação de superfície pública.
- Mudança documental só deve afetar versão quando alterar a forma oficial de usar, integrar ou operar o sistema.
- `CHANGELOG.md` não é espelho do git; ele registra mudanças com valor para leitura humana futura.

## Estrutura recomendada

### Como classificar a mudança

#### `major`

Usar quando houver:

- quebra de contrato público;
- mudança incompatível em comportamento esperado;
- remoção ou substituição de fluxo oficial;
- alteração que exija adaptação explícita de consumidores.

#### `minor`

Usar quando houver:

- nova capacidade compatível;
- novo fluxo oficial;
- nova ferramenta reutilizável;
- expansão relevante de uso sem quebrar o que já existia.

#### `patch`

Usar quando houver:

- correção de bug;
- ajuste de comportamento compatível;
- melhoria de clareza ou consistência sem ampliar superfície pública;
- manutenção documental sem mudança estrutural importante.

### O que entra no `CHANGELOG.md`

Entrar quando a mudança:

- altera capacidade percebida por quem usa ou mantém o sistema;
- muda a forma oficial de implementar, operar ou integrar;
- cria ou remove uma ferramenta relevante;
- fecha uma frente importante do produto ou do framework.

Não entrar quando a mudança:

- é ruído local sem impacto durável;
- representa só reorganização interna sem efeito prático para manutenção;
- repete informação que o histórico de commit já cobre melhor.

### Categorias recomendadas

Quando fizer sentido, preferir estas categorias:

- `Adicionado`
- `Alterado`
- `Corrigido`
- `Removido`
- `Infraestrutura documental`

### Relação entre commit, plano e changelog

- Commit explica um recorte de trabalho.
- Plano explica uma frente multi-sessão.
- Changelog explica o que mudou de forma relevante para leitura histórica.

Nem todo commit merece changelog.
Nem todo plano concluído vira entrada de changelog.
Mas mudanças grandes costumam nascer de vários commits e de um ou mais planos.

## Checklist de criação ou revisão

- a mudança é `major`, `minor` ou `patch`?
- existe quebra pública real ou só refatoração interna?
- a mudança altera uso, manutenção ou integração de forma relevante?
- vale registrar no changelog ou o histórico de commits já basta?
- a categoria escolhida ajuda leitura humana futura?
- existe relação com plano concluído que ajude a explicar a mudança?

## Relação com outros patterns

- [`taxonomia-framework.md`](./taxonomia-framework.md)
- [`documentacao.md`](./documentacao.md)
- [`specs.md`](./specs.md), quando a mudança afetar comportamento formalizado em spec
