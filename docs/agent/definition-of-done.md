# Definition of Done

Este documento define critérios mínimos para considerar uma tarefa concluída no `site-vitorsampaio`.

## Regra geral

Uma tarefa só está concluída quando:

* atende ao pedido explícito;
* respeita a documentação existente;
* não amplia escopo sem necessidade;
* não introduz decisão estrutural sem registro;
* deixa pendências relevantes explícitas.

## Critérios para qualquer tarefa

Antes de finalizar, verificar:

* objetivo atendido;
* arquivos afetados coerentes com a tarefa;
* nenhuma mudança fora de escopo;
* nenhuma dependência adicionada sem justificativa;
* nenhuma decisão documentada foi violada;
* pendências conhecidas foram registradas.

## Documentação

Uma tarefa de documentação está concluída quando:

* o arquivo solicitado foi criado ou atualizado;
* o conteúdo está em português;
* o texto é objetivo e normativo;
* não há tom promocional;
* não há explicação óbvia em excesso;
* o documento tem função clara;
* não duplica conteúdo desnecessariamente;
* links ou referências internas estão coerentes, quando usados.

## Arquitetura

Uma tarefa arquitetural está concluída quando:

* respeita a estrutura definida em `docs/architecture/overview.md`;
* mantém separação entre `app`, `features`, `integrations`, `shared` e `content`;
* não cria abstrações prematuras;
* não cria pastas vazias sem uso real;
* não introduz backend, auth, store global ou CMS novo sem decisão explícita;
* ADR foi criado ou atualizado se a decisão for durável.

## Frontend

Uma tarefa frontend está concluída quando:

* pages continuam Server Components por padrão;
* `"use client"` só aparece quando há necessidade real;
* componentes estão no local correto;
* props são explícitas;
* UI não recebe objetos brutos do Notion;
* componentes compartilhados não dependem de feature específica;
* componentes de feature não são promovidos para `shared` cedo demais.

## Notion CMS

Uma tarefa envolvendo Notion está concluída quando:

* acesso ao Notion acontece apenas no servidor;
* tokens não são expostos ao client;
* queries ficam centralizadas na integração;
* dados são filtrados para publicação pública;
* dados brutos são convertidos por mapper;
* UI recebe modelo interno;
* slug, datas, tags e imagens são normalizados quando aplicável;
* falhas previsíveis têm tratamento ou fallback.

## Modelos de conteúdo

Uma tarefa envolvendo modelos está concluída quando:

* o modelo respeita `docs/product/content-model.md`;
* publicação e maturidade não são misturadas;
* o tipo de conteúdo está claro;
* campos opcionais são tratados como opcionais;
* modelos internos não espelham a API bruta do Notion sem necessidade;
* alterações relevantes foram refletidas na documentação.

## Estilos

Uma tarefa de estilo está concluída quando:

* usa CSS Modules;
* estilos globais não foram usados para componentes específicos;
* tokens globais foram usados quando existirem;
* classes são semânticas;
* variantes usam `data-*` quando apropriado;
* foco visível foi preservado em elementos interativos;
* layout não quebra sem imagem ou dado opcional relevante;
* Tailwind/Chakra não foram introduzidos.

## Acessibilidade

Uma tarefa de UI está concluída quando, quando aplicável:

* HTML semântico foi usado;
* hierarquia de headings faz sentido;
* elementos interativos são acessíveis por teclado;
* foco visível existe;
* imagens relevantes têm texto alternativo;
* estado visual não depende apenas de cor;
* animações respeitam `prefers-reduced-motion`, se existirem.

## SEO e metadados

Uma tarefa de página pública está concluída quando, quando aplicável:

* `title` foi definido;
* `description` foi definida;
* metadados usam modelo interno ou fallback seguro;
* slug público é estável;
* página não depende de dado privado;
* estado não encontrado foi considerado para rotas dinâmicas.

## Validação

Antes de finalizar implementação, verificar comandos disponíveis.

Possíveis comandos:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

Para tarefas apenas documentais, validações possíveis:

```bash
tree docs
find docs -maxdepth 3 -type f | sort
```

Não declarar comandos que não foram executados.

## Relato final

A resposta final deve informar:

* resumo do que foi feito;
* arquivos criados ou alterados;
* validações executadas;
* pendências, se existirem.

Formato sugerido:

```txt
Feito:
- ...

Arquivos:
- ...

Validação:
- ...

Pendências:
- ...
```

## Pendências aceitáveis

Uma tarefa pode ser concluída com pendências quando elas forem:

* fora do escopo atual;
* dependentes de decisão futura;
* dependentes de dados ainda não fornecidos;
* registradas claramente.

Pendências não aceitáveis:

* erro de build ignorado;
* TypeScript quebrado sem aviso;
* token exposto;
* componente usando dado bruto indevidamente;
* decisão estrutural não registrada;
* documentação contraditória sem aviso.

## Critério final

Uma tarefa está pronta quando outra pessoa ou agente consegue continuar a partir do estado entregue sem precisar adivinhar:

* o que foi feito;
* por que foi feito;
* onde foi alterado;
* o que foi validado;
* o que ainda falta.
