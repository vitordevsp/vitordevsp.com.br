# Sementes de conteudo

Banco de ideias reaproveitaveis que nascem dos registros em `.journey/`.

Cada semente declara origem, tese, formatos possiveis, relacao com SDD e maturidade (`Bruta`, `Promissora`, `Pronta para roteiro`, `Pronta para publicar`).

Uma ideia por bloco. Sem duplicar texto de episodio: aqui e plano de conteudo, nao relato.

## Ideia: Por que meu site tem uma pasta `.journey/`

### Origem

Marco em [`../timeline.md`](../timeline.md) de 2026-05-13 (tarde) — criacao da camada narrativa.

### Tese

A maioria dos projetos pessoais perde aprendizado porque so documenta no fim. Uma camada narrativa versionada, separada de `docs/` e do changelog, transforma o bastidor em ativo: vira post, aula, estudo de caso e prova social do metodo.

### Formatos possiveis

- Post: ensaio curto de abertura de serie no proprio jardim digital.
- Video: bastidor curto mostrando a estrutura `.journey/` e o motivo de cada arquivo.
- Aula: modulo introdutorio em um eventual curso de SDD ("como registrar a jornada antes que ela vire retrospectiva").
- Lead magnet: template `.journey/` reaproveitavel para outros projetos.

### Relacao com SDD

Introduz a ideia de que SDD nao governa apenas a especificacao do codigo; governa tambem a memoria do processo e a continuidade entre humano e agente.

### Maturidade

Promissora

## Ideia: Documentacao flat vence categorizada quase sempre

### Origem

Episodio [`../episodes/006-docs-de-categorizado-pra-flat.md`](../episodes/006-docs-de-categorizado-pra-flat.md). Frase "mais flat" virou refrao da branch claude_experiment.

### Tese

Categorizar documentacao cedo demais quebra. Subpastas viram caixas vazias, navegacao fica fria, repeticao se espalha. Comecar flat e so categorizar quando a categoria se justificar tres vezes mantem a documentacao usavel pelo humano e pelo agente.

### Formatos possiveis

- Post: opiniao tecnica curta, ~600 palavras, com antes e depois real do `docs/` deste projeto.
- Thread: 6-8 tweets com regra-de-bolso para parar de criar subpastas precoces.
- Aula: modulo de "arquitetura documental" no curso de SDD.

### Relacao com SDD

Mostra que SDD nao e sobre escrever mais documentacao, e sobre escrever menos documentacao certa.

### Maturidade

Promissora

## Ideia: O padrao trazer-podar-inflar-enxugar-carregar

### Origem

Episodio [`../episodes/007-skills-trazidas-do-agents-studio.md`](../episodes/007-skills-trazidas-do-agents-studio.md). Reuso de skills entre projetos.

### Tese

Reusar estrutura entre projetos sem virar copia-cola estragada exige cinco passos disciplinados: trazer (importar a base), podar (cortar refs orfas), inflar (criar tudo que parece util), enxugar (consolidar em flat depois que a inflacao revela ruido), carregar (mover candidatos pos-escopo para um plano carry-over). Pular qualquer passo introduz divida silenciosa.

### Formatos possiveis

- Post: framework explicado com exemplo real do Agents Studio v0.1 chegando neste repo.
- Lead magnet: template do plano carry-over (`plan-000-desktop`).
- Aula: modulo "como escalar SDD entre projetos" em curso futuro.

### Relacao com SDD

Mostra como SDD se torna multi-projeto. O metodo deixa de ser ritual local e vira ativo transferivel.

### Maturidade

Promissora

## Ideia: Reset total — quando reconstruir do zero e mais barato

### Origem

Episodios [`../episodes/004-reset-total-como-marca.md`](../episodes/004-reset-total-como-marca.md) (meta) e [`../episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md`](../episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md) (especifico do reset 2).

### Tese

A maioria dos devs trata reset total como derrota ou capricho. Ha dois sinais que justificam reset: arquitetura insustentavel onde manter custa mais que reconstruir, e impossibilidade de operar com agente porque o codigo nao tem fonte de verdade estruturada. Quando os dois aparecem juntos, evoluir incrementalmente sai mais caro que apagar e refazer.

### Formatos possiveis

- Post: confessional curto sobre apagar a propria v3.2.
- Video: "tour pelo cemiterio" mostrando o que ficou para tras e por que.
- Newsletter: criterio objetivo para decidir entre evoluir e resetar.

### Relacao com SDD

Mostra que SDD muitas vezes comeca por uma decisao dolorosa: aceitar que o codigo atual nao sustenta o metodo novo.

### Maturidade

Promissora

## Ideia: Replicar o fluxo `.journey/` em multiplos projetos como vitrine

### Origem

Decisao registrada em [`../hero.md`](../hero.md) — "Oferta futura". Resposta direta do Vitor durante a populacao desta camada.

### Tese

Em vez de lancar curso ou comunidade primeiro, replicar o framework `.claude/ + .journey/` em outros projetos pessoais e cada um virar vitrine viva. A oferta ganha prova social organica antes mesmo de existir produto pago. Os projetos viram catalogo do metodo.

### Formatos possiveis

- Serie de estudos de caso: cada projeto vira artigo "como o framework funcionou aqui".
- Pagina-vitrine no proprio site listando todos os projetos com `.journey/` publico.
- Newsletter mensal com diferenca de versao entre projetos.
- Curso futuro: usar os multiplos `.journey/` como material de aula.

### Relacao com SDD

Estrategia de prova: a melhor venda de SDD nao e teoria, e mostrar que o mesmo framework funciona em N projetos diferentes do mesmo autor.

### Maturidade

Bruta
