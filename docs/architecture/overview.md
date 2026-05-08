# Visão Geral de Arquitetura

Este documento define a arquitetura geral do `site-vitorsampaio`.

Ele deve orientar a reconstrução técnica do projeto e servir como referência inicial para decisões de implementação.

## Objetivo arquitetural

Construir uma aplicação web pública, editorial e evolutiva, com foco em leitura, portfólio e jardim digital.

A arquitetura deve permitir:

* renderização server-side de conteúdo editorial;
* integração segura com Notion;
* separação entre CMS, modelos internos e UI;
* manutenção simples;
* evolução incremental;
* boa legibilidade para humanos e agentes de IA.

## Stack inicial

Stack definida para o projeto:

* Next.js;
* React;
* TypeScript;
* CSS Modules;
* Notion API como CMS editorial;
* Vercel como plataforma provável de deploy.

## Decisões técnicas principais

* A aplicação deve ser server-first / RSC-first.
* Pages devem ser Server Components por padrão.
* Client Components devem ser usados apenas para interações reais no navegador.
* Dados editoriais devem ser buscados no servidor.
* Tokens e secrets não devem ser expostos ao client.
* CSS Modules será o padrão principal de estilização.
* Tailwind não será usado no MVP.
* Chakra UI não será usado no MVP.
* Não haverá backend próprio no MVP.
* Não haverá autenticação no MVP.
* Não haverá estado global no MVP.
* A UI não deve depender diretamente de objetos brutos da API do Notion.

## Fluxo de dados

Fluxo esperado:

```txt
Notion
  → integrations/notion
  → mappers
  → modelos internos
  → features
  → app routes
  → UI renderizada
```

A camada de UI deve consumir modelos internos estáveis.

Componentes não devem conhecer detalhes como:

* propriedades brutas do Notion;
* blocos crus da API, exceto renderizadores especializados;
* nomes internos de databases;
* tokens;
* lógica de paginação ou fetch da API externa.

## Estrutura conceitual de pastas

Estrutura esperada para a aplicação:

```txt
src/
  app/
  features/
  integrations/
  shared/
  content/
```

A estrutura final pode evoluir, mas deve preservar a separação de responsabilidades descrita neste documento.

## Responsabilidade de `src/app`

`src/app` deve conter roteamento, layouts e composição de páginas.

Responsabilidades:

* definir rotas;
* compor páginas com componentes de domínio;
* executar fetching server-side quando fizer sentido;
* configurar metadados de página;
* organizar layouts globais e segmentados.

Não deve conter:

* lógica complexa de domínio;
* mappers do Notion;
* componentes reutilizáveis genéricos;
* estado global;
* lógica de integração externa espalhada.

## Responsabilidade de `src/features`

`src/features` deve conter domínios do produto.

Exemplos:

```txt
features/
  garden/
  projects/
  gallery/
  courses/
```

Cada feature pode conter:

```txt
api/
model/
ui/
lib/
```

Uso esperado:

* `api/`: funções de consulta orientadas ao domínio, usando integrações internas;
* `model/`: tipos, normalizações e regras do domínio;
* `ui/`: componentes específicos daquela feature;
* `lib/`: helpers locais da feature.

Nem toda feature precisa começar com todas essas pastas. Crie apenas quando houver uso real.

## Responsabilidade de `src/integrations`

`src/integrations` deve conter integrações com serviços externos.

Para o MVP, a integração principal é o Notion.

Exemplo:

```txt
integrations/
  notion/
    client.ts
    queries.ts
    blocks.ts
    mappers/
    types.ts
```

Responsabilidades:

* configurar cliente Notion;
* executar chamadas server-side;
* lidar com paginação da API;
* mapear dados brutos para modelos internos;
* centralizar detalhes técnicos do CMS.

Não deve conter componentes de UI.

## Responsabilidade de `src/shared`

`src/shared` deve conter recursos reutilizáveis e independentes de domínio.

Exemplos:

```txt
shared/
  ui/
  layout/
  lib/
  config/
  styles/
```

Uso esperado:

* `ui/`: componentes base e reutilizáveis;
* `layout/`: estruturas compartilhadas de layout;
* `lib/`: helpers genéricos;
* `config/`: configurações públicas e constantes;
* `styles/`: estilos globais, tokens e utilitários.

Componentes em `shared` não devem depender de uma feature específica.

## Responsabilidade de `src/content`

`src/content` deve conter dados estáticos mantidos no código quando fizer sentido.

Exemplos:

```txt
content/
  site.ts
```

Uso esperado:

* nome do site;
* links sociais;
* metadados públicos;
* informações fixas do autor;
* configurações editoriais simples.

Dados editoriais principais devem continuar vindo do Notion.

## Rotas principais

Sitemap previsto:

```txt
/
/jardim
/jardim/[slug]
/projetos
/projetos/[slug]
/galeria
/galeria/videos
/galeria/livros
/galeria/cultura
/galeria/viagens
/cursos
/cursos/[slug]
/sobre
```

A implementação pode ser faseada, mas a arquitetura deve reconhecer o sitemap completo.

## Server Components e Client Components

Use Server Components por padrão.

Client Components só devem ser usados quando houver necessidade real de:

* estado local interativo;
* eventos do navegador;
* animações dependentes do client;
* scroll spy;
* filtros client-side;
* menus interativos;
* componentes que dependem de APIs do browser.

Não use `"use client"` em páginas inteiras por conveniência.

## Integração com Notion

A integração com Notion deve ser server-only.

Regras:

* usar variáveis de ambiente apenas no servidor;
* centralizar cliente em `src/integrations/notion`;
* criar funções de query por necessidade real;
* mapear dados para modelos internos antes de chegar na UI;
* documentar databases em `docs/reference/notion-databases.md`;
* não recriar sistemas legacy;
* não manter duas integrações paralelas.

## Modelos internos

A aplicação deve trabalhar com modelos internos como:

* `TextPost`;
* `Project`;
* `Video`;
* `Book`;
* `CultureItem`;
* `Place`;
* `Course`.

Esses modelos são definidos conceitualmente em:

```txt
docs/product/content-model.md
```

A implementação pode ajustar detalhes, mas deve preservar a separação entre dados brutos e modelos internos.

## Estilização

CSS Modules é o padrão de estilização de componentes.

Regras gerais:

* usar `.module.css` ou `.module.scss` conforme configuração final;
* manter estilos globais mínimos;
* centralizar tokens globais;
* evitar Tailwind;
* evitar Chakra UI;
* evitar bibliotecas visuais pesadas sem decisão explícita.

Detalhes ficam em:

```txt
docs/architecture/styling.md
```

## Estado da aplicação

No MVP, não deve haver estado global.

Dados editoriais vêm do servidor e são passados por props.

Estado local pode existir em componentes interativos, como:

* menu mobile;
* filtros client-side;
* controles de UI;
* componentes de navegação.

Não introduzir Zustand, Redux, Context global ou soluções similares sem decisão explícita.

## Backend e APIs

No MVP, não há backend próprio.

A aplicação pode usar recursos server-side do Next.js para:

* buscar dados no Notion;
* gerar páginas;
* compor metadados;
* tratar dados editoriais.

Evite criar API routes internas sem necessidade clara.

Não criar backend dedicado, banco próprio ou autenticação sem decisão registrada.

## Variáveis de ambiente

Variáveis sensíveis devem ficar restritas ao servidor.

Exemplos esperados:

```txt
NOTION_TOKEN
NOTION_DATABASE_*
```

Regras:

* não prefixar secrets com `NEXT_PUBLIC_`;
* não logar tokens;
* não passar tokens para componentes client;
* documentar variáveis necessárias quando forem definidas.

## Dependências

Dependências devem ser adicionadas com critério.

Antes de instalar uma nova biblioteca, verificar:

* se o problema existe agora;
* se não há solução simples nativa;
* se a biblioteca não aumenta complexidade desnecessária;
* se combina com as decisões do projeto;
* se precisa ser registrada na documentação.

Evite dependências grandes para problemas pequenos.

## Performance

A arquitetura deve favorecer páginas rápidas e estáveis.

Princípios:

* buscar dados no servidor;
* evitar JavaScript client desnecessário;
* reduzir acoplamento de renderização;
* usar cache/revalidação de forma explícita quando necessário;
* não fazer fetch aninhado excessivo sem necessidade.

Estratégias específicas de cache devem ser decididas durante a implementação da integração Notion.

## SEO e metadados

O site deve ter boa estrutura de metadados.

Páginas públicas devem considerar:

* title;
* description;
* Open Graph;
* canonical, quando necessário;
* imagem social, quando disponível.

Metadados devem usar modelos internos, não dados brutos da API externa diretamente.

## Acessibilidade

A interface deve preservar boas práticas básicas de acessibilidade.

Regras:

* HTML semântico;
* hierarquia correta de headings;
* contraste adequado;
* foco visível;
* textos alternativos em imagens relevantes;
* navegação por teclado em componentes interativos.

## Documentação como parte da arquitetura

A pasta `docs/` é parte estrutural do projeto.

Mudanças importantes devem ser refletidas na documentação.

Quando houver divergência entre código e documentação, a divergência deve ser tratada explicitamente.

Não assumir que o código sempre vence. Em decisões de produto e arquitetura, a documentação pode representar a intenção correta e o código pode estar defasado.

## Fora de escopo arquitetural inicial

Não implementar sem decisão explícita:

* autenticação;
* painel administrativo;
* banco de dados próprio;
* backend dedicado;
* estado global;
* comentários;
* área de membros;
* pagamentos;
* busca semântica;
* embeddings;
* chat com IA;
* múltiplos CMS;
* sistema complexo de permissões.

## Critério de sucesso

A arquitetura será bem-sucedida quando:

* o site conseguir renderizar conteúdo editorial do Notion com segurança;
* a UI não depender do formato bruto do Notion;
* o código for simples de navegar;
* rotas, features e integrações tiverem responsabilidades claras;
* a aplicação puder evoluir por fases;
* agentes de IA conseguirem entender o projeto a partir da documentação;
* a manutenção continuar viável para uma pessoa.
