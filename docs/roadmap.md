# Roadmap

Evolução planejada do `site-vitorsampaio` em fases. Orienta prioridade, não substitui planos técnicos detalhados.

## Princípios

* construção incremental;
* base simples mas não descartável;
* sitemap completo documentado desde o início;
* profundidade por fases;
* publicação, leitura e manutenção antes de recursos avançados.

## Fases

### Fase 1 — Fundação documental

Concluída. Documentos em `docs/` orientam humanos e agentes antes da implementação.

### Fase 2 — Base técnica da aplicação

Esqueleto Next.js com TypeScript, CSS Modules e estrutura compatível com [`architecture.md`](architecture.md).

Entregas:

* projeto Next.js configurado;
* estrutura inicial de `src/` (`app`, `features`, `integrations`, `shared`, `content`);
* layout raiz;
* estilos globais mínimos e tokens básicos;
* validações de build, lint e TypeScript.

Conclusão: aplicação roda localmente, build/TS passam, estrutura alinhada à documentação, sem integração Notion ainda.

### Fase 3 — Integração Notion server-side

Integração inicial preservando separação entre API, mappers e modelos internos.

Entregas:

* cliente Notion server-only;
* variáveis de ambiente seguras;
* queries para databases prioritárias (Textos, Projetos, dados de Home/Sobre);
* mappers para modelos internos;
* tipos internos;
* tratamento de erros e ausência de dados.

Conclusão: dados editoriais buscados no servidor, modelos internos usados pelas páginas, sem vazamento do formato bruto para UI.

### Fase 4 — Home, Sobre e navegação base

Primeira camada navegável.

Entregas:

* Home;
* Sobre;
* Header/navigation;
* Footer;
* layout responsivo inicial;
* links para áreas do sitemap.

Conclusão: visitantes entendem quem é o autor; site tem navegação principal funcional.

### Fase 5 — Jardim digital

Área central de conteúdo textual.

Entregas:

* `/jardim` e `/jardim/[slug]`;
* listagem de `TextPost`;
* renderização inicial de blocos do Notion;
* exibição de tipo e maturidade;
* tags e metadados editoriais;
* estados vazios e fallback.

Conclusão: conteúdos textuais públicos aparecem; detalhe renderiza; visitante entende maturidade.

### Fase 6 — Projetos

Portfólio e narrativa.

Entregas:

* `/projetos` e `/projetos/[slug]`;
* cards de projeto;
* contexto, stack, status, links;
* relações manuais com conteúdos relacionados.

Conclusão: projetos organizados; cada projeto comunica mais do que nome e stack.

### Fase 7 — Galeria

Conteúdos não textuais e referências.

Entregas (prioridade nessa ordem): Vídeos → Livros → Cultura → Viagens.

Conclusão: não textuais têm área própria; subáreas evoluem independentemente.

### Fase 8 — Cursos e produtos educacionais

Entregas:

* `/cursos` e `/cursos/[slug]`;
* modelo inicial de curso/produto;
* status da iniciativa;
* chamada para interesse ou lista de espera.

Fora de escopo: área logada, pagamento, player próprio, certificados, plataforma completa.

### Fase 9 — Experiência avançada de leitura

* layout de leitura refinado;
* índice lateral e scroll spy;
* blocos especiais (callout, código, referências);
* navegação entre conteúdos relacionados;
* melhor suporte a imagens e embeds.

### Fase 10 — Conexões, backlinks e descoberta

* conteúdos relacionados;
* backlinks automáticos;
* hubs temáticos;
* páginas por tag/tema;
* grafo de conteúdo;
* busca textual e, futuramente, semântica.

Implementar só com volume real de conteúdo.

### Fase 11 — IA e interfaces contextuais

* chat sobre conteúdos públicos;
* resumos contextuais;
* recomendações de leitura;
* busca semântica com embeddings;
* exportações em formatos legíveis por LLMs.

Restrições: não antes da base editorial; não criar dependência crítica de IA para navegação básica; não expor conteúdo privado; sem custos recorrentes sem decisão explícita.

### Fase 12 — Monetização, produtos e comunidade

* newsletter;
* lista de espera;
* cursos pagos;
* produtos digitais;
* serviços/consultoria;
* formulários de contato qualificado.

Fora de escopo até decisão: autenticação, área de membros, pagamentos internos, comentários, comunidade própria, CRM próprio.

## Ordem recomendada

```txt
1. Fundação documental
2. Base técnica
3. Integração Notion
4. Home, Sobre, navegação
5. Jardim digital
6. Projetos
7. Galeria
8. Cursos
9. Leitura avançada
10. Conexões e descoberta
11. IA contextual
12. Monetização e comunidade
```

## Critério geral

Roadmap bem-sucedido se permitir evolução contínua sem perder o foco:

> jardim digital público, autoral, técnico e sustentável, conectado ao Notion.
