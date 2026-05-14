# Insights brutos

Fragmentos curtos, frases soltas, percepcoes ainda nao maduras. Ordem cronologica crescente.

Quando um insight crescer o suficiente, promover para episodio em `../episodes/` ou semente em `../seeds/content-seeds.md`. Insights ja promovidos ficam aqui marcados com `[promovido para: <destino>]` para preservar historico de origem sem virar duplicacao.

## 2026-05-13

- A camada narrativa funciona como contraponto da camada operacional: `.claude/` responde "como agentes devem agir"; `.journey/` responde "por que esse caminho foi escolhido". `[ainda raw]`
- Documentar a jornada e mais barato do que reconstruir aprendizado depois. O custo real e nao registrar. `[ainda raw — candidato a virar tese de EP-009]`
- Skill `journey-writer` aposta que o destino certo de cada insumo (hero, timeline, episodio, semente, fragmento, pergunta) reduz a chance de o registro virar changelog disfarcado. `[ainda raw — candidato a EP-009]`
- "Mais flat" virou refrao recorrente desta branch. Toda vez que a documentacao foi categorizada cedo, o usuario voltou para enxugar. Padrao confirmado: comecar flat, categorizar so quando a categoria se justificar tres vezes. `[promovido para: ep-006 + seeds/content-seeds.md]`
- Erro de agente que mais ensinou ate aqui: documentacao inflando sem freio. Agente preenchia mais do que precisava; Vitor cortava. Lacuna virou regra: a postura de "par tecnico, nao validador automatico" precisa ser atributo explicito do agente, nao consequencia de prompts soltos. `[promovido para: ep-006]`
- Reusar estrutura entre projetos (Agents Studio v0.1 -> este repo) revela um padrao: `trazer -> podar -> inflar -> enxugar -> carregar pos-v1`. O passo "podar" e onde o reuso da certo ou vira copia-cola estragada. `[promovido para: ep-007 + hero.md "Metodo emergente" + seeds/content-seeds.md]`
- Manter `roadmap.md` ao lado de `.claude/plans/` virou ruido. Quando o plano e a fonte de verdade, o roadmap separado vira retrato defasado. Decisao: absorver e remover. `[promovido para: ep-008]`
- A primeira versao do `.journey/` foi um rascunho generico criado pela skill antes de consultar a historia da branch. A segunda versao, baseada em material real extraido das conversas, ficou imediatamente mais util. Aprendizado meta: quando ha historico disponivel, reescrever com material real e mais barato do que tentar acertar de primeira sem ele. `[ainda raw — candidato a EP-009]`
- O fluxo `.journey/` ja foi decidido como replicavel em outros projetos do Vitor. Isso muda o calculo: cada decisao aqui nao serve so a este site, e tambem prototipo do framework que vai ser oferecido publicamente. `[promovido para: hero.md "Oferta futura" + seeds/content-seeds.md]`
- Insight novo: PLAN-000-desktop foi criado em 2026-04-21 — duas semanas ANTES do reset. Ja existia na branch `codex_experiment`. Carry-over como conceito antecedeu a virada metodologica; foi reaproveitado depois do reset. `[ainda raw — candidato a enriquecer ep-008]`
- Insight novo: o frontmatter `sources` resolve um problema que so apareceu depois da segunda passada de refinamento — releitura de conversas ja vistas. Padrao: instrumentar contra retrabalho so depois de sentir o retrabalho. `[ainda raw — candidato a EP-009]`
