import type { Metadata } from "next"
import { Fira_Sans } from "next/font/google"
import { Footer, Header } from "@/components"
import "./globals.css"

const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
})

export const metadata: Metadata = {
  title: "Vitor DevSP",
  description: "Blog pessoal.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={firaSans.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
