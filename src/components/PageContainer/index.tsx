import "./style.css"

interface PageContainerProps extends React.HTMLProps<HTMLElement> {
  children: React.ReactNode
}

export function PageContainer({ children, className, ...rest }: PageContainerProps) {
  return (
    <main className={`page-container ${className}`} {...rest}>
      {children}
    </main>
  )
}
