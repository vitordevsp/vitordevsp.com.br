---
name: clone-docs-structure
description: Clonar, reconstruir ou sincronizar a camada docs/ de um projeto-fonte em outro projeto, preservando taxonomia, arquivos-base, fronteiras entre camadas e adaptando a estrutura ao contexto real do projeto de destino. Use quando a fonte de verdade estiver em um projeto interno como studio.coding e o destino precisar absorver essa base sem perder o que já evoluiu localmente.
last_updated: 2026-04-18 23:09
---

# Clone Docs Structure

Use esta skill quando a tarefa for portar, reconstruir ou sincronizar a pasta `docs/` de um projeto-fonte para outro projeto.

Ela existe para evitar cópias quebradas, pastas órfãs, READMEs faltando, taxonomias incompletas e sobrescritas indevidas quando a camada documental for transplantada só pela metade ou quando o projeto de destino já tiver evoluído além da fonte.

## Quando usar

Use esta skill quando:

- um novo projeto precisa receber a mesma arquitetura de `docs/`;
- a pasta `docs/` foi copiada parcialmente e precisa ser reconstruída;
- o projeto de destino ainda não tem uma taxonomia documental clara;
- alguém quer reaproveitar a estrutura de `patterns`, `skills`, `agents`, `routines`, `plans`, `product`, `team`, gestão de trabalho e `resources` em outro repositório;
- a documentação precisa nascer já pronta para uso humano e por IA;
- a fonte de verdade da estrutura estiver em um projeto interno, como `studio.coding`;
- o destino precisar ser comparado com a fonte antes de qualquer atualização;
- a cópia não deva ser literal, mas sim contextualizada para outro projeto.

## Quando nao usar

Nao use esta skill quando:

- a tarefa é copiar um único arquivo isolado;
- o projeto de destino já tem uma taxonomia documental própria e consolidada e não quer adotar a da fonte;
- o pedido é só mover documentação funcional de um domínio;
- a intenção é espelhar literalmente o conteúdo do projeto-fonte, sem adaptação ao novo projeto.

## Premissa de seguranca

O modo padrão desta skill deve ser conservador:

- analisar primeiro a estrutura da fonte;
- analisar depois a estrutura do destino;
- identificar o que o destino já tem;
- atualizar ou reconstruir de forma aditiva sempre que possível;
- evitar sobrescrever cegamente camadas que já estejam mais maduras no projeto de destino.

Se o destino estiver à frente da fonte em alguma camada, a skill deve preferir:

- manter o que já existe localmente;
- apontar divergências com clareza;
- sugerir sincronização seletiva em vez de regressão estrutural.

## Leitura obrigatoria

Sempre comece por:

1. `docs/README.md`
2. `docs/patterns/README.md`
3. `docs/skills/README.md`
4. `docs/patterns/documentacao.md`

Depois, carregue conforme a camada que precisa ser portada:

- `docs/plans/README.md`, se a camada de planos também for replicada;
- `docs/routines/README.md`, se a fonte já usar routines;
- `docs/product/notion/README.md`, se o projeto de destino também usar Notion como camada operacional;
- a camada local de gestão de trabalho, quando o projeto não usar ferramenta externa e os próprios docs precisarem funcionar como sistema principal de tasks;
- `MEMORY.md` e `CLAUDE.md`, quando a cópia também precisar preservar instruções e memória do repositório.

Quando a fonte de verdade estiver fora do projeto atual, ler também:

- `README.md` do projeto-fonte;
- a árvore real de `docs/` do projeto-fonte;
- os `README.md` internos das camadas que forem adotadas;
- os artefatos-base que definem a taxonomia mais recente da fonte.

## Entradas

O contexto ideal inclui:

- caminho da raiz do projeto-fonte;
- caminho da raiz do projeto de destino;
- objetivo da clonagem ou sincronização;
- indicação de quais camadas devem ser adotadas;
- restrições locais do destino, quando existirem.

Exemplo de fonte interna:

- `studio.coding`: `/home/vitordevsp/Documentos/code/vitordevsp/studio.coding/`

## Perguntas principais antes de clonar

Antes de começar, responder:

`o projeto de destino precisa da estrutura completa de docs/ ou apenas de uma base mínima com possibilidade de expansão futura?`

Essa resposta decide se a clonagem será:

- completa;
- mínima;
- incremental.

Também responder:

`o projeto de destino já está à frente da fonte em alguma camada de docs?`

Se estiver, a skill deve tratar a fonte como referência estrutural, e não como verdade absoluta a ser copiada literalmente.

## Estrutura-alvo que esta skill deve considerar

### Camada raiz de `docs/`

Arquivos e pastas base:

- `docs/README.md`
- `docs/patterns/`
- `docs/skills/`
- `docs/agents/`
- `docs/routines/`
- `docs/plans/`
- `docs/product/`
- `docs/team/`
- `docs/resources/`
- `docs/product/notion/` quando o projeto de destino também precisar desse adapter específico
- uma camada agnóstica de gestão de trabalho, quando o destino não usar ferramenta externa ou usar outro fornecedor

### Arquivos-base por pasta

#### Sempre recriar

Mesmo que a cópia esteja parcial, estes artefatos devem ser recriados:

- `docs/README.md`
- `docs/patterns/README.md`
- `docs/skills/README.md`
- `docs/agents/README.md`
- `docs/routines/README.md`
- `docs/plans/README.md`
- `docs/product/README.md`
- `docs/team/README.md`
- `docs/resources/README.md`

#### Recriar quando a pasta existir

- `docs/product/notion/README.md`
- `docs/product/notion/MEMORY.md`

#### Recriar quando a camada for adotada

- `docs/patterns/documentacao.md`
- `docs/patterns/specs.md`

Esses dois costumam ser a base mínima para sustentar leitura e evolução da documentação em projetos novos.

#### Recriar para ferramentas documentais quando a pasta existir

Quando uma ferramenta documental morar em uma pasta própria, preferir também:

- `README.md` curto da ferramenta;
- seção de log ou conhecimentos dessa ferramenta.

Exemplos:

- `docs/skills/<skill>/README.md`
- `docs/agents/<agent>/AGENT.md`
- `docs/agents/<agent>/README.md`
- `docs/routines/<routine>/README.md`

## Modos de clonagem recomendados

### 1. Clonagem minima

Use quando o projeto de destino ainda está começando.

Criar:

- `docs/README.md`
- `docs/patterns/README.md`
- `docs/patterns/documentacao.md`
- `docs/patterns/specs.md`
- `docs/skills/README.md`
- `docs/agents/README.md`
- `docs/routines/README.md`
- `docs/plans/README.md`
- `docs/product/README.md`
- `docs/team/README.md`
- `docs/resources/README.md`

Criar as pastas vazias, quando necessário:

- `docs/patterns/`
- `docs/skills/`
- `docs/agents/`
- `docs/routines/`
- `docs/plans/`
- `docs/product/`
- `docs/team/`
- `docs/resources/`

Nao criar por padrão:

- `docs/product/notion/`, a menos que o projeto realmente use Notion;
- uma camada local de tasks, a menos que o projeto vá gerir trabalho pelos próprios docs;
- planos antigos;
- agents, routines e skills muito específicos do projeto-fonte.

### 2. Clonagem estrutural completa

Use quando o projeto de destino quer herdar a taxonomia inteira.

Criar:

- todas as pastas-base de `docs/`;
- todos os READMEs de navegação;
- patterns-base;
- skills-base de criação, quando fizer sentido;
- routines-base, quando a taxonomia da fonte já usar essa camada;
- adapter `notion/`, se o projeto também usar Notion;
- camada local de gestão de trabalho, se o projeto não usar ferramenta externa ou operar em modo híbrido.

Adaptar:

- links para domínios reais do projeto de destino;
- exemplos de caminhos;
- listas de domínios documentados;
- referências a OpenAPI, Notion, Linear, Azure Boards e outros recursos externos.

### 3. Reconstrucao incremental

Use quando a pasta `docs/` foi copiada parcialmente.

Fluxo:

1. listar o que já existe;
2. comparar com a estrutura-alvo;
3. recriar READMEs faltantes primeiro;
4. recriar pastas vazias relevantes;
5. só depois preencher patterns, skills, routines e docs específicos.

## Ordem recomendada de recriacao

1. garantir a raiz `docs/README.md`;
2. recriar todas as pastas-base que o projeto realmente vai usar;
3. recriar os `README.md` internos de navegação;
4. recriar os patterns-base;
5. recriar skills, routines e agents apenas quando houver uso real;
6. criar `plans/`, `product/`, `team/` e `resources/` mesmo que com conteúdo mínimo quando fizerem sentido no destino;
7. criar `notion/` apenas se o projeto de destino usar essa camada operacional.

## Matriz de decisao por pasta

### `docs/patterns/`

Criar quando:

- o projeto precisar de regras estruturais e convencões técnicas;
- houver mais de uma pessoa ou IA atuando no código;
- o objetivo for reaproveitar a disciplina documental do projeto-fonte.

Arquivos mínimos:

- `README.md`
- `documentacao.md`
- `specs.md`

Arquivos que podem nascer depois:

- `aplicacao.md`
- `pages.md`
- `componentes.md`
- `stores.md`
- `services.md`
- `tipagem.md`
- `logging.md`

### `docs/skills/`

Criar quando:

- o projeto quiser padronizar fluxos recorrentes;
- houver chance real de reuso por IA ou por pessoas.

Arquivos mínimos:

- `README.md`

Criar skills específicas apenas quando houver repetição real.

### `docs/agents/`

Criar quando:

- o projeto quiser separar papéis especializados de fluxos recorrentes.

Arquivos mínimos:

- `README.md`

Nao criar agentes específicos por padrão em um projeto novo.

### `docs/routines/`

Criar quando:

- o projeto já distinguir fluxos recorrentes de rituais operacionais situacionais;
- houver fechamento pre-commit, pre-release ou outro momento específico do ciclo que mereça camada própria.

Arquivos mínimos:

- `README.md`

Nao criar routines específicas por padrão em um projeto novo sem evidência de uso real.

### `docs/plans/`

Criar quando:

- o projeto tiver frentes que atravessam várias sessões;
- houver necessidade de preservar contexto longo.

Arquivos mínimos:

- `README.md`

Opcional em bootstrap:

- um `PLAN-000` local, apenas se o time realmente usar bloco de notas de planos.

### `docs/product/`

Criar quando:

- o projeto precisar guardar histórias de produto, critérios de aceite, jornadas ou contratos de API ligados ao produto.

Arquivos mínimos:

- `README.md`

Arquivos que podem nascer depois:

- `api/README.md`
- `history/README.md`
- `history/<domain-or-flow>/product-history.md`

### `docs/team/`

Criar quando:

- o projeto se beneficia de contexto sobre time, ecossistema, ownership e vocabulário local.

Arquivos mínimos:

- `README.md`

Arquivos que podem nascer depois:

- `project-context.md`
- `ecosystem.md`
- `ownership.md`
- `glossary.md`

### `docs/resources/`

Criar quando:

- o projeto precisar guardar mapas, links, históricos preservados e materiais auxiliares que não pertencem a `product/` ou `team/`.

Arquivos mínimos:

- `README.md`

### `docs/product/notion/`

Criar apenas quando:

- o projeto usar Notion como camada operacional relevante;
- fizer sentido preservar estrutura de iniciativas, tasks e ciclos localmente.

Arquivos mínimos:

- `README.md`
- `MEMORY.md`

Arquivos que podem nascer depois:

- `framework.md`
- `data-sources.md`
- `iniciativas/`

### Camada local de gestão de trabalho

Criar apenas quando:

- o projeto não usar ferramenta externa de gestão;
- os próprios docs forem o sistema principal de planejamento e acompanhamento;
- o projeto operar em modo híbrido, combinando ferramenta externa com tasks ou snapshots locais.

Antes de criar uma pasta nova, preferir uma decisao explicita sobre nomes como `work`, `operations`, `delivery`, `tracking` ou `tasks`.

## O que adaptar ao projeto de destino

Ao clonar, sempre revisar:

- se a fonte é realmente a mais atual ou se o destino já superou partes dela;
- nomes de domínios em `src/*/docs`;
- referências a produtos e squads específicos;
- links para Notion, OpenAPI, Figma e outros sistemas;
- nomes de pessoas como ownership padrão;
- skills, routines ou agents que dependem de uma taxonomia já existente no repositório original.

Se a fonte for o `studio.coding`, adaptar também:

- qualquer menção ao framework como se ele fosse o próprio projeto de destino;
- camadas ainda não adotadas localmente;
- caminhos absolutos que sejam válidos só na máquina de origem.

## O que esta skill deve verificar

- se a estrutura copiada continua navegável mesmo sem algumas pastas;
- se faltam READMEs-base;
- se as ferramentas documentais em pasta própria merecem um `README.md` curto com log;
- se existem links quebrados para pastas ou arquivos que não foram levados;
- se o projeto de destino realmente precisa de `notion/`, `agents/`, `routines/` ou skills específicas;
- se a taxonomia ainda preserva a fronteira entre `patterns`, `skills`, `routines`, `agents`, `plans`, `product`, `team`, `resources` e `notion`;
- se a sincronização preservou o que o destino já tinha de mais maduro do que a fonte.

## Saida esperada

Uma execução bem fechada desta skill deve terminar com:

1. estrutura `docs/` recriada ou clonada no projeto de destino;
2. READMEs-base presentes para todas as pastas ativas;
3. definição clara do que foi clonado literalmente e do que foi só reconstruído;
4. links e referências adaptados ao projeto de destino;
5. indicação do que ficou mais avançado no destino do que na fonte, quando isso acontecer;
6. capacidade de expandir a camada depois sem recomeçar a taxonomia do zero.

## O que esta skill nao deve fazer

Esta skill nao deve:

- copiar tudo cegamente sem adaptar contexto;
- levar planos antigos e memória histórica sem verificar utilidade;
- assumir que todo projeto precisa da camada `notion/`;
- assumir que todo projeto precisa da camada `routines/`;
- recriar skills e agents específicos sem confirmar uso real;
- deixar a pasta `docs/` parcialmente funcional, sem READMEs de navegação;
- rebaixar uma camada local mais madura só porque a fonte ainda não chegou no mesmo ponto;
- tratar o projeto-fonte como modelo rígido quando ele deveria ser apenas referência estrutural.
