# Arquitetura

Arquitetura geral e regras de organização frontend do `site-vitorsampaio`.

Para integração com Notion, ver [`notion.md`](notion.md). Para estilos, ver [`styling.md`](styling.md). Para modelos internos, ver [`content-model.md`](content-model.md).

## Stack

* Next.js + React + TypeScript;
* CSS Modules;
* Notion como CMS editorial (server-only);
* Vercel como plataforma provável de deploy.

## Decisões técnicas

* Server-first / RSC-first. Ver [ADR-004](decisions/ADR-004-rsc-first-frontend.md).
* CSS Modules. Ver [ADR-005](decisions/ADR-005-css-modules.md).
* Notion como CMS. Ver [ADR-002](decisions/ADR-002-notion-as-cms.md).
* Restrições do MVP listadas no [`README.md`](README.md).

## Fluxo de dados

```txt
Notion
  → integrations/notion
  → mappers
  → modelos internos
  → features
  → app routes
  → UI renderizada
```

Componentes não conhecem propriedades brutas do Notion, blocos crus, nomes de databases, tokens ou lógica de fetch.

## Estrutura de pastas

```txt
src/
  app/
  features/
  integrations/
  shared/
  content/
```

A estrutura final pode evoluir; a separação de responsabilidades deve ser preservada.

### `src/app`

Roteamento, layouts e composição de páginas.

```txt
app/
  layout.tsx
  page.tsx
  jardim/
    page.tsx
    [slug]/page.tsx
  projetos/
    page.tsx
    [slug]/page.tsx
  galeria/
    page.tsx
    videos/page.tsx
    livros/page.tsx
    cultura/page.tsx
    viagens/page.tsx
  cursos/
    page.tsx
    [slug]/page.tsx
  sobre/page.tsx
```

Pode conter rotas, layouts, loading/error/not-found, composição de features, metadata e chamadas server-side da página. **Não** conter lógica de domínio, helpers genéricos, mappers do Notion, componentes reutilizáveis grandes ou estado client desnecessário.

### `src/features`

Domínios do produto.

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
  api/       funções server-side orientadas ao domínio
  model/     tipos, regras e constantes
  ui/        componentes específicos
  lib/       helpers locais
```

Criar apenas o que tiver uso real.

### `src/integrations`

Serviços externos. No MVP, apenas Notion. Detalhes em [`notion.md`](notion.md).

### `src/shared`

Reutilizáveis independentes de domínio.

```txt
shared/
  ui/        componentes base (button, card, tag, heading, container)
  layout/    site-header, site-footer, main-layout
  lib/       helpers genéricos (format-date, slug, cn)
  config/    site.ts, navigation.ts
  styles/    globals, reset, tokens
```

Componentes em `shared` não dependem de feature específica.

### `src/content`

Dados estáticos mantidos no código: nome do site, descrição padrão, links sociais, metadados públicos, configurações editoriais simples. Conteúdo editorial principal vem do Notion.

## Server Components e Client Components

Server Components por padrão.

Client Components apenas quando houver necessidade real:

* estado local interativo;
* eventos do navegador;
* menu mobile;
* filtros client-side;
* scroll spy;
* animações dependentes do client;
* APIs do browser.

Não usar `"use client"` para resolver import incompatível sem investigar, nem em página inteira por conveniência.

## Fetching

```txt
page.tsx
  → feature/api
  → integrations/notion
  → mapper
  → modelo interno
  → componente/ui
```

Pages e funções de feature ficam no servidor. UI recebe modelo interno pronto.

## Imports

Imports explícitos:

```ts
import { TextPostCard } from '@/features/garden/ui/text-post-card'
import { Container } from '@/shared/ui/container'
```

Barrel export global obrigatório é evitado. Barrels locais podem existir quando simplificarem uma pasta sem esconder origem.

## Tipagem

* Tipos de domínio: `features/*/model`.
* Tipos auxiliares do Notion: `integrations/notion`.
* Tipos compartilhados em `shared` apenas se forem realmente genéricos.
* UI recebe tipos internos do domínio.

## Componentes

* responsabilidade clara;
* componente de domínio separado de componente genérico;
* não promover componente de feature para `shared` cedo demais;
* não criar genérico antes do segundo caso real;
* props explícitas;
* não espelhar objeto bruto do Notion em props.

## Estado

Sem estado global no MVP.

Permitido: estado local em Client Components, filtros locais, UI simples.

Não introduzir Zustand, Redux ou Context global sem decisão registrada.

## Backend e APIs

Sem backend próprio no MVP. Usar recursos server-side do Next.js para buscar dados, gerar páginas, compor metadados.

API routes só com necessidade clara (webhook, revalidação manual, endpoint público específico).

## Variáveis de ambiente

Variáveis sensíveis ficam restritas ao servidor.

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

Antes de instalar:

* o problema existe agora?
* solução nativa não resolve?
* alinha com decisões do projeto?
* precisa de ADR?

Evitar dependências grandes para problemas pequenos.

## Performance

* dados buscados no servidor;
* JS client minimizado;
* cache/revalidação explícita quando necessário;
* sem fetch aninhado excessivo.

Estratégias específicas decididas durante implementação da integração Notion.

## SEO e metadados

Páginas públicas devem definir `title`, `description`, Open Graph e imagem social quando houver. Metadados usam modelos internos, não dados brutos da API.

## Acessibilidade

* HTML semântico;
* hierarquia correta de headings;
* contraste adequado;
* foco visível;
* texto alternativo em imagens relevantes;
* navegação por teclado em componentes interativos.

## Fora de escopo arquitetural

Não implementar sem decisão explícita: autenticação, painel admin, banco de dados próprio, backend dedicado, estado global, comentários, área de membros, pagamentos, busca semântica, embeddings, chat com IA, múltiplos CMS.

## Padrões de criação

### Nova página

1. Confirmar rota em [`product.md`](product.md).
2. Verificar modelo em [`content-model.md`](content-model.md).
3. Criar ou usar feature correspondente.
4. Buscar dados via função server-side.
5. Renderizar com componentes de domínio/shared.
6. Definir metadata básica.
7. Evitar Client Component sem necessidade.

### Nova feature

1. Criar `src/features/<feature>`.
2. Adicionar `model/` se houver tipos ou regras.
3. Adicionar `api/` se houver fetching.
4. Adicionar `ui/` para componentes específicos.
5. Adicionar `lib/` apenas se houver helper local.
6. Não criar pastas vazias.

## Documentação como parte da arquitetura

`docs/` é parte estrutural do projeto. Mudanças relevantes refletem na documentação. Divergência entre código e docs é resolvida explicitamente — em decisões de produto/arquitetura, a documentação pode representar a intenção correta.
