# ADR-002 — Usar Notion como CMS editorial

## Status

Aceita.

## Contexto

O `site-vitorsampaio` precisa de uma fonte editorial simples para textos, projetos, vídeos, referências e outros conteúdos.

O autor já usa Notion como ambiente de escrita, organização e manutenção de dados. A maior parte dos conteúdos previstos para o site já existe ou está planejada nesse ambiente.

Criar um CMS próprio no início aumentaria complexidade sem necessidade real.

## Decisão

O Notion será usado como CMS editorial do projeto.

A aplicação deve consumir dados do Notion no servidor, normalizar esses dados em modelos internos e renderizar a UI a partir desses modelos.

Fluxo esperado:

```txt
Notion
  → integração server-only
  → mapper
  → modelo interno
  → UI
```

## Escopo da decisão

O Notion será usado para armazenar e editar:

* textos do Jardim;
* projetos;
* vídeos;
* livros;
* referências culturais;
* viagens;
* cursos;
* metadados editoriais.

## Regras derivadas

* A integração com Notion deve ser server-only.
* Tokens não podem ser expostos ao client.
* A UI não deve depender de objetos brutos da API do Notion.
* Cada database relevante deve ter mapeamento para modelo interno.
* Conteúdos públicos devem ser filtrados por status de publicação.
* Slugs devem ser estáveis e preferencialmente definidos no Notion.
* O site não deve tentar copiar visualmente o Notion.

## Consequências

### Positivas

* Reduz necessidade de CMS próprio.
* Aproveita fluxo editorial já existente.
* Permite publicação e edição sem alterar código.
* Mantém autonomia editorial.
* Facilita evolução inicial do site.

### Negativas

* O site depende da disponibilidade e API do Notion.
* Mudanças nas databases podem exigir ajustes nos mappers.
* Performance e cache precisam ser tratados com cuidado.
* Renderização de blocos pode exigir suporte incremental.
* O Notion não deve ser tratado como modelo interno da aplicação.

## Limites

O Notion é fonte editorial, não arquitetura de UI.

Não deve vazar para:

* componentes compartilhados;
* props públicas da UI;
* regras de layout;
* nomes de classes;
* decisões visuais;
* contratos internos de domínio.

## Alternativas consideradas

### CMS próprio

Rejeitado no MVP por adicionar backend, banco de dados, autenticação e painel administrativo antes da necessidade real.

### Markdown local

Rejeitado como fonte principal porque o conteúdo já vive no Notion e o objetivo é manter o fluxo editorial atual.

### Headless CMS dedicado

Rejeitado no início por exigir adoção de nova ferramenta, migração editorial e possível custo/complexidade adicional.

## Documentos relacionados

* `docs/architecture/notion-cms.md`
* `docs/product/content-model.md`
* `docs/reference/notion-databases.md`

## Critério de sucesso

Esta decisão será bem-sucedida se:

* conteúdos forem editáveis no Notion;
* o site renderizar apenas dados públicos;
* tokens permanecerem seguros;
* UI consumir modelos internos;
* mudanças no Notion ficarem concentradas na camada de integração e mappers.
