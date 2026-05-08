# Roadmap do Produto

Este documento define a evolução planejada do `site-vitorsampaio` em fases.

O roadmap orienta prioridade de produto, não substitui planos técnicos detalhados. Cada fase pode ser quebrada em tarefas específicas quando chegar o momento de implementação.

## Princípios do roadmap

* Construir o produto de forma incremental.
* Começar com uma base simples, mas não descartável.
* Documentar o sitemap completo desde o início.
* Implementar profundidade por fases.
* Evitar antecipar complexidade técnica sem uso real.
* Priorizar publicação, leitura e manutenção antes de recursos avançados.

## Fase 1 — Fundação documental e arquitetural

### Objetivo

Criar a base de documentação e decisões que guiará a reconstrução do projeto.

Antes de implementar a aplicação, o projeto deve ter documentos suficientes para orientar humanos e agentes de IA.

### Entregas

* Estrutura inicial de `docs/`.
* Visão do produto.
* Princípios do produto.
* Arquitetura da informação.
* Modelo de conteúdo.
* Roadmap.
* Visão geral de arquitetura.
* Regras de frontend.
* Regras de integração com Notion.
* Regras de styling com CSS Modules.
* Instruções para agentes.
* ADRs iniciais.
* Referência das bases do Notion.

### Critério de conclusão

A fase é concluída quando:

* a pasta `docs/` existe com os documentos principais;
* decisões iniciais estão registradas;
* Claude Code consegue entender o projeto antes de implementar;
* há clareza sobre sitemap, modelos de conteúdo e restrições técnicas.

## Fase 2 — Base técnica da aplicação

### Objetivo

Criar o esqueleto inicial da aplicação Next.js com TypeScript, CSS Modules e estrutura compatível com a arquitetura documentada.

### Entregas

* Projeto Next.js configurado.
* Estrutura inicial de `src/`.
* Layout raiz.
* Estilos globais mínimos.
* Tokens básicos de design.
* Componentes base mínimos.
* Configuração de aliases.
* Validações iniciais de build, lint e TypeScript.

### Escopo esperado

Estrutura conceitual esperada:

```txt
src/
  app/
  features/
  integrations/
  shared/
  content/
```

A estrutura final deve seguir os documentos de arquitetura, não este roadmap isoladamente.

### Critério de conclusão

A fase é concluída quando:

* a aplicação roda localmente;
* build e TypeScript passam;
* estrutura de pastas está alinhada à documentação;
* não há integração real com Notion ainda, exceto se explicitamente decidido.

## Fase 3 — Integração Notion server-side

### Objetivo

Implementar a integração inicial com Notion, preservando separação entre API externa, mappers e modelos internos.

### Entregas

* Cliente Notion server-only.
* Configuração segura de variáveis de ambiente.
* Queries iniciais para databases prioritárias.
* Mappers para modelos internos.
* Tipos internos da aplicação.
* Tratamento inicial de erros e ausência de dados.
* Documentação atualizada da integração.

### Databases prioritárias

Prioridade inicial:

* Textos / Jardim.
* Projetos.
* Dados básicos da Home.
* Dados básicos de Sobre, quando aplicável.

Demais bases podem ser mapeadas depois conforme a implementação avançar.

### Restrições

* Tokens não podem ir para o client.
* Componentes de UI não devem receber objetos brutos da API do Notion.
* Não criar API routes legacy.
* Não duplicar sistemas de integração.

### Critério de conclusão

A fase é concluída quando:

* dados editoriais são buscados no servidor;
* modelos internos são usados pelas páginas/componentes;
* não há vazamento do formato bruto do Notion para UI;
* a integração está documentada.

## Fase 4 — Home, Sobre e navegação base

### Objetivo

Criar a primeira camada navegável do site, com identidade, layout e rotas principais.

### Entregas

* Home.
* Página Sobre.
* Header/navigation.
* Footer.
* Layout responsivo inicial.
* Links para áreas principais do sitemap.
* Componentes compartilhados necessários.

### Áreas de navegação

A navegação principal deve considerar:

```txt
Home
Jardim
Projetos
Galeria
Cursos
Sobre
```

Mesmo que algumas áreas ainda estejam simples, elas podem aparecer como rotas planejadas ou páginas iniciais.

### Critério de conclusão

A fase é concluída quando:

* visitantes conseguem entender quem é o autor;
* o site tem navegação principal funcional;
* Home e Sobre comunicam a proposta do produto;
* estrutura visual inicial está definida.

## Fase 5 — Jardim digital

### Objetivo

Implementar a área central de conteúdo textual autoral.

### Entregas

* Página `/jardim`.
* Página `/jardim/[slug]`.
* Listagem de `TextPost`.
* Renderização inicial de conteúdo vindo do Notion.
* Exibição de tipo de texto.
* Exibição de estágio de maturidade.
* Tags e metadados editoriais.
* Estados vazios e fallback.

### Conteúdos contemplados

* Notas.
* Insights.
* Posts.
* Ensaios.
* Marcos.
* Changelogs.
* Padrões.
* Gists.

### Evoluções possíveis

* Filtros por tipo.
* Filtros por maturidade.
* Filtros por tag.
* Índice interno do texto.
* Links relacionados.
* Hubs temáticos.

### Critério de conclusão

A fase é concluída quando:

* conteúdos textuais públicos do Notion aparecem no site;
* a página de detalhe renderiza conteúdo real;
* o visitante entende o estágio de maturidade de cada conteúdo;
* o Jardim funciona como área central de publicação incremental.

## Fase 6 — Projetos

### Objetivo

Implementar a área de portfólio e narrativa de projetos.

### Entregas

* Página `/projetos`.
* Página `/projetos/[slug]`.
* Cards de projeto.
* Dados de contexto, stack, status e links.
* Relações manuais com posts ou conteúdos relacionados.

### Critério de conclusão

A fase é concluída quando:

* projetos aparecem de forma organizada;
* cada projeto comunica mais do que nome e stack;
* projetos relevantes podem ter página própria;
* a área apoia a presença profissional do autor.

## Fase 7 — Galeria

### Objetivo

Criar a área de conteúdos não textuais e referências.

### Entregas

* Página `/galeria`.
* Página `/galeria/videos`.
* Página `/galeria/livros`.
* Página `/galeria/cultura`.
* Página `/galeria/viagens`.

### Estratégia

A Galeria pode começar como hub simples e evoluir por subárea.

Prioridade sugerida:

1. Vídeos.
2. Livros.
3. Cultura.
4. Viagens.

### Critério de conclusão

A fase é concluída quando:

* conteúdos não textuais têm área própria;
* a Galeria não polui o Jardim;
* subáreas podem evoluir independentemente;
* referências podem se conectar a textos e projetos.

## Fase 8 — Cursos e produtos educacionais

### Objetivo

Criar a base pública para cursos, trilhas, produtos digitais ou listas de espera.

### Entregas

* Página `/cursos`.
* Página `/cursos/[slug]`.
* Modelo inicial de curso/produto.
* Status da iniciativa.
* Chamada para interesse ou lista de espera, se aplicável.

### Fora de escopo inicial

* Área logada.
* Pagamento.
* Player próprio de aulas.
* Emissão de certificados.
* Plataforma completa de cursos.

### Critério de conclusão

A fase é concluída quando:

* iniciativas educacionais têm presença pública;
* o site pode captar interesse sem backend complexo;
* cursos podem se conectar a posts, projetos e referências.

## Fase 9 — Experiência avançada de leitura

### Objetivo

Melhorar a experiência de consumo de textos longos e conteúdos densos.

### Entregas possíveis

* Layout de leitura mais refinado.
* Índice lateral.
* Scroll spy.
* Blocos especiais para callouts, código e referências.
* Navegação entre conteúdos relacionados.
* Melhor suporte a imagens e embeds.
* Melhor tratamento de blocos do Notion.

### Critério de conclusão

A fase é concluída quando:

* textos longos ficam confortáveis de ler;
* conteúdos densos têm navegação interna clara;
* a renderização do Notion atende aos principais blocos usados pelo autor.

## Fase 10 — Conexões, backlinks e descoberta

### Objetivo

Evoluir o jardim digital para uma rede de conteúdos conectados.

### Entregas possíveis

* Conteúdos relacionados.
* Backlinks automáticos.
* Hubs temáticos.
* Páginas por tag ou tema.
* Grafo de conteúdo.
* Busca textual.
* Busca semântica futura.

### Restrições

Esses recursos não devem ser implementados antes de existir volume e estrutura suficientes de conteúdo público.

### Critério de conclusão

A fase é concluída quando:

* o usuário consegue descobrir conteúdos por relação semântica;
* o jardim deixa de ser apenas listagem;
* temas e conexões ficam explícitos.

## Fase 11 — IA e interfaces contextuais

### Objetivo

Explorar o uso de IA como camada de navegação, explicação e interação com o conteúdo público.

### Possibilidades futuras

* Chat sobre conteúdos públicos do site.
* Resumos contextuais.
* Recomendações de leitura.
* Busca semântica com embeddings.
* Arquivos preparados para agentes de IA.
* Exportações em formatos legíveis por LLMs.

### Restrições

* Não implementar IA antes da base editorial estar sólida.
* Não criar dependência crítica de IA para navegação básica.
* Não expor conteúdo privado do Notion.
* Não adicionar custos recorrentes sem decisão explícita.

### Critério de conclusão

A fase é concluída quando:

* IA amplia a navegação ou compreensão do conteúdo;
* a experiência básica continua funcional sem IA;
* dados públicos e privados estão bem separados.

## Fase 12 — Monetização, produtos e comunidade

### Objetivo

Explorar possibilidades de produtos, cursos, serviços, captação de leads e relacionamento com leitores.

### Possibilidades futuras

* Newsletter.
* Lista de espera.
* Cursos pagos.
* Produtos digitais.
* Serviços/consultoria.
* Formulários de contato qualificado.
* Conteúdo exclusivo, se houver decisão futura.

### Fora de escopo até decisão explícita

* Autenticação.
* Área de membros.
* Pagamentos internos.
* Comentários.
* Comunidade própria.
* CRM próprio.

## Priorização inicial sugerida

Ordem recomendada para execução:

```txt
1. Fundação documental e arquitetural
2. Base técnica da aplicação
3. Integração Notion server-side
4. Home, Sobre e navegação base
5. Jardim digital
6. Projetos
7. Galeria
8. Cursos
9. Experiência avançada de leitura
10. Conexões e descoberta
11. IA contextual
12. Monetização e comunidade
```

## O que não fazer cedo demais

Evite implementar antes de necessidade real:

* autenticação;
* backend próprio;
* banco de dados próprio;
* painel administrativo;
* sistema de comentários;
* busca semântica;
* embeddings;
* pagamentos;
* área de membros;
* plataforma completa de cursos;
* sincronizações complexas;
* múltiplos sistemas de CMS;
* estado global.

## Como atualizar este roadmap

Atualize este documento quando:

* uma fase mudar de prioridade;
* uma área nova entrar no escopo;
* um recurso sair do escopo;
* uma decisão de produto alterar a ordem de implementação;
* uma fase for concluída e gerar aprendizados relevantes.

Mudanças arquiteturais relevantes também devem ser registradas em ADRs.

## Critério geral de sucesso

O roadmap será bem-sucedido se permitir evolução contínua sem perder o foco central do produto:

> construir um jardim digital público, autoral, técnico e sustentável, conectado ao Notion e preparado para evoluir com clareza.
