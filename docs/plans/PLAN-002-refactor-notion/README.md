# PLAN-002 — Refactor da Implementação Moderna do Notion

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Fortalecer `src/lib/notion/` para virar a base única de integração com o Notion: menos casts frágeis, melhor performance em blocos aninhados, extração de ID de página mais robusta e organização por domínios depois da migração do legacy.

## Contexto

O PLAN-001 remove a dependência prática do sistema legacy. Depois disso, a lib moderna precisa suportar posts, vídeos, projetos e novas frentes como jardim digital e cursos sem acumular lógica solta dentro das pages.

Algumas melhorias são independentes e podem acontecer antes do fim do PLAN-001. A organização por domínio depende de vídeos e projetos já estarem migrados.

## Escopo

- paralelizar o trecho `deep: true` de `getAllBlockChildren`;
- tipar `__children` de forma explícita;
- tornar `generateNotionPageID` robusto para slugs sem hífen;
- reduzir casts inseguros nos wrappers do SDK quando isso não piorar a legibilidade;
- criar `src/lib/notion/domains/` e mover queries/types de posts, vídeos e projetos após PLAN-001.

## Fora do escopo

- criar domínios de jardim ou cursos — cada frente define seu próprio schema;
- mudar visual ou comportamento das páginas;
- reescrever o renderer de blocos do Notion;
- perseguir `any` interno da DSL de filtros se isso exigir refactor maior que o plano.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/lib/notion/features/blocks/index.ts` | modificar | paralelizar recursão e usar tipo de bloco com filhos |
| `src/lib/notion/features/blocks/types.ts` | modificar | adicionar tipo/guard para `__children` |
| `src/lib/notion/helpers/utils.ts` | modificar | corrigir extração de ID Notion em slug |
| `src/lib/notion/features/databases/index.ts` | revisar | reduzir casts no wrapper de database |
| `src/lib/notion/features/pages/index.ts` | revisar | reduzir casts no wrapper de page |
| `src/lib/notion/domains/` | criar | organizar queries e types por domínio |
| `src/types/notion.type.ts` | revisar | decidir o que fica global e o que migra para domínios |

## Backlog

- [ ] Paralelizar e tipar `getAllBlockChildren` com `deep: true`.
- [ ] Corrigir `generateNotionPageID` para extrair ID por regex/tamanho fixo.
- [ ] Revisar casts nos wrappers de database/page sem criar abstração maior que o problema.
- [ ] Criar domínios de posts, vídeos e projetos após PLAN-001.
- [ ] Validar build, rotas de posts e rotas migradas do Notion.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Dependência parcial | A etapa de domínios depende do PLAN-001 concluído. |
| Risco | Tipagem do SDK Notion mistura `PageObjectResponse` e respostas parciais; remover casts sem cuidado pode piorar a API local. |
| Risco | Paralelizar blocos aninhados aumenta requests simultâneos ao Notion; observar limites da API. |

## Notas de implementação

### Fetches sequenciais em `getAllBlockChildren`

O trecho atual faz um request por vez quando `deep: true`. A direção é trocar o loop sequencial por `Promise.all` mantendo o mesmo shape de retorno.

```ts
await Promise.all(
  withChildren.map(async parent => {
    parent.__children = await getAllBlockChildren(parent.id, { deep: true })
  }),
)
```

### Tipo para `__children`

O plano deve preferir um tipo explícito em `blocks/types.ts`:

```ts
export type AnyNotionBlockWithChildren = AnyNotionBlock & {
  __children?: AnyNotionBlock[]
}
```

### `generateNotionPageID`

A função atual depende do último hífen do slug. O caminho mais seguro é extrair os últimos 32 caracteres hexadecimais, aceitando slugs com ou sem hífens.

```ts
const NOTION_ID_REGEX = /[0-9a-f]{32}$/i
```

## Conhecimentos consolidados

- O refactor por domínio é útil, mas só fica limpo depois que vídeos e projetos saírem do legacy.
- Nem todo `as any` deve virar task isolada; a unidade útil é o contrato do wrapper.
- `getAllBlockChildren` é ponto sensível porque afeta diretamente a página de leitura.

## Perguntas para evoluir este plano

- Os tipos de `PostProps`, `VideoProps` e `ProjectProps` devem morar em `src/types/notion.type.ts` ou dentro de cada domínio?
- O domínio deve exportar apenas queries prontas ou também helpers de parsing para componentes?
- Vale criar teste unitário para `generateNotionPageID` antes de mexer no comportamento?

## Referências

- [`docs/patterns/services.md`](../../patterns/services.md)
- [`docs/patterns/tipagem.md`](../../patterns/tipagem.md)
- [`docs/product/notion/framework.md`](../../product/notion/framework.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para separar melhorias independentes da reorganização por domínio pós-PLAN-001. |
