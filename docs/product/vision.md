# Visão do Produto

## Produto

`site-vitorsampaio` é o site pessoal de Vitor Sampaio.

O projeto existe para centralizar sua presença pública na web, reunindo portfólio, escrita técnica, projetos, ideias em evolução e registros de aprendizado em uma experiência própria, independente de plataformas de publicação fechadas.

O site deve funcionar como uma extensão pública do pensamento do autor: menos uma vitrine estática e mais um jardim digital navegável, onde conteúdos podem nascer pequenos, evoluir com o tempo e se conectar entre si.

## Objetivo principal

Construir uma presença digital autoral, técnica e evolutiva.

O site deve permitir que o autor publique, organize e exponha:

* ideias em diferentes níveis de maturidade;
* artigos e textos técnicos;
* projetos profissionais e pessoais;
* aprendizados contínuos;
* vídeos, referências e registros culturais;
* cursos, produtos e iniciativas futuras;
* conexões entre temas, projetos e conteúdos.

## Por que o projeto existe

O projeto existe porque um portfólio tradicional não representa bem o modo como o autor trabalha, aprende e constrói conhecimento.

A intenção é criar uma base pública que una:

* identidade profissional;
* escrita em público;
* documentação de projetos;
* pensamento em evolução;
* experimentação técnica;
* distribuição de conteúdo;
* contexto legível para humanos e agentes de IA.

O site deve ser útil para quem visita, mas também para o próprio autor: como ambiente de organização, publicação e reaproveitamento do que está sendo estudado, criado e refletido.

## Posicionamento

O site não deve ser apenas:

* um currículo online;
* uma landing page pessoal;
* um blog cronológico;
* uma lista de projetos;
* um repositório de links.

O site deve ser:

* um jardim digital público;
* uma interface autoral para conteúdos do Notion;
* uma base de portfólio e reputação técnica;
* um espaço para publicação incremental;
* uma camada pública de contexto sobre projetos, ideias e aprendizados.

## Jardim digital

O jardim digital é o conceito central do produto.

Diferente de um blog tradicional, onde cada conteúdo costuma ser publicado como algo finalizado, o jardim permite que ideias apareçam em estágios diferentes:

* anotações iniciais;
* insights rápidos;
* textos em evolução;
* ensaios mais maduros;
* registros de projeto;
* padrões reutilizáveis;
* marcos importantes.

A maturidade do conteúdo deve ser explícita para o usuário. Um texto incompleto não precisa parecer acabado. Um conteúdo em evolução pode ser publicado desde que sua condição esteja clara.

## Notion como jardim privado

O Notion será usado como CMS editorial e base privada de organização.

A relação esperada é:

```txt
Notion privado → curadoria/mapeamento → site público
```

O Notion concentra a escrita, organização e manutenção dos dados editoriais. O site transforma esses dados em uma experiência pública mais navegável, performática, semântica e adequada para leitura.

A aplicação não deve tentar reproduzir o Notion visualmente. Ela deve usar o Notion como fonte de dados e construir uma experiência própria no frontend.

## Público-alvo

O site deve atender principalmente:

* pessoas interessadas no trabalho de Vitor Sampaio;
* recrutadores, parceiros e contatos profissionais;
* desenvolvedores e pessoas técnicas;
* leitores interessados em IA, frontend, produto, educação digital, design de sistemas e tecnologia;
* pessoas que acompanham projetos, experimentos e publicações do autor;
* agentes de IA que precisem entender o contexto público do autor e dos seus projetos.

## Valor esperado

Para visitantes humanos, o site deve oferecer:

* clareza sobre quem é o autor;
* acesso organizado a projetos e conteúdos;
* leitura agradável;
* navegação por temas e conexões;
* percepção de profundidade técnica e trajetória.

Para o autor, o site deve oferecer:

* autonomia editorial;
* reaproveitamento do conteúdo já mantido no Notion;
* ambiente de publicação contínua;
* base para portfólio, projetos e produtos futuros;
* um sistema que incentive consistência de escrita e documentação.

Para agentes de IA, o site e sua documentação devem oferecer:

* contexto estruturado;
* decisões explícitas;
* modelos de conteúdo compreensíveis;
* arquitetura previsível;
* menor dependência de interpretação implícita.

## Escopo inicial

O projeto deve iniciar considerando o sitemap completo, pois a maioria dos dados editoriais já existe ou está prevista no Notion.

Áreas previstas:

* Home;
* Jardim;
* Projetos;
* Galeria;
* Cursos;
* Sobre.

Mesmo com o sitemap completo documentado desde o início, a implementação pode ser faseada. Nem toda área precisa ter a mesma profundidade no primeiro ciclo de desenvolvimento.

## O que o produto não deve ser no início

No MVP, o site não deve tentar ser:

* rede social;
* plataforma multiusuário;
* CMS próprio;
* sistema com autenticação;
* painel administrativo;
* marketplace;
* plataforma de cursos completa;
* sistema de comentários;
* motor complexo de busca semântica;
* clone visual do Notion.

Essas ideias podem aparecer no roadmap futuro, mas não devem orientar a arquitetura inicial como requisitos obrigatórios.

## Princípio de evolução

O site deve ser construído como um sistema evolutivo.

A primeira versão precisa ser simples, mas não descartável. A arquitetura deve permitir crescimento sem antecipar complexidade excessiva.

Decisões iniciais devem favorecer:

* clareza;
* baixo acoplamento;
* conteúdo estruturado;
* manutenção simples;
* integração server-side com Notion;
* boa experiência de leitura;
* documentação suficiente para orientar agentes.

## Norte do produto

O site deve expressar a seguinte ideia:

> Um espaço público para organizar, publicar e conectar ideias, projetos e aprendizados em evolução.

Essa visão deve orientar decisões de interface, arquitetura, conteúdo e roadmap.
