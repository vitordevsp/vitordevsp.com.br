import "./style.css"

interface PageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="page-container">
      {children}
    </main>
  )
}
