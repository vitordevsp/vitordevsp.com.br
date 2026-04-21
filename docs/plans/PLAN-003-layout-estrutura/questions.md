# PLAN-003 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Imagens da hero e de Sobre

Qual foto deve ser usada na hero da home e na página Sobre?

**Por que importa:** determina tratamento de imagem (retrato vs paisagem), proporção, peso visual e acessibilidade (alt). Afeta também se a foto vem do repo, do Notion ou de um CDN.

**Resposta:**


## 2. Comportamento do campo de newsletter no footer

O campo de newsletter deve ficar apenas visual (desabilitado), enviar para uma rota futura ou apontar para contato existente enquanto não há backend?

**Trade-off:** campo puramente visual evita backend fake mas parece quebrado no mouseover; link para contato é honesto mas muda a semântica do elemento; rota futura exige decidir destino (PLAN-006 tem decisão semelhante para lista de espera).

**Resposta:**


## 3. Listagem de posts em estilo wiki

A listagem de posts deve mostrar o campo `Wiki` do Notion já existente como agrupador/categoria ou a visualização ampla é apenas mudança de layout sem afetar a query?

**Por que importa:** se o campo `Wiki` for usado, o componente precisa conhecer o vocabulário real de categorias e ordená-las de forma estável; se não for usado, o grid 4-col fica puramente visual.

**Resposta:**
