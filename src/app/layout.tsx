import "./globals.css"

import { Metadata } from "next"

export const metadata: Metadata = {
  description:
    "Investor Dashboard for a tokenization platform. View portfolio value, invested amount, ROI, and distribution insights with seamless frontend, backend, and database integration.",
  title: "Investor dashboard",
  viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
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
