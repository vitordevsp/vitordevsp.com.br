import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vitor Dev",
  description: "Site pessoal de Vitor Dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
