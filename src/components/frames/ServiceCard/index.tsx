import { Heading, Paragraph } from "@/components"
import "./style.scss"

export interface ServiceCardProps {
  title: string
  description?: string
}

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="service-card">
      <Heading as="h3" size="2xl">
        {title}
      </Heading>

      <Paragraph>
        {description}
      </Paragraph>
    </div>
  )
}
