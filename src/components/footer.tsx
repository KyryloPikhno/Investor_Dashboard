"use client"

export const Footer = () => {
  return (
    <div className="text-white h-75 bg-black flex flex-col justify-center p-4 rounded-lg">
      <div className="mb-1 font-semibold">Implemented Features:</div>
      <ul className="list-disc list-inside space-y-1">
        <li>Login form with fake token auth using js-cookie</li>
        <li>Investor Dashboard with Prisma + PostgreSQL integration</li>
        <li>Display of 4 summary metrics + investments table</li>
        <li>Sorting & filtering by ROI and distribution date</li>
        <li>Used TailwindCSS + Next.js App Router</li>
        <li>Middleware protection for dashboard route</li>
        <li>Some components partially generated using Cursor AI</li>
        <li>Scalable project structure with clear folder organization</li>
      </ul>
    </div>
  )
}
