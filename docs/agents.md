# Guia para agentes

Instruções, workflow e definition of done para agentes de IA que trabalham no `site-vitorsampaio`.

## Regra principal

Antes de implementar, leia a documentação relevante em `docs/`. Não assuma decisões estruturais quando a documentação ainda não define o caminho.

Enquanto a base documental estiver em construção, priorize documentação. Não implemente aplicação, estrutura em `src/`, dependências ou configuração de build sem pedido explícito.

## Leitura por tipo de tarefa

| Tarefa                              | Ler                                                                |
| ----------------------------------- | ------------------------------------------------------------------ |
| Qualquer tarefa                     | [`README.md`](README.md)                                           |
| Produto, escopo, experiência        | [`product.md`](product.md)                                         |
| Fases e planos de evolução          | [`.claude/plans/`](../.claude/plans/)                              |
| Modelos de conteúdo                 | [`content-model.md`](content-model.md)                             |
| Arquitetura, código, organização    | [`architecture.md`](architecture.md)                               |
| Estilos                             | [`styling.md`](styling.md)                                         |
| Integração com Notion               | [`notion.md`](notion.md), [`content-model.md`](content-model.md)   |
| Decisões                            | [`decisions/`](decisions/)                                         |

## Workflow

```txt
1. Entender a tarefa
2. Ler documentação relevante
3. Identificar arquivos afetados
4. Planejar a mudança
5. Executar a menor alteração suficiente
6. Validar
7. Atualizar documentação, se necessário
8. Reportar resultado
```

### 1. Entender

* identificar objetivo real;
* separar pedido explícito de inferência;
* identificar riscos de escopo;
* não ampliar a tarefa sem necessidade.

### 2. Ler

Sempre começar pelo `README.md`. Depois, docs da área afetada (tabela acima).

### 3. Identificar arquivos

Antes de editar, listar arquivos que serão criados, alterados, consultados ou deixados intactos. Evitar buscas massivas sem necessidade.

### 4. Planejar

Tarefa simples: plano curto. Tarefa maior: objetivo, arquivos afetados, ordem de execução, validações previstas, riscos.

### 5. Executar

* mudanças pequenas;
* preservar conteúdo existente;
* não reescrever arquivos inteiros sem necessidade;
* não misturar refatoração com feature sem pedido;
* não instalar dependências sem justificativa;
* não criar estrutura vazia;
* não implementar escopo futuro.

### 6. Validar

Verificar comandos disponíveis antes de rodar:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

Para tarefas só de documentação:

```bash
find docs -maxdepth 2 -type f | sort
```

Não declarar validação não executada.

### 7. Atualizar documentação

Atualizar quando a mudança afetar: decisão técnica, estrutura de pastas, modelo de conteúdo, fluxo de dados, integração externa, padrão de estilos, regra de implementação ou comportamento relevante de produto. Não atualizar por mudança trivial.

### 8. Reportar

A resposta final inclui:

* resumo do que foi feito;
* arquivos criados ou alterados;
* validações executadas;
* pendências, se existirem.

## Fluxos específicos

### Documentação

1. Confirmar arquivo alvo.
2. Tom objetivo e normativo.
3. Sem conteúdo promocional.
4. Não repetir o que outros docs já cobrem.
5. Linkar documentos relacionados.
6. Registrar decisões, não intenção genérica.

### Código

1. Ler docs relevantes.
2. Verificar estrutura atual.
3. Identificar domínio afetado.
4. Criar ou alterar feature correspondente.
5. Usar integração server-side quando envolver Notion.
6. Retornar modelos internos para UI.
7. CSS Modules para estilos.
8. Validar TypeScript/build/lint quando disponíveis.

### Integração com Notion

1. Ler [`notion.md`](notion.md).
2. Identificar database e modelo interno em [`content-model.md`](content-model.md).
3. Criar query server-side.
4. Criar mapper.
5. Filtrar conteúdo público.
6. Normalizar slug, datas, tags e imagens.
7. Expor apenas modelo interno.

### Componentes

1. Decidir entre feature e shared.
2. Criar no local correto.
3. CSS Module co-localizado.
4. Sem dependência de dados brutos do Notion.
5. Props explícitas.
6. Estados básicos quando necessário.
7. Sem `"use client"` desnecessário.

### Páginas

1. Confirmar rota em [`product.md`](product.md).
2. Identificar feature relacionada.
3. Buscar dados no servidor.
4. Compor UI com componentes de feature/shared.
5. Definir metadata.
6. Manter como Server Component salvo necessidade real.

### Estilos

Ver [`styling.md`](styling.md). Resumo:

1. CSS Modules.
2. Tokens globais quando existirem.
3. Sem estilos globais para componentes.
4. `data-*` para variantes.
5. Foco visível preservado.

## Definition of done

Tarefa concluída quando atende ao pedido explícito, respeita a documentação existente, não amplia escopo sem necessidade, não introduz decisão estrutural sem registro e deixa pendências relevantes explícitas.

### Checklist geral

* objetivo atendido;
* arquivos afetados coerentes;
* nenhuma mudança fora de escopo;
* nenhuma dependência adicionada sem justificativa;
* nenhuma decisão documentada violada;
* pendências conhecidas registradas.

### Documentação

* arquivo criado/atualizado;
* português;
* objetivo e normativo;
* sem tom promocional;
* sem explicação óbvia em excesso;
* função clara;
* sem duplicação desnecessária;
* links coerentes.

### Frontend

* pages continuam Server Components;
* `"use client"` só com necessidade real;
* componentes no local correto;
* props explícitas;
* UI não recebe objetos brutos do Notion;
* shared não depende de feature específica;
* feature não promovida para shared cedo demais.

### Notion

* acesso server-only;
* tokens protegidos;
* queries centralizadas;
* dados filtrados por publicação;
* dados normalizados por mapper;
* UI recebe modelo interno;
* slug/datas/tags/imagens normalizados;
* falhas previsíveis tratadas.

### Modelos de conteúdo

* modelo respeita [`content-model.md`](content-model.md);
* publicação ≠ maturidade;
* tipo de conteúdo claro;
* opcionais tratados como opcionais;
* mudança relevante refletida na documentação.

### Estilos

* CSS Modules;
* sem CSS global para componente específico;
* tokens globais usados;
* classes semânticas;
* `data-*` para variantes;
* foco visível;
* layout não quebra sem dado opcional;
* sem Tailwind/Chakra introduzido.

### Acessibilidade (quando aplicável)

* HTML semântico;
* hierarquia de headings correta;
* navegação por teclado;
* foco visível;
* texto alternativo em imagens relevantes;
* estado visual não depende só de cor;
* animações respeitam `prefers-reduced-motion`.

### SEO (página pública, quando aplicável)

* `title` e `description`;
* metadados usam modelo interno;
* slug público estável;
* sem dependência de dado privado;
* not-found tratado para rotas dinâmicas.

## Quando parar e pedir definição

Antes de implementar, parar se a tarefa exigir decisão sobre:

* nova dependência estrutural;
* mudança de arquitetura;
* introdução de backend, autenticação ou estado global;
* mudança de CMS;
* alteração grande no sitemap;
* regra de publicação privada/pública;
* acesso a dados sensíveis.

## Quando criar ADR

Criar ou atualizar ADR para decisões duráveis sobre stack, arquitetura, CMS, padrão de renderização, estilo, dependências estruturais, modelo de dados ou infraestrutura.

## O que evitar

* executar antes de ler contexto;
* mudanças amplas sem plano;
* reescrever documentação inteira sem necessidade;
* misturar várias tarefas em uma entrega;
* criar abstrações não solicitadas;
* instalar dependências por conveniência;
* implementar roadmap futuro antes da base;
* declarar validações não executadas;
* recriar estruturas legacy do projeto apagado.

## Pendências aceitáveis vs inaceitáveis

Aceitáveis quando registradas claramente:

* fora do escopo atual;
* dependentes de decisão futura;
* dependentes de dados ainda não fornecidos.

Inaceitáveis:

* erro de build ignorado;
* TypeScript quebrado sem aviso;
* token exposto;
* componente usando dado bruto indevidamente;
* decisão estrutural não registrada;
* documentação contraditória sem aviso.

## Critério final

Tarefa pronta quando outra pessoa ou agente consegue continuar a partir do estado entregue sem precisar adivinhar o que foi feito, por que, onde foi alterado, o que foi validado e o que ainda falta.
