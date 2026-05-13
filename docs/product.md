# Produto

Visão, posicionamento, princípios de decisão e arquitetura da informação do `site-vitorsampaio`.

## Norte

> Espaço público para organizar, publicar e conectar ideias, projetos e aprendizados em evolução.

Site pessoal de Vitor Sampaio. Funciona como presença pública autoral, portfólio, blog técnico e jardim digital. O Notion é o CMS editorial; o site transforma esses dados em experiência pública navegável.

## Posicionamento

O site **é**:

* jardim digital público;
* interface autoral para conteúdos do Notion;
* base de portfólio e reputação técnica;
* espaço de publicação incremental;
* camada pública de contexto sobre projetos, ideias e aprendizados.

O site **não é** (no MVP):

* currículo online estático;
* landing page pessoal;
* blog cronológico tradicional;
* lista de projetos;
* clone visual do Notion;
* rede social, CMS próprio, marketplace, plataforma de cursos, sistema de comentários.

## Público-alvo

* contatos profissionais, recrutadores e parceiros;
* desenvolvedores e pessoas técnicas;
* leitores interessados em IA, frontend, produto, educação digital, design de sistemas;
* agentes de IA que precisem entender o contexto público do autor.

## Jardim digital

Conceito central do produto. Ideias aparecem em estágios diferentes (notas, insights, ensaios, padrões, marcos) e podem evoluir com o tempo. Maturidade do conteúdo deve ser explícita para o usuário — um texto incompleto não precisa parecer acabado.

Modelo editorial e tipos de maturidade ficam em [`content-model.md`](content-model.md).

## Princípios de decisão

Critérios para resolver dúvidas de produto. Quando houver dois caminhos, escolher o que respeita melhor estes princípios.

1. **Jardim, não blog.** Publicação incremental. Navegação não depende só de cronologia.
2. **Clareza antes de volume.** Cada página tem função clara. Existir no Notion não obriga aparecer com mesmo peso na UI.
3. **Conteúdo vivo parece vivo.** Estágios de maturidade visíveis; metadados editoriais contextuais.
4. **Notion é fonte editorial, não arquitetura de UI.** Ver [`architecture.md`](architecture.md) e [`notion.md`](notion.md).
5. **Server-first.** Ver [ADR-004](decisions/ADR-004-rsc-first-frontend.md).
6. **Simplicidade evolutiva.** Versão inicial simples, preparada para crescer. Sem antecipar autenticação, comentários, busca semântica, painel admin ou backend.
7. **Exploração além da cronologia.** Tags, categorias, tipos, maturidade, links manuais. Backlinks/grafo são evolução futura.
8. **Útil para o autor.** Fluxo editorial compatível com uso real do Notion.
9. **Legível por humanos e agentes.** Decisões explícitas, arquitetura previsível, ambiguidade reduzida.
10. **Design apoia leitura e identidade.** Legibilidade primeiro; espaço para identidade autoral.
11. **Portfólio conta contexto.** Projetos comunicam problema, papel, decisões, aprendizados — não só stack.
12. **Sitemap completo não implica implementação pesada.** Documentar tudo desde o início; implementar por fases.
13. **Decisões explícitas.** ADRs para mudanças estruturais. Ver [`decisions/`](decisions/).
14. **Conteúdo forma rede.** Conexões manuais no início; automáticas só com volume real.
15. **Manutenção simples é requisito de produto.** Sustentável para uma pessoa manter.

## Sitemap

```txt
/                       Home
/jardim                 Jardim
/jardim/[slug]          Detalhe de conteúdo textual
/projetos               Projetos
/projetos/[slug]        Detalhe de projeto
/galeria                Galeria
/galeria/videos         Vídeos
/galeria/livros         Livros
/galeria/cultura        Cultura
/galeria/viagens        Viagens
/cursos                 Cursos
/cursos/[slug]          Detalhe de curso
/sobre                  Sobre
```

## Áreas

| Área               | Rota               | Prioridade | Função                                                      |
| ------------------ | ------------------ | ---------: | ----------------------------------------------------------- |
| Home               | `/`                |       Alta | Composição editorial; porta de entrada para outras áreas.   |
| Jardim             | `/jardim`          |       Alta | Área central para conteúdos textuais autorais.              |
| Detalhe de texto   | `/jardim/[slug]`   |       Alta | Renderiza conteúdo Notion com metadados editoriais.         |
| Projetos           | `/projetos`        |       Alta | Portfólio; cada projeto comunica contexto, não só stack.    |
| Detalhe de projeto | `/projetos/[slug]` |       Alta | Descrição rica (contexto, decisões, stack, links).          |
| Sobre              | `/sobre`           |       Alta | Trajetória, atuação, interesses, contato.                   |
| Galeria            | `/galeria`         |      Média | Hub de conteúdos não textuais e referências.                |
| Vídeos             | `/galeria/videos`  |      Média | Listagem de vídeos publicados pelo autor.                   |
| Cursos             | `/cursos`          |      Média | Cursos, produtos educacionais, listas de espera.            |
| Detalhe de curso   | `/cursos/[slug]`   |      Média | Proposta, público, status, lista de espera quando aplicar.  |
| Livros             | `/galeria/livros`  | Média/baixa | Repertório e referências.                                   |
| Cultura            | `/galeria/cultura` |      Baixa | Filmes, séries, álbuns, jogos, podcasts.                    |
| Viagens            | `/galeria/viagens` |      Baixa | Registros de lugares e experiências.                        |

## Navegação principal

```txt
Home  ·  Jardim  ·  Projetos  ·  Galeria  ·  Cursos  ·  Sobre
```

Ordem pode ser ajustada por design. Estrutura conceitual deve ser preservada.

## Navegação secundária

Dentro do Jardim:

```txt
Todos · Notas · Insights · Posts · Ensaios · Marcos · Padrões · Gists
```

Dentro da Galeria:

```txt
Vídeos · Livros · Cultura · Viagens
```

Dentro de Projetos:

```txt
Todos · Profissionais · Pessoais · Open source · Experimentos
```

## Relação entre áreas

Áreas não são silos. Exemplos:

* projeto aponta para posts relacionados;
* post aponta para projeto;
* livro vira referência em ensaio;
* vídeo complementa texto;
* curso reúne posts, projetos e referências;
* marco registra evolução de projeto.

No MVP, conexões são manuais. Backlinks automáticos, grafo e busca semântica são evoluções futuras.

## Regras para evolução do sitemap

* Nova rota exige função editorial clara.
* Não criar página só porque existe database no Notion.
* Não misturar conteúdo textual autoral fora do Jardim sem justificativa.
* Galeria não vira depósito sem curadoria.
* Mudanças relevantes vão para este documento e, se durável, para ADR.
