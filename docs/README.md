# Documentação do projeto

Esta pasta existe para organizar a documentacao estrutural do projeto e servir como ponto de entrada para leitura humana e uso por ferramentas de IA.

Na pratica, `docs/` funciona como um pequeno framework interno para desenvolvimento assistido por documentacao, memoria, planos e IA.

Use esta pasta para entender:

- como a documentacao esta distribuida;
- onde ficam os patterns tecnicos do projeto;
- quais fluxos recorrentes ja viraram skills reutilizaveis;
- quais momentos especificos do ciclo ja viraram routines;
- quando uma frente merece plano;
- onde procurar contexto complementar e referencias futuras.

## O que esta pasta representa

`docs/` concentra, ao mesmo tempo:

- regras de engenharia e organizacao de codigo;
- fluxos operacionais reutilizaveis;
- rituais operacionais de fechamento e validacao;
- planos para frentes multi-sessao;
- memoria operacional do projeto;
- camada documental do framework de trabalho;
- referencias complementares que sustentam implementacao, validacao e revisao.

Em resumo, esta pasta ajuda a responder quatro perguntas diferentes:

1. como construir;
2. como executar;
3. como manter contexto entre sessoes;
4. em que estrutura o trabalho esta sendo organizado.

## Papel de `docs/` como framework interno

Pensando em pessoas e IA atuando juntas no projeto, esta pasta cumpre estes papeis:

- **guia de decisao**: com `patterns/`, ajuda a decidir onde colocar responsabilidade e como estruturar codigo;
- **camada de execucao**: com `skills/`, transforma fluxos recorrentes em instrucoes reutilizaveis;
- **camada de ritual operacional**: com `routines/`, organiza momentos especificos do ciclo, especialmente perto de fechamento e validacao;
- **camada de continuidade**: com `plans/` e `MEMORY.md`, preserva contexto e evita perder trabalho entre sessoes;
- **camada de especializacao**: com `agents/`, separa papeis que exigem julgamento mais especifico;
- **camada de contexto do projeto**: com `team/`, registra projeto, ecossistema e glossario;
- **camada operacional do CMS**: com `notion/`, documenta como o Notion e usado como fonte de conteudo do site;
- **camada de apoio**: com `resources/`, guarda materiais auxiliares.

## Como a documentação está organizada

### [`patterns/`](./patterns/README.md)

Fonte de patterns tecnicos do projeto.

Use esta secao para entender como o codigo deve ser estruturado, documentado e evoluido.

Esta e a camada mais normativa de `docs/`.

### [`agents/`](./agents/README.md)

Espaco reservado para agentes realmente especializados, quando o projeto precisar de um papel mais pontual do que uma skill de fluxo.

### [`plans/`](./plans/README.md)

Espaco para planos estruturados de trabalho que atravessam varias sessoes ou varias camadas do projeto.

Use esta secao para acompanhar frentes em andamento, backlogs estruturados e migracoes maiores sem perder contexto entre ciclos.

### [`notion/`](./notion/README.md)

Camada documental da integracao com o Notion como CMS.

Use esta pasta para entender como os bancos de dados do Notion estao organizados, quais data sources existem e como o conteudo flui do Notion para o site.

### [`team/`](./team/README.md)

Camada de contexto sobre o projeto e ecossistema.

Use esta pasta para entender o proposito do projeto, sistemas relacionados e termos recorrentes.

### [`skills/`](./skills/README.md)

Camada de execucao reutilizavel do projeto.

Use esta pasta quando a necessidade nao for apenas documentar regras, mas padronizar uma sequencia recorrente de execucao que combine patterns, codigo e docs.

### [`routines/`](./routines/README.md)

Camada de rituais operacionais situacionais do projeto.

Use esta pasta quando o artefato descrever um momento especifico do ciclo de trabalho, como fechamento pre-commit.

### [`resources/`](./resources/README.md)

Espaco para contexto complementar, referencias, links uteis e materiais de apoio.

## Leitura por tipo de necessidade

### Quero entender a estrutura do projeto

1. [`../README.md`](../README.md)
2. este [`README.md`](./README.md)
3. [`patterns/README.md`](./patterns/README.md)
4. [`team/project-context.md`](./team/project-context.md)

### Quero implementar ou revisar código

1. `patterns/` da camada tocada
2. `skills/` da tarefa, quando existir skill apropriada
3. `plans/`, se a frente estiver aberta e estruturada

### Quero conduzir uma frente maior entre varias sessoes

1. [`plans/README.md`](./plans/README.md)
2. plano ativo da frente
3. `patterns/` e docs relacionados
4. `skills/`, quando houver fluxo recorrente que ajude na execucao

### Quero fechar um recorte antes de commitar

1. [`routines/README.md`](./routines/README.md)
2. rotina relevante em `docs/routines/`
3. [`skills/build-commit/SKILL.md`](./skills/build-commit/SKILL.md)

### Quero entender ou trabalhar com a integracao Notion

1. [`notion/README.md`](./notion/README.md)
2. [`notion/data-sources.md`](./notion/data-sources.md)
3. [`patterns/services.md`](./patterns/services.md) — padrao de integracao Notion

### Quero evoluir o proprio framework documental

1. este [`README.md`](./README.md)
2. [`patterns/documentacao.md`](./patterns/documentacao.md)
3. [`skills/README.md`](./skills/README.md)
4. [`routines/README.md`](./routines/README.md)
5. [`plans/README.md`](./plans/README.md)

## Onde começar

### Como usar os patterns no dia a dia

- mudou page ou rota: [`patterns/aplicacao.md`](./patterns/aplicacao.md) → [`patterns/pages.md`](./patterns/pages.md) → [`patterns/documentacao.md`](./patterns/documentacao.md)
- mudou componente: [`patterns/componentes.md`](./patterns/componentes.md) → [`patterns/documentacao.md`](./patterns/documentacao.md)
- mudou integracao Notion: [`patterns/services.md`](./patterns/services.md) → [`patterns/tipagem.md`](./patterns/tipagem.md) → [`patterns/documentacao.md`](./patterns/documentacao.md)
- mudou changelog, release ou regra de versao: [`patterns/versionamento.md`](./patterns/versionamento.md) → [`patterns/documentacao.md`](./patterns/documentacao.md)
- mudou a taxonomia estrutural de `docs/`: [`patterns/taxonomia-framework.md`](./patterns/taxonomia-framework.md) → [`patterns/documentacao.md`](./patterns/documentacao.md)

### Pessoa nova no projeto

1. [`../README.md`](../README.md)
2. [`team/project-context.md`](./team/project-context.md)
3. [`patterns/README.md`](./patterns/README.md)

### Pessoa implementando ou mantendo uma pagina

1. [`patterns/pages.md`](./patterns/pages.md)
2. [`patterns/aplicacao.md`](./patterns/aplicacao.md)
3. [`patterns/componentes.md`](./patterns/componentes.md)
4. [`patterns/tipagem.md`](./patterns/tipagem.md)
5. [`patterns/documentacao.md`](./patterns/documentacao.md)

### IA ou automação atuando no repositório

1. [`patterns/README.md`](./patterns/README.md)
2. [`skills/README.md`](./skills/README.md), quando a tarefa pedir uma sequencia recorrente de execucao
3. [`routines/README.md`](./routines/README.md), quando a tarefa envolver um momento especifico de fechamento ou validacao
4. [`agents/README.md`](./agents/README.md), quando precisar de um agente realmente especializado
5. [`notion/README.md`](./notion/README.md), quando a tarefa depender do Notion como CMS

## Como pensar a taxonomia

Quando houver duvida sobre onde algo deve morar, usar esta heuristica:

- `patterns/` quando o assunto define regra, limite ou convencao;
- `skills/` quando o assunto define uma sequencia recorrente de execucao;
- `routines/` quando o assunto define um ritual operacional situacional;
- `agents/` quando o assunto define um papel especializado com julgamento proprio;
- `plans/` quando a frente precisa sobreviver a varias sessoes;
- `team/` quando o conteudo explica o projeto, o ecossistema ou o glossario;
- `notion/` quando o contexto vem da estrutura do Notion como CMS;
- `resources/` quando o material apoia, mas nao organiza sozinho o fluxo.

## O que nao fazer com esta pasta

Evitar transformar `docs/` em:

- deposito de textos sem dono;
- espelho cego de ferramentas externas;
- backlog paralelo desconectado de `plans/`;
- colecao de skills ou agents criados sem repeticao real.

## Regra final

Se `docs/` continuar evoluindo nessa direcao, vale tratar esta pasta como infraestrutura documental do repositório.

Isso significa:

- ela nao e acessoria;
- ela influencia a forma de implementar;
- ela influencia a forma de planejar;
- ela influencia a forma de usar IA com consistencia;
- e ela merece manutencao intencional, como qualquer outra camada importante do projeto.
