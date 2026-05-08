# Arquitetura da Informação

Este documento define a estrutura de navegação, áreas principais e organização conceitual do `site-vitorsampaio`.

O projeto deve iniciar considerando o sitemap completo, pois boa parte dos dados editoriais já existe ou está prevista no Notion. Isso não significa que todas as áreas precisam nascer com a mesma profundidade de implementação.

## Objetivo da arquitetura da informação

A arquitetura da informação deve permitir que o site funcione como:

* presença pública autoral;
* portfólio profissional;
* blog técnico;
* jardim digital;
* galeria de referências e registros;
* base para cursos, produtos e iniciativas futuras.

A navegação deve favorecer descoberta por contexto, não apenas por cronologia.

## Princípios de organização

* O site deve ter áreas claras e semanticamente distintas.
* Conteúdos autorais textuais pertencem ao Jardim.
* Projetos devem ter destaque próprio, mesmo quando relacionados a textos.
* Galeria agrupa conteúdos de mídia, referências culturais e registros não necessariamente textuais.
* Cursos e produtos podem existir no sitemap desde o início, mesmo que com implementação inicial simples.
* Sobre deve explicar a trajetória, atuação e presença profissional do autor.
* A Home deve funcionar como composição editorial das principais áreas.

## Sitemap completo

```txt
/
  Home

/jardim
  Jardim
  /jardim/[slug]
    Detalhe de conteúdo textual

/projetos
  Projetos
  /projetos/[slug]
    Detalhe de projeto

/galeria
  Galeria
  /galeria/videos
    Vídeos
  /galeria/livros
    Livros
  /galeria/cultura
    Cultura
  /galeria/viagens
    Viagens

/cursos
  Cursos
  /cursos/[slug]
    Detalhe de curso ou produto educacional

/sobre
  Sobre
```

## Áreas principais

## Home

Rota: `/`

A Home deve apresentar uma visão editorial e autoral do site.

Ela não deve ser apenas uma landing page estática. Deve funcionar como porta de entrada para as principais áreas do jardim digital e da presença profissional.

### Funções

* Apresentar quem é Vitor Sampaio.
* Comunicar posicionamento profissional e autoral.
* Destacar conteúdos recentes ou relevantes.
* Destacar projetos principais.
* Apontar para Jardim, Projetos, Galeria, Cursos e Sobre.
* Sugerir temas centrais do site.

### Conteúdos possíveis

* Hero autoral.
* Resumo profissional.
* Links para áreas principais.
* Conteúdos em destaque.
* Projetos em destaque.
* Chamadas para publicações recentes.
* Chamada para cursos/produtos quando existirem.

### Prioridade

Alta.

A Home é parte essencial da primeira versão.

## Jardim

Rota: `/jardim`

O Jardim é a área central para conteúdos textuais autorais.

Ele deve reunir textos em diferentes níveis de maturidade, incluindo notas, insights, posts, ensaios, marcos, changelogs, padrões e gists.

### Funções

* Listar conteúdos textuais autorais.
* Permitir navegação por tipo, tema, tag e maturidade.
* Comunicar que conteúdos podem estar em evolução.
* Servir como entrada para o pensamento público do autor.
* Conectar textos a projetos, vídeos, livros, cursos e outras referências.

### Conteúdos possíveis

* Notas rápidas.
* Insights.
* Posts técnicos.
* Ensaios.
* Marcos de projeto ou trajetória.
* Changelogs autorais.
* Padrões e gists.
* Hubs temáticos futuros.

### Página de detalhe

Rota: `/jardim/[slug]`

A página de detalhe deve renderizar o conteúdo textual vindo do Notion, com metadados editoriais e indicação de maturidade.

### Prioridade

Alta.

O Jardim é parte essencial da primeira versão.

## Projetos

Rota: `/projetos`

Projetos devem ter área própria porque fazem parte da presença profissional e da narrativa pública do autor.

A área não deve funcionar apenas como lista de cards. Cada projeto deve comunicar contexto, problema, papel do autor, decisões, stack, links e aprendizados.

### Funções

* Exibir projetos profissionais, pessoais e experimentais.
* Dar contexto sobre cada projeto.
* Conectar projetos a textos, vídeos e referências.
* Apoiar portfólio e reputação técnica.

### Conteúdos possíveis

* Projetos profissionais.
* Projetos pessoais.
* Projetos open source.
* Estudos e experimentos.
* Produtos digitais.
* Ferramentas internas ou conceitos em desenvolvimento.

### Página de detalhe

Rota: `/projetos/[slug]`

A página de detalhe deve permitir descrição mais rica do projeto, incluindo contexto, objetivos, papel do autor, tecnologias, decisões e links externos.

### Prioridade

Alta.

Projetos são parte importante da primeira versão.

## Galeria

Rota: `/galeria`

Galeria agrupa conteúdos e registros que não são necessariamente textos autorais, mas ajudam a compor o repertório público do autor.

Ela pode funcionar como hub para vídeos, livros, cultura e viagens.

### Funções

* Organizar registros multimídia e referências.
* Separar conteúdos não textuais do Jardim.
* Dar acesso a vídeos, livros, referências culturais e registros de viagem.
* Permitir expansão futura sem poluir a navegação principal.

### Subáreas

* `/galeria/videos`
* `/galeria/livros`
* `/galeria/cultura`
* `/galeria/viagens`

### Prioridade

Média.

A Galeria pode existir desde cedo como hub simples, mesmo que suas subáreas sejam implementadas progressivamente.

## Vídeos

Rota: `/galeria/videos`

Área para vídeos publicados ou destacados pelo autor.

### Funções

* Listar vídeos relacionados ao YouTube ou outras plataformas.
* Conectar vídeos a textos e projetos quando fizer sentido.
* Organizar conteúdo audiovisual sem misturar com textos do Jardim.

### Prioridade

Média.

Pode começar como listagem simples.

## Livros

Rota: `/galeria/livros`

Área para livros lidos, em leitura, recomendados ou usados como referência.

### Funções

* Registrar leituras e referências.
* Conectar livros a temas e textos.
* Apoiar o caráter de jardim digital e repertório público.

### Prioridade

Média/baixa.

Pode começar documentada e ser implementada depois.

## Cultura

Rota: `/galeria/cultura`

Área para referências culturais como filmes, séries, músicas, álbuns, jogos ou outros registros de repertório.

### Funções

* Registrar referências culturais relevantes.
* Conectar cultura a ideias, textos e projetos quando fizer sentido.
* Ampliar a dimensão autoral do site sem transformar o produto em rede social.

### Prioridade

Baixa.

Pode ser planejada desde o início e implementada em fase posterior.

## Viagens

Rota: `/galeria/viagens`

Área para registros de lugares, viagens, experiências e observações.

### Funções

* Registrar experiências e lugares visitados.
* Conectar registros a fotos, textos e reflexões.
* Expandir o jardim para além de conteúdo estritamente técnico.

### Prioridade

Baixa.

Pode ser planejada desde o início e implementada em fase posterior.

## Cursos

Rota: `/cursos`

Área para cursos, produtos educacionais, listas de espera ou materiais estruturados.

### Funções

* Apresentar cursos ou produtos digitais.
* Permitir páginas de detalhe para iniciativas educacionais.
* Servir como base futura para captação de interesse.

### Conteúdos possíveis

* Cursos em desenvolvimento.
* Produtos digitais.
* Listas de espera.
* Materiais educacionais.
* Trilhas de aprendizado.

### Página de detalhe

Rota: `/cursos/[slug]`

A página de detalhe pode apresentar proposta, público, status, conteúdos previstos, formulário externo ou chamada para lista de espera.

### Prioridade

Média.

Pode começar simples e evoluir conforme existirem ofertas reais.

## Sobre

Rota: `/sobre`

Página institucional/autoral sobre Vitor Sampaio.

### Funções

* Apresentar trajetória profissional.
* Comunicar atuação, interesses e áreas de estudo.
* Explicar a proposta do site.
* Direcionar para links externos e canais de contato.
* Conectar biografia, projetos e temas centrais.

### Conteúdos possíveis

* Resumo profissional.
* Atuação atual.
* Interesses técnicos.
* Filosofia de trabalho.
* Links sociais.
* Contato.

### Prioridade

Alta.

A página Sobre é parte essencial da primeira versão.

## Navegação principal

A navegação principal deve conter, no mínimo:

```txt
Home
Jardim
Projetos
Galeria
Cursos
Sobre
```

A ordem pode ser ajustada conforme design e prioridade editorial, mas a estrutura conceitual deve preservar essas áreas.

## Navegação secundária

A navegação secundária pode aparecer dentro de áreas específicas.

Exemplos:

### Jardim

```txt
Todos
Notas
Insights
Posts
Ensaios
Marcos
Padrões
Gists
```

### Galeria

```txt
Vídeos
Livros
Cultura
Viagens
```

### Projetos

```txt
Todos
Profissionais
Pessoais
Open source
Experimentos
```

## Relação entre áreas

As áreas não devem ser silos fechados.

Conteúdos devem poder se conectar entre si.

Exemplos:

* Um projeto pode apontar para posts relacionados.
* Um post pode apontar para um projeto.
* Um livro pode aparecer como referência em um ensaio.
* Um vídeo pode complementar um texto.
* Um curso pode reunir posts, projetos e referências.
* Um marco pode registrar a evolução de um projeto.

No MVP, essas conexões podem ser manuais.

Backlinks automáticos, grafos e busca semântica são evoluções futuras.

## Status de implementação por área

| Área               | Rota               |  Prioridade | Observação                            |
| ------------------ | ------------------ | ----------: | ------------------------------------- |
| Home               | `/`                |        Alta | Entrada principal do site             |
| Jardim             | `/jardim`          |        Alta | Área central de conteúdo textual      |
| Detalhe de texto   | `/jardim/[slug]`   |        Alta | Renderização de conteúdo Notion       |
| Projetos           | `/projetos`        |        Alta | Portfólio e narrativa de projetos     |
| Detalhe de projeto | `/projetos/[slug]` |        Alta | Pode começar simples                  |
| Sobre              | `/sobre`           |        Alta | Presença profissional/autoral         |
| Galeria            | `/galeria`         |       Média | Hub de conteúdos não textuais         |
| Vídeos             | `/galeria/videos`  |       Média | Pode começar como listagem            |
| Cursos             | `/cursos`          |       Média | Base para produtos educacionais       |
| Detalhe de curso   | `/cursos/[slug]`   |       Média | Implementar quando houver dados úteis |
| Livros             | `/galeria/livros`  | Média/baixa | Repertório e referências              |
| Cultura            | `/galeria/cultura` |       Baixa | Repertório cultural                   |
| Viagens            | `/galeria/viagens` |       Baixa | Registros pessoais/autoriais          |

## Regras para evolução do sitemap

* Novas rotas devem ter função editorial clara.
* Não criar página apenas porque existe uma database no Notion.
* Não misturar conteúdo textual autoral fora do Jardim sem justificativa.
* Não transformar Galeria em depósito genérico sem curadoria.
* Não criar rotas dinâmicas sem modelo de conteúdo definido.
* Registrar mudanças relevantes em `docs/product/information-architecture.md` e, se necessário, em ADR.

## Critério de sucesso

A arquitetura da informação será bem-sucedida quando o visitante conseguir entender rapidamente:

* quem é o autor;
* quais temas ele explora;
* quais projetos constrói;
* quais conteúdos estão disponíveis;
* como navegar por ideias em evolução;
* como as áreas do site se conectam.
