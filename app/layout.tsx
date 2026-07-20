import type { Metadata } from "next"
import { Outfit, Cinzel_Decorative } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Web3Provider } from "./providers"
import { Header } from "@/components/header"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
})

export const viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Electroquest - Prosperity Through Knowledge",
  description: "Embark on a digital journey to master the Celo ecosystem and unlock prosperity.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "talentapp:project_verification": "dfd51781268faf7f47b61393f40de4f9a2d4f567d157f3839bcfae2121a7ff2a6c01c79390c9507cc7b77bdc025d31d945b4b4feec43ffbb02503bdb97f8b7a7",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${cinzelDecorative.variable} font-sans antialiased`} suppressHydrationWarning>
        <Web3Provider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 animate-page-fade-in">
              {children}
            </main>
          </div>
          <Analytics />
        </Web3Provider>
      </body>
    </html>
  )
}
