# PLAN-002 — Refactor da Implementação Moderna do Notion

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Refatorar `src/lib/notion/` para garantir organização por domínio, cobertura de tipos consistente e uma API interna limpa que suporte todas as páginas planejadas para o jardim digital.

---

## Contexto

Após a migração do PLAN-001, a lib moderna será a única fonte de dados do projeto. Antes de criar novas páginas (Jardim, Galeria, Cursos), é importante garantir que a lib esteja bem estruturada — domínios isolados, tipos reutilizáveis e queries consistentes.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/lib/notion/` | modificar | Reorganização geral por domínio |
| `src/lib/notion/domains/` | criar | Pasta de domínios se ainda não existir |
| `src/lib/notion/domains/posts/` | criar/ajustar | Types e queries de posts |
| `src/lib/notion/domains/projetos/` | criar/ajustar | Types e queries de projetos |
| `src/lib/notion/domains/videos/` | criar/ajustar | Types e queries de vídeos |
| `src/lib/notion/types.ts` | modificar | Consolidar tipos compartilhados |

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/lib/notion/features/blocks/index.ts` | modificar | Paralelizar fetches com `Promise.all` no `deep: true` |
| `src/lib/notion/features/blocks/types.ts` | modificar | Adicionar `AnyNotionBlockWithChildren` e type guard `hasChildren` |
| `src/lib/notion/features/databases/index.ts` | modificar | Remover `as any` no retorno do SDK |
| `src/lib/notion/features/pages/index.ts` | modificar | Remover `as any` no retorno do SDK |
| `src/lib/notion/helpers/utils.ts` | modificar | Tornar `generateNotionPageID` robusto para slugs sem hífen |
| `src/lib/notion/domains/` | criar | Pasta de domínios se não existir |
| `src/lib/notion/domains/posts/` | criar/ajustar | Types e queries específicos de posts |
| `src/lib/notion/domains/videos/` | criar/ajustar | Types e queries de vídeos (pós PLAN-001) |
| `src/lib/notion/domains/projetos/` | criar/ajustar | Types e queries de projetos (pós PLAN-001) |

## Critério de Conclusão

### Correções de qualidade (independentes do PLAN-001)
- [ ] Paralelizar fetches em `getAllBlockChildren` com `deep: true` usando `Promise.all`
- [ ] Criar `AnyNotionBlockWithChildren` em `blocks/types.ts` e type guard `hasChildren`
- [ ] Corrigir `generateNotionPageID` para extrair ID por tamanho fixo (32 chars hex) em vez de `lastIndexOf`
- [ ] Remover `as any` em `databases/index.ts`, `pages/index.ts` e `blocks/index.ts`

### Organização por domínio (pós PLAN-001)
- [ ] Lib organizada por domínio em `src/lib/notion/domains/`
- [ ] Cada domínio tem seu próprio arquivo de types usando `EnsureNotionPropertiesSchema`
- [ ] `getDatabaseItems`, `getPageById` e `getAllBlockChildren` com tipos corretos em todos os usos
- [ ] Nenhum `any` ou cast inseguro nas queries do Notion
- [ ] `pnpm build` sem erros de TypeScript
- [ ] `pnpm lint` sem warnings

---

## Fora do Escopo

- Criação de domínios para páginas ainda não existentes (Jardim, Galeria, Cursos) — isso ficará em cada plano respectivo
- Alterações visuais ou de comportamento das páginas

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-001 deve estar concluído antes |
| Risco | Refactor de tipos pode quebrar inferências em páginas existentes |

---

## Notas de Implementação

- Usar `EnsureNotionPropertiesSchema` como padrão para todos os tipos de propriedades
- Avaliar se faz sentido criar um helper para propriedades comuns (ex: `Status`, `Title`) reutilizadas entre domínios

### Fetches sequenciais em `getAllBlockChildren` (`deep: true`)

```ts
// atual — sequencial, 1 request por vez
for (const parent of withChildren) {
  const children = await getAllBlockChildren(parent.id, { deep: true })
  ;(parent as any).__children = children
}

// corrigido
await Promise.all(
  withChildren.map(async parent => {
    ;(parent as any).__children = await getAllBlockChildren(parent.id, { deep: true })
  })
)
```

### `__children` sem tipo (`blocks/types.ts`)

```ts
// adicionar em blocks/types.ts
export type AnyNotionBlockWithChildren = AnyNotionBlock & {
  __children?: AnyNotionBlock[]
}

export function hasChildren(block: AnyNotionBlock): block is AnyNotionBlockWithChildren {
  return "__children" in block && Array.isArray((block as any).__children)
}
```

### `generateNotionPageID` frágil (`helpers/utils.ts`)

```ts
// atual — lastIndexOf quebra se o título não tiver hífen
export const generateNotionPageID = (slug: string) => {
  const start = slug.lastIndexOf("-") + 1
  return slug.slice(start, slug.length)
}

// corrigido — extrai os últimos 32 chars hexadecimais (tamanho fixo do ID Notion)
const UUID_REGEX = /[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$/i
export const generateNotionPageID = (slug: string) => {
  const match = slug.replace(/-/g, "").match(UUID_REGEX)
  return match?.[0] ?? slug
}
```

### `as any` em três pontos distintos

| Arquivo | Linha problemática |
|---------|-------------------|
| `features/databases/index.ts` | `const res = await notion.databases.query({ ... }) as any` |
| `features/pages/index.ts` | `const page = await notion.pages.retrieve({ ... }) as any` |
| `features/blocks/index.ts` | `res.results as unknown as T[]` |

O SDK retorna `PageObjectResponse | PartialPageObjectResponse`. O cast para `any` descarta essa distinção. Tipar o retorno do SDK e fazer a conversão apenas onde o shape realmente diverge. Baixa prioridade — fazer na etapa final do checklist.

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
