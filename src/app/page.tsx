"use client"

import { INVESTOR_ID_QUERY_PARAM } from "@/constants/common"
import { investmentsApi } from "@/lib/api-client"
import { InvestorData } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [data, setData] = useState<InvestorData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const investorId = searchParams.get(INVESTOR_ID_QUERY_PARAM) as string

  useEffect(() => {
    async function fetchInvestorData() {
      try {
        const response = await investmentsApi.getById(investorId)
        setData(response.data)
      } catch (err) {
        setError("Something went wrong. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchInvestorData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!data?.summary) return <p>No investor summary found.</p>

  const { summary, investments } = data

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Investor Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <ul className="list-disc list-inside">
          <li>Total Invested: {currencyFormatter.format(summary.total_invested_amount)}</li>
          <li>Portfolio Value: {currencyFormatter.format(summary.portfolio_value)}</li>
          <li>
            Distributions Received: {currencyFormatter.format(summary.distributions_received)}
          </li>
          <li>
            Outstanding Commitments: {currencyFormatter.format(summary.outstanding_commitments)}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Investments</h2>
        {investments.length === 0 ? (
          <p>No investments found.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300" role="table">
            <caption className="sr-only">Investor's investments overview</caption>
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Project</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Token Class</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Shares Owned</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Market Value</th>
                <th className="border border-gray-300 px-4 py-2 text-right">ROI %</th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Next Distribution Date
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id}>
                  <td className="border border-gray-300 px-4 py-2">{inv.project_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{inv.token_class}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {inv.shares_owned}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {currencyFormatter.format(inv.market_value)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {inv.roi_percent.toFixed(2)}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(inv.next_distribution_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
