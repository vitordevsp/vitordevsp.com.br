import { Heading, PageContainer, Paragraph } from "@/components"

export default function AboutPage() {
  return (
    <PageContainer className="flex flex-col items-center py-20 gap-20">
      <section className="flex flex-col gap-8 text-center max-w-3xl">
        <Heading as="h1">
          Aprendendo, construindo e ensinando!
        </Heading>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.
        </Paragraph>
      </section>

      <section className="flex flex-col gap-20">
        <div className="flex gap-16">
          <div className="w-96 min-w-96">
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

        <div className="flex gap-16">
          <div className="w-96 min-w-96">
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

        <div className="flex gap-16">
          <div className="w-96 min-w-96">
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
      </section>
    </PageContainer>
  )
}
