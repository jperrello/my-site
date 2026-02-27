import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Joey Perrello",
  description:
    "Software Engineer — Networking, service discovery, and AI infrastructure",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
