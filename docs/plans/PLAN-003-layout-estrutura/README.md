# PLAN-003 — Ajustes de Layout e Estrutura

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Reformular o layout geral do site: navbar com comportamento de scroll, hero da home com foto, estrutura de seções inspirada na Maggie Appleton, footer completo, visualização wiki em posts e bloco de foto em Sobre.

---

## Contexto

O site está sendo transformado em um jardim digital. O layout atual não reflete essa identidade. A referência principal é maggieappleton.com — estrutura de seções assimétricas, senso de exploração e curadoria visível.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/components/frames/PageHeader/` | modificar | Navbar fixa com hide-on-scroll |
| `src/app/(pages)/page.tsx` | modificar | Reestruturar hero com foto e seções |
| `src/components/frames/HomeSection/` | criar | Componente de seção com grid assimétrico |
| `src/components/frames/PageFooter/` | modificar | Footer com mapa do site, coleta de e-mail e newsletter |
| `src/app/(pages)/posts/page.tsx` | modificar | Visualização wiki em grid de 4 colunas |
| `src/app/(pages)/sobre/page.tsx` | modificar | Intercalar foto com blocos de texto |
| `src/styles/` | modificar | Variáveis e estilos globais para os novos componentes |
| `src/components/index.ts` | modificar | Exportar novos componentes |

---

## Critério de Conclusão

- [ ] Navbar fixa que some ao scrollar para baixo e reaparece ao scrollar para cima
- [ ] Hero da home com foto e textos reestruturados
- [ ] Seção com grid assimétrico (col esquerda: título + grid 2x2 ou 3x3 / col direita: título + lista de cards) implementada e reutilizável
- [ ] Seção repetida invertida abaixo (proporção 70x30 invertida)
- [ ] Footer com mapa do site, campo de e-mail para newsletter
- [ ] Página de posts com grid de 4 colunas estilo wiki
- [ ] Página Sobre com foto intercalada nos blocos de conteúdo
- [ ] Responsivo nos breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px
- [ ] `pnpm lint` sem erros

---

## Fora do Escopo

- Criação das páginas novas (Jardim, Galeria, Cursos) — planos separados
- Lógica de dados do Notion — apenas estrutura visual
- Integração real do formulário de e-mail (apenas o campo visual por enquanto)

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Referência | https://maggieappleton.com/ |
| Risco | Navbar hide-on-scroll pode conflitar com comportamento atual do PageHeader |
| Risco | Grid assimétrico pode ter comportamento inesperado em mobile |

---

## Notas de Implementação

- Navbar: usar `IntersectionObserver` ou listener de scroll com threshold para o comportamento de hide/show
- Seção assimétrica: estrutura base com CSS Grid, proporção `30fr 70fr` e `70fr 30fr` alternadas
- Posts wiki: cada card representa um "campo wiki" do Notion — avaliar quais propriedades exibir
- Foto na hero: avaliar usar `next/image` com priority

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
