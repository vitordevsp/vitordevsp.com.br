import "./style.css"

interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="page-container">
      {children}
    </main>
  )
}
