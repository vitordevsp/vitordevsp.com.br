import type { Metadata } from "next"
import { Fira_Sans } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { PageFooter, PageHeader } from "@/components"
import "@/styles/globals.scss"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
})

export const metadata: Metadata = {
  title: "Vitor Sampaio",
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
        <PageHeader />
        {children}
        <PageFooter />

        <Analytics />
        {GA_ID && (
          <GoogleAnalytics gaId={GA_ID} />
        )}
      </body>
    </html>
  )
}
