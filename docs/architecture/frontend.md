# Arquitetura Frontend

Este documento define as regras de organização frontend do `site-vitorsampaio`.

## Stack

* Next.js
* React
* TypeScript
* CSS Modules
* Server Components por padrão

## Princípios

* `app/` faz roteamento e composição.
* `features/` concentra domínios do produto.
* `integrations/` concentra serviços externos.
* `shared/` concentra código reutilizável e independente de domínio.
* `content/` concentra dados estáticos mantidos no código.
* UI não deve consumir objetos brutos da API do Notion.
* Client Components devem ser exceção, não padrão.

## Estrutura esperada

```txt
src/
  app/
  features/
  integrations/
  shared/
  content/
```

## `src/app`

Responsável por rotas, layouts e composição de páginas.

```txt
app/
  layout.tsx
  page.tsx
  jardim/
    page.tsx
    [slug]/
      page.tsx
  projetos/
    page.tsx
    [slug]/
      page.tsx
  galeria/
    page.tsx
    videos/
      page.tsx
    livros/
      page.tsx
    cultura/
      page.tsx
    viagens/
      page.tsx
  cursos/
    page.tsx
    [slug]/
      page.tsx
  sobre/
    page.tsx
```

### Pode conter

* rotas;
* layouts;
* loading/error/not-found;
* composição de features;
* metadata;
* chamadas server-side necessárias para a página.

### Evitar

* lógica complexa de domínio;
* helpers genéricos;
* mappers do Notion;
* componentes reutilizáveis grandes;
* estado client desnecessário.

## `src/features`

Responsável pelos domínios do produto.

```txt
features/
  garden/
  projects/
  gallery/
  courses/
```

Estrutura sugerida por feature:

```txt
feature-name/
  api/
  model/
  ui/
  lib/
```

Use apenas as pastas necessárias. Não crie estrutura vazia sem uso real.

### `api/`

Funções orientadas ao domínio.

Exemplo:

```txt
features/garden/api/get-text-posts.ts
features/projects/api/get-projects.ts
```

Essas funções podem usar `integrations/notion`, mas devem retornar modelos internos.

### `model/`

Tipos, constantes e regras do domínio.

Exemplo:

```txt
features/garden/model/text-post.ts
features/projects/model/project.ts
```

### `ui/`

Componentes específicos da feature.

Exemplo:

```txt
features/garden/ui/text-post-card.tsx
features/garden/ui/maturity-badge.tsx
features/projects/ui/project-card.tsx
```

### `lib/`

Helpers locais da feature.

Não colocar helpers globais aqui.

## `src/integrations`

Responsável por serviços externos.

```txt
integrations/
  notion/
    client.ts
    queries.ts
    blocks.ts
    mappers/
    types.ts
```

### Regras

* Integração Notion deve ser server-only.
* Tokens não podem sair dessa camada.
* Dados brutos devem ser normalizados antes de chegar na UI.
* Não criar duas integrações Notion paralelas.
* Não recriar sistema legacy.

## `src/shared`

Responsável por recursos reutilizáveis.

```txt
shared/
  ui/
  layout/
  lib/
  config/
  styles/
```

### `ui/`

Componentes base e reutilizáveis.

Exemplos:

```txt
button/
card/
tag/
heading/
container/
```

### `layout/`

Componentes estruturais compartilhados.

Exemplos:

```txt
site-header/
site-footer/
main-layout/
```

### `lib/`

Helpers genéricos.

Exemplos:

```txt
format-date.ts
slug.ts
cn.ts
```

### `config/`

Configurações públicas e constantes.

Exemplos:

```txt
site.ts
navigation.ts
```

### `styles/`

Estilos globais, tokens e reset.

## `src/content`

Dados estáticos mantidos no código.

Exemplo:

```txt
content/
  site.ts
```

Uso esperado:

* nome do site;
* descrição padrão;
* links sociais;
* dados públicos fixos do autor;
* configurações editoriais simples.

Conteúdo editorial principal deve vir do Notion.

## Server Components

Use por padrão.

Indicado para:

* pages;
* layouts;
* listagens server-side;
* renderização de conteúdo editorial;
* componentes sem interação client.

## Client Components

Use apenas quando necessário.

Indicado para:

* menu mobile;
* filtros client-side;
* scroll spy;
* componentes com estado local;
* eventos do navegador;
* APIs do browser.

Não aplicar `"use client"` em página inteira por conveniência.

## Fetching

Preferir fetching no servidor.

Regras:

* pages podem chamar funções de feature;
* funções de feature podem chamar integrações;
* integrações acessam Notion;
* UI recebe modelo interno pronto.

Fluxo esperado:

```txt
page.tsx
  → feature/api
  → integrations/notion
  → mapper
  → model interno
  → component/ui
```

## Imports

Preferir imports explícitos.

Exemplo:

```ts
import { TextPostCard } from '@/features/garden/ui/text-post-card'
import { Container } from '@/shared/ui/container'
```

Evitar barrel export global obrigatório.

Barrels locais podem existir quando simplificarem uma pasta sem esconder origem demais.

## Componentes

Regras gerais:

* componente deve ter responsabilidade clara;
* separar componente de domínio de componente genérico;
* evitar componente genérico cedo demais;
* evitar props que espelham objeto bruto do Notion;
* preferir composição explícita.

## Tipagem

* Tipos de domínio ficam em `features/*/model`.
* Tipos brutos ou auxiliares do Notion ficam em `integrations/notion`.
* Tipos compartilhados só entram em `shared` se forem realmente genéricos.
* UI deve receber tipos internos do domínio.

## Estilos

* CSS Modules por componente.
* Estilos globais apenas para reset, tokens e base.
* Não usar Tailwind.
* Não usar Chakra UI.
* Não misturar lógica de estilo com integração de dados.

## Estado

Sem estado global no MVP.

Permitido:

* estado local em Client Components;
* estado de UI simples;
* filtros locais quando fizer sentido.

Evitar:

* Zustand;
* Redux;
* Context global;
* stores por antecipação.

## Metadata

Páginas públicas devem definir metadados quando possível.

Fonte esperada:

* dados estáticos de `content/`;
* modelos internos vindos das features;
* fallback global.

## Padrão de criação de nova página

Ao criar uma página:

1. Confirmar rota em `docs/product/information-architecture.md`.
2. Verificar modelo em `docs/product/content-model.md`.
3. Criar ou usar feature correspondente.
4. Buscar dados via função server-side.
5. Renderizar com componentes de domínio/shared.
6. Definir metadata básica.
7. Evitar Client Component sem necessidade.

## Padrão de criação de nova feature

Ao criar uma feature:

1. Criar pasta em `src/features/<feature>`.
2. Criar `model/` se houver tipos/regras.
3. Criar `api/` se houver fetching ou composição de dados.
4. Criar `ui/` para componentes específicos.
5. Criar `lib/` apenas se houver helper local.
6. Não criar pastas vazias sem uso.

## O que evitar

* Lógica de Notion dentro de componente.
* `"use client"` desnecessário.
* Barrel export global obrigatório.
* Duplicação de modelos.
* Helpers genéricos dentro de feature.
* Componentes compartilhados acoplados a domínio.
* Estado global antes da necessidade real.
* API routes internas sem motivo claro.

## Critério de sucesso

A arquitetura frontend está correta quando:

* rotas são fáceis de localizar;
* features têm domínio claro;
* integrações externas ficam isoladas;
* UI consome modelos internos;
* Server Components são o padrão;
* CSS Modules organizam estilos por componente;
* novas áreas do sitemap podem ser adicionadas sem reescrever a base.
