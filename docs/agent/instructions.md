# Instruções para Agentes

Este documento orienta agentes de IA ao trabalhar no `site-vitorsampaio`.

## Regra principal

Antes de implementar, leia a documentação relevante em `docs/`.

Não assuma decisões grandes quando a documentação ainda não define o caminho.

## Contexto

`site-vitorsampaio` é o site pessoal de Vitor Sampaio.

O projeto será reconstruído do zero como:

* presença pública;
* portfólio;
* blog técnico;
* jardim digital;
* base de projetos, ideias e aprendizados.

O Notion será usado como CMS editorial.

## Prioridade atual

Enquanto a base documental estiver em construção, priorize documentação.

Não implemente aplicação, estrutura em `src/`, dependências ou configuração de build sem pedido explícito.

## Leitura obrigatória por tarefa

### Antes de qualquer tarefa

Leia:

```txt
docs/README.md
```

### Produto e escopo

Leia:

```txt
docs/product/vision.md
docs/product/principles.md
docs/product/information-architecture.md
docs/product/content-model.md
docs/product/roadmap.md
```

### Arquitetura e código

Leia:

```txt
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/notion-cms.md
docs/architecture/styling.md
```

### Decisões

Leia os ADRs em:

```txt
docs/decisions/
```

### Notion

Leia:

```txt
docs/reference/notion-databases.md
```

## Regras de conduta

* Faça mudanças pequenas e direcionadas.
* Evite reescrever arquivos inteiros sem necessidade.
* Não apague conteúdo sem motivo explícito.
* Não altere decisões documentadas sem registrar a mudança.
* Não crie abstrações grandes antes de uso real.
* Não instale dependências sem justificativa clara.
* Não implemente recursos futuros sem pedido explícito.
* Não recrie estruturas antigas do projeto apagado.

## Regras técnicas conhecidas

* Next.js com TypeScript.
* Server Components por padrão.
* Client Components apenas quando necessário.
* CSS Modules como padrão de estilos.
* Notion como CMS server-side.
* UI baseada em modelos internos.
* Sem Tailwind no MVP.
* Sem Chakra UI no MVP.
* Sem backend próprio no MVP.
* Sem autenticação no MVP.
* Sem estado global no MVP.

## Proibido sem decisão explícita

Não adicionar:

* Tailwind;
* Chakra UI;
* styled-components;
* Zustand;
* Redux;
* banco de dados próprio;
* autenticação;
* painel administrativo;
* área de membros;
* pagamentos;
* busca semântica;
* embeddings;
* chat com IA;
* comentários;
* múltiplos CMS.

## Uso de Client Components

Não usar `"use client"` por conveniência.

Permitido quando houver:

* estado local de UI;
* evento do navegador;
* menu mobile;
* filtro client-side;
* scroll spy;
* animação dependente do client;
* API do browser.

Se não houver interação real, mantenha Server Component.

## Integração com Notion

A integração deve ser isolada em:

```txt
src/integrations/notion/
```

Regras:

* acesso server-only;
* token apenas no servidor;
* queries centralizadas;
* mappers por modelo;
* UI sem objetos brutos da API;
* filtros para conteúdo público;
* sem sistema legacy paralelo.

## Modelos internos

A UI deve receber modelos como:

* `TextPost`;
* `Project`;
* `Video`;
* `Book`;
* `CultureItem`;
* `Place`;
* `Course`.

Não passar objetos brutos do Notion para componentes comuns.

## Estrutura frontend esperada

```txt
src/
  app/
  features/
  integrations/
  shared/
  content/
```

Não criar pastas vazias sem uso real.

## Estilo de código

* Preferir código explícito.
* Evitar abstrações prematuras.
* Preferir funções pequenas.
* Nomear arquivos pela responsabilidade.
* Separar domínio, integração e UI.
* Usar TypeScript de forma clara.
* Evitar `any` sem justificativa.

## Estilo de documentação

A documentação deve ser:

* objetiva;
* normativa;
* em português;
* útil para humanos e agentes;
* sem tom promocional;
* sem excesso de explicação óbvia.

## Como responder ao usuário

Ao concluir uma tarefa, informe:

* o que foi alterado;
* quais arquivos foram afetados;
* validações executadas, se houver;
* pendências relevantes.

Não invente validações que não foram executadas.

## Quando atualizar documentação

Atualize docs quando a mudança afetar:

* arquitetura;
* fluxo de dados;
* modelo de conteúdo;
* decisão técnica;
* dependência;
* estrutura de pastas;
* regra de implementação;
* comportamento relevante de produto.

Não atualizar docs por mudanças triviais.

## Quando criar ADR

Crie ADR quando houver decisão relevante e durável, como:

* escolha de stack;
* mudança de arquitetura;
* adoção de dependência estrutural;
* mudança no CMS;
* mudança no padrão de renderização;
* introdução de backend, auth ou estado global.

## Quando pedir definição

Peça definição antes de avançar se:

* a documentação for contraditória;
* a decisão afetar arquitetura durável;
* houver risco de escopo alto;
* a mudança exigir nova dependência importante;
* a tarefa parecer reintroduzir complexidade antiga.

## O que fazer diante de lacunas

Se faltar informação:

1. Use a documentação existente.
2. Faça a menor suposição segura.
3. Registre a lacuna.
4. Evite decisões irreversíveis.
5. Não crie arquitetura grande para preencher vazio.

## Validações

Antes de finalizar implementação, verificar comandos disponíveis no projeto.

Possíveis comandos, se existirem:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

Não assuma que existem antes de verificar `package.json`.

## Critério de sucesso

O agente trabalha corretamente quando:

* lê docs antes de implementar;
* respeita decisões existentes;
* evita escopo não solicitado;
* mantém Notion isolado;
* preserva Server Components por padrão;
* usa CSS Modules;
* registra decisões relevantes;
* entrega mudanças pequenas, verificáveis e alinhadas ao produto.
