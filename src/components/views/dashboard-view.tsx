"use client"

import SortableHeaderCell from "@/components/sortable-header-cell"
import { ColumnType, INVESTOR_ID_QUERY_PARAM, SORT, TABLE_HEADERS } from "@/constants/common"
import { investmentsApi } from "@/lib/api-client"
import { InvestorDataType } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardView() {
  const [data, setData] = useState<InvestorDataType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sortDirection: SORT.ASC,
    roiMin: SORT.ASC,
    sortBy: "",
  })

  const searchParams = useSearchParams()

  const investorId = searchParams.get(INVESTOR_ID_QUERY_PARAM) as string

  useEffect(() => {
    async function fetchInvestorData() {
      try {
        const response = await investmentsApi.getById(investorId, filters)
        setData(response.data)
      } catch {
        setError("Something went wrong. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchInvestorData()
  }, [filters, investorId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!data?.summary) return <p>No investor summary found.</p>

  const { summary, investments } = data

  const toggleSort = (column: ColumnType) =>
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortDirection:
        prev.sortBy === column && prev.sortDirection === SORT.ASC ? SORT.DESC : SORT.ASC,
    }))

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
                {TABLE_HEADERS.map(({ label, key }) => (
                  <SortableHeaderCell
                    key={label}
                    dataKey={key}
                    header={label}
                    filters={filters}
                    toggleSort={toggleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id}>
                  <td className="border border-gray-300 px-4 py-2">{inv.project_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{inv.token_class}</td>
                  <td className="border border-gray-300 px-4 py-2">{inv.shares_owned}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {currencyFormatter.format(inv.market_value)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
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
