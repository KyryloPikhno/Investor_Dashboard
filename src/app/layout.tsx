import "./styles/globals.css"

import { Metadata } from "next"

export const metadata: Metadata = {
  description:
    "Investor Dashboard for a tokenization platform. View portfolio value, invested amount, ROI, and distribution insights with seamless frontend, backend, and database integration.",
  title: "Investor dashboard",
}

export const viewport = {
  initialScale: 1,
  width: "device-width",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className="p-4 flex items-center justify-center min-h-screen w-screen bg-gray-100"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
