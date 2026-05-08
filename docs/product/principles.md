# Princípios do Produto

Este documento define princípios que devem orientar decisões de produto, experiência, conteúdo e evolução do `site-vitorsampaio`.

Os princípios abaixo são critérios de decisão. Quando houver dúvida entre caminhos possíveis, escolha a opção que respeita melhor estes princípios.

## 1. O site é um jardim digital, não apenas um blog

O site deve permitir publicação incremental.

Nem todo conteúdo precisa nascer como artigo finalizado. Ideias podem começar pequenas, ganhar contexto, ser reorganizadas e amadurecer ao longo do tempo.

A experiência deve deixar claro que existem conteúdos em diferentes estágios de maturidade.

### Implicações

* Conteúdos em evolução podem ser publicados.
* A maturidade do conteúdo deve ser visível.
* A navegação não deve depender apenas de ordem cronológica.
* O usuário deve conseguir explorar temas, relações e categorias.

## 2. Clareza antes de volume

O site pode ter muitas áreas e tipos de conteúdo, mas cada página precisa ter uma função clara.

A existência de dados no Notion não significa que tudo deve aparecer com o mesmo peso na interface.

### Implicações

* Evite páginas genéricas sem intenção definida.
* Priorize hierarquia visual e editorial.
* Não transforme o site em uma listagem bruta do Notion.
* Dê destaque ao que ajuda o visitante a entender o autor, os projetos e as ideias centrais.

## 3. Conteúdo vivo deve parecer vivo

O site deve assumir que parte do conteúdo está em construção.

Um texto incompleto não deve ser apresentado como artigo final. Um conteúdo maduro não deve parecer rascunho.

### Implicações

* Use estágios de maturidade.
* Use metadados editoriais para contextualizar o conteúdo.
* Permita que textos sejam revisitados e atualizados.
* Quando fizer sentido, exiba datas de criação, atualização e status.

## 4. Notion é fonte editorial, não arquitetura de UI

O Notion organiza e armazena conteúdo, mas não deve ditar diretamente a estrutura visual ou arquitetural da aplicação.

A aplicação deve transformar dados do Notion em modelos internos antes de renderizar componentes.

### Implicações

* Componentes de UI não devem depender diretamente de objetos brutos da API do Notion.
* Cada base relevante do Notion deve ter mapeamento para modelo interno.
* Mudanças na estrutura do Notion devem impactar principalmente a camada de integração, não a UI inteira.
* O site deve ter uma experiência própria, não uma cópia visual do Notion.

## 5. Server-first por padrão

O site é público, editorial e orientado a leitura. A maior parte dos dados deve ser buscada e renderizada no servidor.

Client Components devem existir apenas quando houver interação real no navegador.

### Implicações

* Pages devem ser Server Components por padrão.
* Evite `"use client"` sem necessidade.
* Tokens e dados sensíveis nunca devem ir para o client.
* Fetching editorial deve acontecer no servidor.
* Estado global não deve ser introduzido no MVP.

## 6. Simplicidade evolutiva

A primeira versão deve ser simples, mas preparada para crescer.

Evite antecipar complexidade de sistemas que ainda não existem, como autenticação, comentários, busca semântica, painel administrativo ou backend próprio.

### Implicações

* Prefira arquitetura clara a abstrações prematuras.
* Adicione dependências apenas quando resolverem um problema real.
* Documente decisões antes de criar estruturas complexas.
* Implemente o menor caminho consistente com a visão do produto.

## 7. A experiência deve favorecer exploração

O visitante deve conseguir navegar por ideias, temas, projetos e conexões.

A cronologia importa, mas não deve ser o único modo de descoberta.

### Implicações

* Use tags, categorias, tipos e estágios de maturidade.
* Permita agrupamentos por tema quando fizer sentido.
* Planeje links manuais entre conteúdos.
* Backlinks e busca avançada podem ser evoluções futuras, não requisitos iniciais.

## 8. O site deve ser útil para o autor

O produto não deve servir apenas como vitrine externa.

Ele também deve funcionar como ferramenta de organização pública, reaproveitamento de conteúdo e evolução do próprio pensamento.

### Implicações

* O fluxo editorial deve ser compatível com o uso real do Notion.
* A estrutura do site deve incentivar publicação contínua.
* O autor deve conseguir transformar notas em textos, textos em hubs e projetos em narrativas.
* A documentação deve ajudar a manter consistência ao longo do tempo.

## 9. O site deve ser legível por humanos e agentes

A documentação e a estrutura do projeto devem ser compreensíveis para pessoas e agentes de IA.

O objetivo não é apenas manter código funcionando, mas criar contexto explícito para evolução assistida por IA.

### Implicações

* Decisões importantes devem estar documentadas.
* Arquivos devem ter responsabilidade clara.
* A arquitetura deve reduzir ambiguidade.
* Agentes devem conseguir entender o produto antes de alterar o código.

## 10. Design deve apoiar leitura e identidade

A interface deve ser autoral, limpa e confortável para leitura.

O design não deve competir com o conteúdo, mas também não precisa ser genérico.

### Implicações

* Priorize legibilidade.
* Use hierarquia tipográfica clara.
* Evite excesso visual em páginas de leitura.
* Preserve espaço para identidade visual própria.
* CSS Modules é o padrão para estilização de componentes.

## 11. Portfólio deve contar contexto, não só listar projetos

Projetos não devem aparecer apenas como cards com links.

Cada projeto relevante deve comunicar contexto, problema, papel do autor, decisões, tecnologias e aprendizados.

### Implicações

* Projetos podem ter páginas próprias.
* Cards devem resumir valor, não apenas stack.
* Projetos pessoais e profissionais podem coexistir com classificação clara.
* Projetos podem se conectar a posts, notas, vídeos e referências.

## 12. Sitemap completo não significa implementação pesada

O projeto deve documentar o sitemap completo desde o início, porque os dados editoriais já existem ou estão previstos no Notion.

Isso não significa que todas as áreas precisam nascer com o mesmo nível de profundidade técnica ou visual.

### Implicações

* Todas as áreas principais podem estar previstas na arquitetura de informação.
* A implementação pode ser faseada.
* Áreas futuras podem começar como páginas simples.
* Evite criar abstrações complexas antes de existir uso real.

## 13. Decisões devem ser explícitas

Quando uma decisão estrutural for tomada, ela deve ser registrada.

Isso reduz regressões, evita reinterpretações por agentes e facilita manutenção futura.

### Implicações

* Use ADRs para decisões arquiteturais relevantes.
* Atualize documentos quando contratos mudarem.
* Não deixe decisões importantes apenas implícitas no código.
* Se houver conflito entre documentação e código, trate como divergência a ser resolvida.

## 14. O conteúdo deve formar rede

O valor do jardim digital cresce quando conteúdos se conectam.

A primeira versão pode usar links manuais, tags e agrupamentos simples. Recursos automáticos podem vir depois.

### Implicações

* Conteúdos devem poder referenciar outros conteúdos.
* Projetos podem apontar para posts relacionados.
* Posts podem apontar para projetos, livros, vídeos e notas.
* Hubs temáticos podem surgir como evolução natural do conteúdo.

## 15. Manutenção simples é requisito de produto

O site deve ser sustentável para uma pessoa manter.

Complexidade técnica só se justifica quando melhora publicação, organização, leitura ou evolução do sistema.

### Implicações

* Prefira fluxos editoriais simples.
* Evite dependências desnecessárias.
* Não crie painéis internos antes de necessidade real.
* Não duplique dados entre Notion e código sem motivo.
* Mantenha a documentação operacional e curta o suficiente para ser usada.

## Critério final

Uma decisão é boa para este produto quando melhora pelo menos um destes pontos sem degradar excessivamente os demais:

* clareza para visitantes;
* autonomia editorial;
* qualidade de leitura;
* organização do jardim digital;
* manutenção simples;
* evolução assistida por IA;
* expressão autoral do site.
