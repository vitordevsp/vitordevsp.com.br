# PLAN-004 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Níveis de heading no índice

O índice lateral (TOC) deve mostrar apenas `H2`/`H3` ou também `H1`?

**Trade-off:** incluir `H1` deixa o índice mais completo, mas costuma duplicar o título da página; limitar a `H2`/`H3` tende a ficar mais legível. Também define o profundidade máxima e a identação.

**Resposta:**


## 2. Scroll spy no MVP

O destaque ativo por scroll (scroll spy) é indispensável no MVP ou pode vir depois?

**Trade-off:** scroll spy exige client component e `IntersectionObserver`. Sem ele, o índice ainda navega mas não reflete posição. Isolar num único componente client-side mantém o resto da página como RSC.

**Resposta:**


## 3. Navegação wiki após PLAN-005

Quando o PLAN-005 existir, a navegação wiki entre notas deve aparecer neste layout (coluna esquerda da leitura) ou em uma página dedicada do jardim?

**Por que importa:** define se este plano precisa reservar espaço no layout para um painel à esquerda agora ou se pode assumir leitura de duas colunas (conteúdo + TOC) sem terceira coluna.

**Resposta:**
