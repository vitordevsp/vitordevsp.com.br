# Documentacao

## Objetivo

Definir como a documentacao tecnica do projeto deve ser escrita, distribuida e mantida, incluindo `JSDoc`, docs vivos por dominio e regras de navegacao no codigo.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar ou revisar documentacao tecnica;
- decidir entre `JSDoc`, docs vivos do dominio e documentacao transversal;
- organizar comentarios de navegacao como `// MARK:` e `#region`;
- padronizar a estrutura de um novo documento;
- alinhar documentacao para consumo humano e por agente.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- padrao geral de escrita dos patterns;
- papel de `JSDoc`;
- regras de navegacao no codigo;
- relacao entre `docs/` da raiz e `docs/` dos dominios.

Este arquivo nao cobre:

- regras completas de arquitetura por camada;
- padrao detalhado de stores, services ou tipagem;
- comportamento funcional de cada dominio.

Para esses temas, consultar:

- [`README.md`](./README.md)
- [`stores.md`](./stores.md)
- [`services.md`](./services.md)
- [`tipagem.md`](./tipagem.md)
- [`specs.md`](./specs.md)

## Regras principais

- Documentacao curta quando o contexto for simples.
- Documentacao detalhada quando fluxo, contrato ou contexto forem complexos.
- Cada tema deve ter uma fonte da verdade clara.
- Repeticao pequena e aceitavel para navegacao, mas duplicacao estrutural deve ser evitada.
- Toda mudanca funcional, de fluxo, contrato ou decisao tecnica relevante deve atualizar a documentacao correspondente no mesmo ciclo.
- Ao criar ou alterar `component`, `page`, `store`, `service` ou `types`, fazer uma passada final neste arquivo para validar cobertura documental e navegacao no codigo.

## Estrutura recomendada

Padrao editorial dos arquivos em `docs/patterns`:

1. objetivo
2. quando consultar este arquivo
3. fonte da verdade e limites do documento
4. regras principais
5. estrutura recomendada
6. checklist de criacao ou revisao
7. relacao com outros patterns

## Navegacao no codigo

Arquivos `.ts` e `.tsx` com multiplas secoes devem usar comentarios estruturais para facilitar leitura e manutencao.

Use `// MARK:` para destacar blocos no minimap lateral do VSCode:

```ts
// MARK: Constantes

// MARK: Pure helpers

// MARK: Store

// MARK: queryActions
```

Esses comentarios aparecem como headings no minimap e ajudam a localizar secoes rapidamente.

Use `#region` quando o arquivo concentrar muitos tipos relacionados ou blocos grandes que precisam de agrupamento semantico:

```ts
#region Session
export interface Session {
  files: SessionFile[];
}

export interface SessionFile {
  status: SessionFileStatus;
}

export type SessionFileStatus = "idle" | "processing";
#endregion
```

Regra pratica:

- `// MARK:` para secoes macro de arquivos `.ts` e `.tsx`
- `#region` para agrupamentos internos, principalmente em arquivos grandes de tipos
- evitar comentarios decorativos ou marcadores demais sem ganho real de navegacao

## Níveis de documentação do projeto

1. `// MARK:` em arquivos de código
   - destacam seções no minimap do VSCode
2. `JSDoc`
   - explica a unidade local (função, tipo, componente)
3. `docs/` do domínio
   - explica fluxo, contrato e comportamento do domínio
4. `docs/` da raiz
   - organiza patterns, navegação e contexto transversal

### Quando usar `JSDoc`

Usar `JSDoc` em:

- services
- stores
- helpers importantes
- componentes de fluxo
- funcoes com efeito colateral, persistencia ou transformacao nao obvia

Nao usar `JSDoc` para descrever o obvio.

## Checklist de criacao ou revisao

- existe uma fonte da verdade clara para o tema?
- o documento esta no nivel certo entre `JSDoc`, docs vivos e patterns?
- [`specs.md`](./specs.md) foi consultado quando a leitura em linguagem natural agrega clareza?
- o documento evita repetir o que ja esta definido em outro lugar?
- a documentacao foi revisada no mesmo ciclo da mudanca funcional?
- houve uma revisao final deste arquivo ao fechar a mudanca em `component`, `page`, `store`, `service` ou `types`?

## Relação com outros patterns

- [`README.md`](./README.md) define como criar, consolidar e manter os próprios arquivos de `docs/patterns`.
- [`specs.md`](./specs.md) define quando criar e como estruturar `specs.md`.
- [`componentes.md`](./componentes.md), [`pages.md`](./pages.md), [`stores.md`](./stores.md) e [`services.md`](./services.md) definem variacoes praticas de documentacao.
- [`tipagem.md`](./tipagem.md) continua sendo a fonte oficial dos contratos técnicos.
