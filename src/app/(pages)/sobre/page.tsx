import { Heading, PageContainer, Paragraph } from "@/components"
import "./style.scss"

export default function AboutPage() {
  return (
    <PageContainer className="about-page">
      <section className="about-page__header">
        <Heading as="h1">
          Aprendendo, construindo e ensinando!
        </Heading>

        {/* <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph> */}
      </section>

      <section className="about-page__content-linkedin">
        <Paragraph>
          Seja bem-vindo. Sou um desenvolvedor de software full-stack com mais de 5 anos de experiência, com foco no desenvolvimento web e atualmente na linguagem JavaScript (TypeScript).

          <br />
          <br />
          <br />

          Iniciei minha carreira como desenvolvedor autônomo, trabalhando em projetos freelance e criando produtos. Sempre tive uma visão empreendedora e uma vontade constante de criar e inovar. Por isso, possuo um perfil intraempreendedor e estou sempre observando e analisando como posso contribuir com ideias para a melhoria do ambiente em que estou inserido.

          <br />
          <br />
          <br />

          Meus interesses e conhecimentos vão além do código. Tenho um grande apreço pelo desenvolvimento de produtos como um todo e pela colaboração com os membros da minha equipe. Valorizo as trocas de conhecimento com os integrantes e acredito que trabalhando em conjunto podemos elevar o nível do time.

          <br />
          <br />
          <br />

          Sou ágil em aprender novas habilidades e me adapto facilmente a novos ambientes e tarefas. Além disso, possuo conhecimentos em UI/UX e busco sempre aprender mais sobre posições como Product Owner, Tech Lead e gerenciamento de times e produtos.

          <br />
          <br />
          <br />

          Para conhecer mais sobre o meu trabalho, você pode visitar o meu site em vitordevsp.com.br e meu GitHub github.com/vitordevsp. Também tenho outro projeto em andamento que desenvolvi para gerenciar minhas finanças e para fins de estudo, o qual você pode acessar em my-finances.app.
        </Paragraph>
      </section>

      {/* <section className="about-page__content">
        <div className="about-page__content__section">
          <div className="about-page__content__section__title">
            <Heading
              as="h2"
              size="2xl"
            >
              Intro x
            </Heading>
          </div>

          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br />
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            <br />
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>
        </div>

        <div className="about-page__content__section">
          <div className="about-page__content__section__title">
            <Heading
              as="h2"
              size="2xl"
            >
              Primeiro contato com a internet
            </Heading>
          </div>

          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br />
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            <br />
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>
        </div>

        <div className="about-page__content__section">
          <div className="about-page__content__section__title">
            <Heading
              as="h2"
              size="2xl"
            >
              Primeiro contato com a internet
            </Heading>
          </div>

          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br />
            Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            <br />
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>
        </div>
      </section> */}
    </PageContainer>
  )
}
