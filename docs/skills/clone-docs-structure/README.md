# clone-docs-structure

Skill para clonar, reconstruir ou sincronizar a camada `docs/` entre projetos diferentes, usando um projeto-fonte como referência estrutural sem copiar conteúdo cegamente.

Ela existe principalmente para:

- transplantar a taxonomia de `docs/` para outro repositório;
- reconstruir uma cópia parcial de documentação;
- sincronizar a estrutura local com uma fonte interna, como `studio.coding`;
- preservar o que o projeto de destino já tiver de mais maduro do que a fonte.

## Papel desta ferramenta

Esta skill não deve funcionar como simples cópia de pasta.

Ela deve:

- analisar a fonte;
- analisar o destino;
- comparar maturidade das camadas;
- reconstruir a estrutura de forma contextual;
- adaptar links, exemplos, referências e escopo ao projeto de destino.

## Conhecimentos úteis desta ferramenta

- A fonte de verdade pode estar em outro projeto interno, mas isso não significa que o destino deve ser rebaixado para espelhar a fonte.
- A taxonomia mais útil hoje precisa considerar `patterns`, `skills`, `routines`, `agents`, `plans`, `product`, `team`, `resources` e, quando fizer sentido, `notion`.
- Ferramentas documentais em pasta própria se beneficiam de um `README.md` curto com papel e log, porque isso ajuda manutenção humana e uso futuro por IA.

## Log

- 2026-04-18 16:18 - README criado para registrar o papel da skill e o aprendizado consolidado na sua evolução
- 2026-04-18 16:18 - skill ajustada para operar de forma mais agnóstica ao projeto e considerar fonte e destino como estruturas comparáveis, não como cópia literal
- 2026-04-18 17:45 - registrada a necessidade de sincronizar também `product/` e `team/`, preservando `resources/` apenas para materiais auxiliares
