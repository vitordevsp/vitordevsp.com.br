## 🎯 Objetivo do Projeto

O projeto tem como objetivo ser um ponto central do meu trabalho. No meu site listo minhas redes sociais, os vídeos que gravo para o YouTube, os artigos que escrevo no [Dev.to](http://dev.to) e os projetos open source que tenho no GitHub.

## 📃 Sobre

Sempre trabalhei criando projetos para terceiros e agora realizei um dos meus maiores desejos: criar um site próprio e colocá-lo no ar. Esse é um dos primeiros projetos realmente meus e outros estão por vir.

Acredito que a melhor maneira de aprender é ensinando, com isso, para reforçar meus conhecimentos e ir para o próximo nível, comecei a criar vídeos para o [YouTube](https://www.youtube.com/channel/UCFIHeoKduKPsE2m1oSiK9Mg) e a escrever artigos para o [Dev.to](https://dev.to/vitordevsp).

Não faria muito sentido ter que modificar manualmente o site para conter os novos conteúdos que criei, por isso quis centralizar o conteúdo que venho criando no meu site de maneira automatizada.

Em um primeiro momento, pensei em fazer um blog integrado, mas não consegui enxergar grandes ganhos nessa prática, então decidi usar o Medium. Não tive uma boa experiência com o editor e nem com a API deles, então decidi testar uma rede social que já estava há um tempo no meu radar: o [dev.to](http://dev.to), uma rede social open source para programadores. O editor dele aceita Markdown (o que facilita muito) e não tive problemas com a API pública.

Também pude colocar em prática nesse projeto um desejo antigo que era trabalhar com a API do YouTube (não foi uma boa experiência). Esperava mais da API, a documentação não é boa, é desatualizada e nada intuitiva, contendo muito texto e dificultando o entendimento. Eu realmente não esperava por isso. Pra piorar, me deparei com um Bug no meio do caminho, gerado por uma inconsistência na API.

Escolhi fazer o projeto com o Next.js (estou fazendo todos os meus projetos mais recentes com ele) e a experiência de desenvolvimento é muito melhor do que usar o [CRA](https://create-react-app.dev/), além de fazer total sentido usá-lo nesse cenário. O ideal é ter as informações de forma estática no site, pois o conteúdo irá mudar algumas vezes na semana e isso vai garantir que o conteúdo já esteja disponível para o usuário quando ele acessar.

Usando o Next eu coloquei as páginas para serem geradas de maneira dinâmica em intervalos de 1h. Para fazer as buscas no YouTube é necessário gerar uma chave, e com o Next eu consigo manter essa chave em segurança no back-end da aplicação.

O mesmo serve para o Typescript. No começo eu não gostava dele, agora ele me protege de mim mesmo. Você pode conferir um artigo que escrevi sobre o Next e o TS clicando [AQUI](https://dev.to/vitordevsp/iniciando-um-projeto-com-next-js-e-typescript-58jo).

Para criar a interface gráfica, utilizei a biblioteca ChakraUI, que é extremamente interessante. Ela utiliza do conceito de CSS-in-JS, o que acaba deixando o código um pouco mais verboso e isso não me agradou um pouco no início. Porém, com a componentização, esse problema foi resolvido.

Uma das coisas que mais me encantou nessa lib foi a maneira como ela lida com a responsividade, é muito simples e prático. Diferente do tailwind, que usa classes para estilizar os elementos, no Chakra passamos as propriedades do CSS como propriedades do próprio elemento e isso não te deixa engessado, preso nos padrões da lib. Além disso, é bem mais prático de ler e escrever o CSS do elemento do que usando classes.

O Chakra traz componentes e hooks que agilizam muito o desenvolvimento, em breve vou escrever um post sobre essa lib e linkar aqui.

## 🚀 Tecnologias Utilizadas

* [Node.js](https://nodejs.org/en/)
* [Next.js](https://nextjs.org/docs/getting-started)
* [React.js](https://pt-br.reactjs.org/)
* [ChakraUI](https://chakra-ui.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Commitlint, Husky e Commitizen](https://dev.to/vitordevsp/padronizacao-de-commit-com-commitlint-husky-e-commitizen-3g1n) - Artigo
* [ESLint](https://eslint.org/)
* [React Icons](https://react-icons.github.io/react-icons/)

## ⚙️ Requisitos

* [Git](https://git-scm.com/) (Para clonar, opcional)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) OU [Npm](https://www.npmjs.com/)

## ▶️ Rodar o Projeto

* Primeiro passo, clone o projeto em sua máquina
* Abra a pasta do projeto no terminal
* Instale as dependências - `yarn` ou `npm i`
* Duplique o arquivo `.env.example` com o nome `.env.local`
* Insira o Username do GitHub e Dev.to
* Será necessário o ID no canal do youtube e de uma chave (que precisa ser gerada no GCP, [doc do youtube aqui](https://developers.google.com/youtube/v3/docs)), que será utilizada para fazer as buscas dos vídeos na API
* Com as variáveis de ambiente configuradas, inicie o servidor com o comando `yarn dev` ou `npm run dev`
* Abra uma aba no navegador e navegue para [http://localhost:3000/](http://localhost:3000/)

## ⌨️ Resultado

🛰️ **Hospedagem:** [vitordevsp.com.br](https://www.vitordevsp.com.br/)

## 🧑🏽‍💻 Redes Sociais

<a href="https://www.youtube.com/channel/UCFIHeoKduKPsE2m1oSiK9Mg" target="_blank">
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="youtube" />
</a>

<a href="https://www.linkedin.com/in/vitordevsp" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="instagram" />
</a>

<a href="https://www.instagram.com/vitordevsp" target="_blank">
  <img src="https://img.shields.io/badge/Instagram-e64d5a?style=for-the-badge&logo=instagram&logoColor=white" alt="instagram" />
</a>

---

<h5 align='center' >
  Feito com 💙 por <a href="https://vitordevsp.com.br" target="_blank">Vitor DevSP</a>
</h5>
