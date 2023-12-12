import { Heading, Paragraph } from ".."

export interface ServiceCardProps {
  title: string
  description?: string
}

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="skill-card flex flex-col gap-2 text-center">
      <Heading as="h3" size="2xl">
        {title}
      </Heading>

      <Paragraph>
        {description}
      </Paragraph>
    </div>
  )
}
