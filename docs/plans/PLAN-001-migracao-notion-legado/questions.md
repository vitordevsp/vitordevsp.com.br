# PLAN-001 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Consumidores externos das rotas legadas

Algum consumidor externo chama `/api/notion/posts`, `/api/notion/videos`, `/api/notion/projects` ou `/api/notion/contents`?

**Por que importa:** define se podemos remover `src/app/api/notion/_resources/` e as rotas associadas sem quebrar integração externa. Se houver consumidor, a remoção vira etapa separada com deprecação anunciada.

**Resposta:**


## 2. Paridade de acesso entre `NOTION_KEY` e `NOTION_TOKEN`

As duas credenciais têm exatamente o mesmo acesso nos databases do Notion?

**Por que importa:** se divergem (por exemplo, uma integration só tem acesso a posts e outra a vídeos), a migração precisa unificar a credencial antes de trocar as chamadas, senão quebra em produção.

**Resposta:**


## 3. Critério de projetos da home

A home deve continuar exibindo apenas projetos marcados com alguma propriedade de destaque no Notion, ou segue o critério atual (limite de 3 primeiros por ordem)?

**Estado atual (código + schema):** a home chama `projectService.list(3)` do legacy (sem filtro por `Destaque`) e o schema exposto em `docs/product/notes-context-notion.md` §10 **não lista** uma propriedade `Destaque` em Projetos — as propriedades documentadas são `Nome`, `Status`, `Descricao`, `Tags`, `Versão` e `Publicado Em`. Ou seja, "em destaque" hoje é apenas um rótulo do heading da home.

**Opções na migração:**
- manter o critério atual (limite de 3 primeiros, ordenado por `Publicado Em` desc com fallback para `Criado Em`);
- introduzir nova propriedade `Destaque` (checkbox) em Projetos e filtrar por ela;
- filtrar por `Status = "Concluído"` para mostrar só projetos finalizados;
- filtrar por `Tags contains "destaque"`.

**Resposta:**
