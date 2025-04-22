import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TRPCProvider } from "@/providers/trpc-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Claude Chat",
  description: "AI Chat Interface with Next.js 14",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}