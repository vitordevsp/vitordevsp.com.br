import { Heading, Paragraph } from ".."

export interface SkillCardProps {
  icon?: string
  title: string
  description?: string
}

export function SkillCard({ icon, title, description }: SkillCardProps) {
  return (
    <div className="skill-card flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <div style={{ background: "#494949" }} className="w-8 h-8 rounded-full"></div>

        <Heading as="h3" size="2xl">
          {title}
        </Heading>
      </div>

      <Paragraph>
        {description}
      </Paragraph>
    </div>
  )
}