# Referência de Produto — Digital Garden (Baseado em Maggie Appleton)

## Objetivo

Este documento consolida aprendizados extraídos do site e repositório de Maggie Appleton para servir como **referência de produto**.

Ele não define a implementação final do projeto, mas organiza:

* o que foi observado com evidência;
* o que foi inferido com base no comportamento do sistema;
* o que pode ser adaptado para o contexto do projeto.

---

## Síntese

O site não é um blog tradicional.

Ele funciona como:

> um sistema de organização e publicação de conhecimento em evolução ao longo do tempo.

O conteúdo não é estruturado apenas por tipo, mas por:

* maturidade;
* conexão com outros conteúdos;
* papel dentro do sistema de conhecimento.

---

## Conceito central

### Digital Garden

Um *Digital Garden* não organiza conteúdo por tempo.

Ele organiza por:

* crescimento;
* relacionamento entre ideias;
* curadoria contínua.

Diferença principal:

| Blog tradicional    | Digital Garden          |
| ------------------- | ----------------------- |
| Ordem cronológica   | Ordem conceitual        |
| Conteúdo finalizado | Conteúdo em evolução    |
| Post isolado        | Conteúdo interconectado |

---

## Estrutura de conteúdo (observado)

Tipos identificados no sistema:

* Essays
* Notes
* Patterns
* Talks
* Podcasts
* Library
* Smidgeons
* Updates

### Interpretação

Esses tipos representam **formas de leitura**, não entidades rígidas.

Exemplo:

* Essay → conteúdo profundo
* Note → pensamento rápido
* Pattern → referência estruturada

---

## Modelo conceitual correto

O sistema não gira em torno de tipo.

Ele gira em torno de:

### 1. Conteúdo base

```ts
type Content = {
  id: string
  title: string
  content: string
}
```

---

### 2. Tipo (forma de consumo)

```ts
type ContentType =
  | 'essay'
  | 'note'
  | 'pattern'
  | 'talk'
  | 'podcast'
  | 'book'
```

---

### 3. Maturidade (evolução)

```ts
type GrowthStage =
  | 'seedling'
  | 'growing'
  | 'evergreen'
```

Esse é um dos conceitos mais importantes do sistema.

---

### 4. Conexões (grafo de conhecimento)

```ts
links: string[]
backlinks: string[]
```

O conteúdo não vive isolado.

Ele forma uma rede.

---

### 5. Contexto

```ts
tags: string[]
```

---

## Insight principal

O sistema não é uma lista de posts.

Ele é:

> um grafo navegável de ideias

---

## Estrutura da Home (observado)

A home usa um grid assimétrico:

```
"essays essays notes"
"patterns library library"
```

### Interpretação

Isso cria:

* hierarquia visual (essays são mais importantes)
* navegação por interesse (não por tempo)
* sensação de “mapa” ao invés de feed

---

## Comportamento do sistema

### 1. Conteúdo longo e curto coexistem

* Essays → leitura profunda
* Notes → pensamento rápido

---

### 2. Conteúdo evolui

Um mesmo conteúdo pode:

* começar como nota
* virar essay
* ou continuar como rascunho

---

### 3. Conexões são centrais

Links internos não são só navegação.

Eles são:

* contexto
* continuidade de pensamento
* estrutura do sistema

---

## O que foi confirmado via código (GitHub)

* uso de MDX para conteúdo
* collections tipadas
* sistema de backlinks
* layout baseado em grid/masonry
* forte uso de tipografia e espaçamento como UX
* separação de tipos como collections, não como entidades rígidas

---

## O que é inferido (não confirmado totalmente)

Esses pontos são hipóteses úteis:

* status de maturidade influencia UI
* notes são mais atualizadas do que essays
* patterns funcionam como biblioteca técnica
* conteúdo pode evoluir entre tipos

---

## O que NÃO assumir como verdade

Evitar tratar como regra:

* campos específicos por tipo
* existência obrigatória de reading time
* estrutura fixa de páginas internas
* presença universal de backlinks em todos conteúdos

---

## Tradução para o seu projeto

### Decisão importante já tomada

> “tudo é post, muda status e classificação”

Isso está correto.

---

## Modelo recomendado

```ts
type Post = {
  id: string
  title: string
  content: string

  type?: 'essay' | 'note' | 'pattern'

  status: 'draft' | 'published'

  maturity?: 'seedling' | 'growing' | 'evergreen'

  tags: string[]
  links: string[]
}
```

---

## O que absorver

* conceito de digital garden
* conteúdo como sistema evolutivo
* mistura de conteúdos curtos e longos
* grid como mapa de conhecimento
* conexões entre conteúdos
* curadoria contínua

---

## O que NÃO copiar

* categorias específicas do site dela
* identidade visual
* estrutura rígida de collections
* complexidade desnecessária

---

## Direção futura

### Backlinks

Hoje:

* links manuais

Futuro:

* sistema automático de backlinks

---

### Interação de usuários

Possibilidades futuras:

* comentários
* sugestões de conexão entre conteúdos
* marcação de leitura
* exploração assistida por IA

---

### Curadoria (jardinagem)

Manter:

* limpeza constante
* revisão de conteúdos antigos
* evolução de ideias

---

## Definição final

Se o sistema tivesse uma frase:

> um ambiente para pensar, registrar e evoluir ideias em público ao longo do tempo
