import { classMerge } from "@/utils/helpers"
import "./style.scss"

interface PageContainerProps extends React.HTMLProps<HTMLElement> {
  children: React.ReactNode
}

export function PageContainer({ children, className, ...rest }: PageContainerProps) {
  const classMerged = classMerge([
    "page-container",
    className,
  ])
  return (
    <main className={classMerged} {...rest}>
      {children}
    </main>
  )
}
