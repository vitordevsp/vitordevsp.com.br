# Taxonomia do Framework

## Objetivo

Definir a taxonomia operacional que surgiu neste projeto e que agora passa a orientar a evolução do `studio.coding` como framework.

Este arquivo existe para responder onde cada tipo de conhecimento deve morar e quando uma necessidade deve virar `pattern`, `skill`, `routine`, `agent`, `plan`, `product`, `team`, `resource`, `memory`, `template` ou documentação viva de domínio.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- decidir em que camada um novo artefato deve nascer;
- mover um artefato de uma camada para outra;
- avaliar se um conhecimento local já amadureceu o suficiente para virar parte do framework;
- estruturar documentação ou execução reutilizável em mais de um projeto;
- revisar a fronteira entre regra, fluxo, ritual, especialização e memória.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- definição das camadas principais do framework documental;
- papel de cada tipo de artefato;
- critérios de promoção entre camadas;
- heurísticas de decisão para casos ambíguos.

Este arquivo não cobre:

- regras detalhadas de arquitetura por camada de código;
- estrutura específica de stores, services, pages ou componentes;
- conteúdo funcional dos domínios.

Para esses temas, consultar os demais patterns específicos e os docs vivos do domínio.

## Regras principais

- `pattern` existe para definir regra, limite, convenção ou taxonomia estável.
- `skill` existe para definir fluxo recorrente de execução.
- `routine` existe para definir um momento situacional do ciclo, geralmente perto de fechamento, transição ou validação.
- `agent` existe para definir papel especializado com julgamento próprio.
- `plan` existe para definir frente persistente entre várias sessões.
- `product` existe para centralizar fonte funcional de produto, histórias, critérios e contratos de API do produto.
- `team` existe para preservar contexto sobre projeto, ecossistema, ownership e vocabulário do time.
- `resource` existe para guardar referência estável, material auxiliar ou contexto de apoio.
- `memory` existe para preservar contexto acumulado que ainda não virou regra estável.
- `template` existe para servir de scaffold, boilerplate ou base gerável.
- docs vivos de domínio existem para explicar comportamento funcional e operacional do próprio domínio.

## Estrutura recomendada

### Quando usar cada camada

#### `pattern`

Use quando:

- o assunto muda decisão de implementação em vários lugares;
- o conhecimento precisa ficar estável e reutilizável;
- a pergunta principal for “qual é a regra certa?”.

Exemplos:

- taxonomia do framework
- versionamento
- documentação
- specs

#### `skill`

Use quando:

- existe sequência recorrente de leitura e ação;
- o valor está em reduzir esquecimento operacional;
- a pergunta principal for “como executar esse fluxo?”.

Exemplos:

- `build-specs`
- `build-plan`
- `implement-service`
- `build-project-history`

#### `routine`

Use quando:

- o fluxo acontece em um momento específico do ciclo;
- o valor está mais no ritual de passagem do que na capacidade ampla de construir algo novo;
- a pergunta principal for “o que preciso checar agora antes de passar de etapa?”.

Exemplos:

- fechamento pre-commit
- fechamento pre-release

#### `agent`

Use quando:

- o tema exige julgamento especializado recorrente;
- a saída esperada é mais parecer, diagnóstico ou direção do que execução mecânica;
- a pergunta principal for “quem deveria revisar isso com olhar especialista?”.

Exemplos:

- revisão de contrato de API
- revisão de UI
- revisão de logging

#### `plan`

Use quando:

- a frente vai durar mais de uma sessão;
- há risco de perder contexto;
- vale registrar escopo, dependências, checklist e log.

Planos vivem como pastas em `docs/plans/PLAN-NNN-descricao/`, começando apenas com `README.md`.

Separe arquivos auxiliares somente quando o plano crescer e essa separação reduzir ruído.

#### `product`

Use quando:

- o conteúdo vem de produto, UX ou contrato funcional oficial;
- a informação define comportamento esperado, jornada, critério de aceite ou requisito;
- a mesma fonte precisa ser consultada por stores, services, specs, planos e agentes;
- o conteúdo deve ser preservado sem edição livre pela implementação.

Exemplos:

- histórias de produto por domínio ou fluxo;
- critérios de aceite;
- OpenAPI e documentação de API ligada ao produto;
- materiais funcionais recebidos de outro time.

#### `team`

Use quando:

- o conteúdo explica o projeto dentro de um ecossistema maior;
- a informação ajuda a entender ownership, sistemas relacionados ou vocabulário do time;
- o conhecimento reduz dependência de contexto oral sem virar regra técnica.

Exemplos:

- contexto do projeto;
- mapa de ecossistema;
- ownership por área;
- glossário do time.

#### `resource`

Use quando:

- o material apoia implementação, validação ou leitura;
- ele não organiza sozinho o fluxo de trabalho;
- ele serve como referência complementar;
- o conteúdo não pertence claramente a `product`, `team`, `plans`, `patterns`, `skills`, `routines` ou `agents`.

Exemplos:

- mapas
- históricos preservados

#### `memory`

Use quando:

- o conhecimento ainda está vivo, mutável ou exploratório;
- ele precisa ser preservado antes de virar regra, plano ou resource;
- a pergunta principal for “o que não podemos esquecer por enquanto?”.

#### `template`

Use quando:

- o artefato precisa virar base gerável;
- o valor está em reaproveitar uma estrutura pronta;
- o framework deve conseguir instanciar aquilo em outro projeto.

## Critérios de promoção entre camadas

### De `memory` para `pattern`

Promover quando:

- o aprendizado deixou de ser local ou provisório;
- a regra passou a valer para mais de uma frente;
- o conteúdo já não depende de contexto oral.

### De `skill` para `routine`

Promover quando:

- o fluxo deixou de ser capacidade ampla;
- ele passou a representar um momento específico do ciclo;
- o valor está mais em fechamento e validação do que em construção.

### De `skill` para `agent`

Promover quando:

- a sequência de execução já não explica o valor principal;
- o caso passou a depender de julgamento especializado;
- a saída esperada ficou mais interpretativa do que procedural.

### De `memory` ou `resource` para `template`

Promover quando:

- a estrutura ficou repetível;
- faz sentido gerar a base automaticamente;
- o framework pode usá-la como scaffold em outros projetos.

## Heurística rápida de decisão

Quando houver dúvida, perguntar nesta ordem:

1. isso é uma regra?
2. isso é um fluxo recorrente?
3. isso é um ritual de momento específico?
4. isso exige julgamento especializado?
5. isso precisa sobreviver a várias sessões?
6. isso é fonte funcional de produto?
7. isso é contexto de time, projeto ou ecossistema?
8. isso é apenas referência auxiliar?
9. isso ainda está em amadurecimento?
10. isso já virou base gerável?

A primeira resposta forte costuma indicar a camada correta.

## Caso especial: `product-history` e `project-history`

### `product-history`

Tratar como fonte funcional de produto em `docs/product/history/<domain-or-flow>/product-history.md`.

Ele serve para:

- visão funcional;
- jornada da pessoa usuária;
- critérios de aceite;
- restrições importantes de produto.

Quando existir contexto funcional relevante, ele pode viver em `docs/` ou proximo ao codigo que implementa o comportamento.

### `project-history`

Tratar como artefato documental do projeto, não como substituto de plano ou changelog.

Ele serve para:

- explicar visão, escopo e funcionamento geral de um projeto ou módulo;
- registrar o que o projeto resolve, como ele está organizado e quais entregas estruturam sua evolução;
- apoiar onboarding e leitura de contexto antes da implementação.

Quando houver repetição de criação e manutenção desse documento, faz sentido existir uma `skill` para isso.

## Checklist de criação ou revisão

- o artefato está na camada certa?
- ele compete com outra camada já existente?
- a principal pergunta que ele responde está clara?
- há critério de promoção entre a camada atual e outra mais estável?
- o conteúdo ajuda tanto pessoas quanto agentes a tomar decisões melhores?

## Relação com outros patterns

- [`README.md`](./README.md) define as regras gerais da pasta de patterns.
- [`documentacao.md`](./documentacao.md) define como escrever e manter a documentação técnica.
- [`specs.md`](./specs.md) cobre o caso específico de `specs.md`.
