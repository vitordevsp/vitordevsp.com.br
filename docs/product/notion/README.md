# Notion do projeto

## Objetivo

Esta pasta documenta como o Notion e usado como CMS deste projeto.

O objetivo de `docs/product/notion/` e explicar:

- como os bancos de dados do Notion estao organizados;
- quais data sources existem e quais propriedades eles expõem;
- como o conteudo flui do Notion para as pages do site;
- convencoes e aprendizados sobre essa integracao.

## O que esta pasta cobre

`docs/product/notion/` deve responder principalmente:

- qual o papel de cada banco de dados (Posts, Videos, Projetos);
- quais propriedades cada banco possui e como elas sao usadas;
- como o sistema moderno e o legacy se relacionam com o Notion;
- aprendizados e convencoes especificas desta integracao.

Ela nao substitui o proprio workspace do Notion como fonte viva de conteudo.

## Estrutura da pasta

### [framework.md](./framework.md)

Explica o papel do Notion neste projeto — como CMS e fonte de conteudo, nao como ferramenta de gestao de trabalho.

### [data-sources.md](./data-sources.md)

Documenta os data sources (bancos de dados) usados pelo site:

- **Posts** — artigos tecnicos do blog
- **Videos** — videos publicados no YouTube
- **Projetos** — portfólio de projetos

### [MEMORY.md](./MEMORY.md)

Memoria especifica da camada `docs/product/notion/`, usada para registrar convencoes, aprendizados e decisoes sobre a integracao Notion deste projeto.

## Relação com o restante da documentacao

- [`docs/patterns/services.md`](../patterns/services.md) define o padrao de codigo para consumir o Notion.
- [`docs/patterns/tipagem.md`](../patterns/tipagem.md) define como criar schemas de banco tipados.
- `docs/plans/` organiza frentes de trabalho do repositorio, incluindo a migracao do sistema legacy.
- `docs/product/notion/` explica os dados e a estrutura do CMS.

Em resumo:

- `patterns/services.md` diz como escrever o codigo de integracao;
- `notion/` diz o que os bancos de dados contem.

## Onde começar

1. este `README.md`
2. [framework.md](./framework.md)
3. [data-sources.md](./data-sources.md)
4. [MEMORY.md](./MEMORY.md), quando houver aprendizados acumulados relevantes

## Regra importante

Esta pasta deve documentar a estrutura do Notion como CMS deste projeto. Nao deve se tornar replica do workspace nem registrar conteudo editorial (textos dos posts, projetos, etc).
