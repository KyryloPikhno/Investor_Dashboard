"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import Button from "@/components/button"
import InvestorSummary from "@/components/investor-summary"
import SortableHeaderCell from "@/components/sortable-header-cell"
import {
  ButtonVariant,
  ColumnType,
  FILTER_INITIAL_STATE,
  INVESTOR_ID_QUERY_PARAM,
  SORT,
  TABLE_HEADERS,
} from "@/constants/common"
import { investmentsApi } from "@/lib/api-client"
import { InvestorDataType, StatusStateType } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"
import { getSortDirectionLabel } from "@/utils/get-sort-direction-label"

const tdClassName = "border border-black px-4 py-2"

export default function DashboardView() {
  const [status, setStatus] = useState<StatusStateType>({ error: null, loading: true })
  const [data, setData] = useState<InvestorDataType | null>(null)
  const [filters, setFilters] = useState(FILTER_INITIAL_STATE)
  const searchParams = useSearchParams()

  const investorId = searchParams.get(INVESTOR_ID_QUERY_PARAM) as string

  useEffect(() => {
    async function fetchInvestorData() {
      if (!data) {
        setStatus({ error: null, loading: true })
      }

      try {
        const response = await investmentsApi.getById(investorId, filters)
        setData(response.data)
        setStatus({ error: null, loading: false })
      } catch {
        setStatus({ error: "Something went wrong. Please try again later.", loading: false })
      }
    }

    fetchInvestorData()
  }, [filters, investorId])

  if (status.loading) return <h2 className="font-bold p-8 w-full h-screen">Loading...</h2>
  if (status.error) return <h2 className="font-bold p-8 w-full h-screen">{status.error}</h2>
  if (!data?.summary)
    return <h2 className="font-bold p-8 w-full h-screen">No investor summary found.</h2>

  const { summary, investments } = data

  const toggleSort = (column: ColumnType) =>
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortDirection:
        prev.sortBy === column && prev.sortDirection === SORT.ASC ? SORT.DESC : SORT.ASC,
    }))

  const isResetFilter = filters.roiMin || filters.sortBy
  const sortLabel =
    TABLE_HEADERS.find((header) => header.key === filters.sortBy)?.label ?? filters.sortBy

  return (
    <div className="w-full">
      <InvestorSummary summary={summary} />

      <div>
        <div className="flex mb-4 items-center justify-between h-20">
          <div className="text-2xl font-semibold">Investments</div>

          <AnimatePresence>
            {isResetFilter && (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex items-center gap-4"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key="filter-panel"
                transition={{ duration: 0.2 }}
              >
                <div className="font-medium">Filter:</div>
                {filters.sortBy && (
                  <div className="bg-gray-200 text-black p-2 rounded-full text-sm">
                    Sort by: {sortLabel} (
                    {getSortDirectionLabel(filters.sortBy, filters.sortDirection)})
                  </div>
                )}

                <div>
                  <Button
                    onClick={() => setFilters(FILTER_INITIAL_STATE)}
                    type="button"
                    variant={ButtonVariant.Solid}
                  >
                    Reset filter
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!investments.length ? (
          <p>No investments found.</p>
        ) : (
          <table className="w-full mb-16 table-auto border-collapse" role="table">
            <caption className="sr-only">Investor&apos;s investments overview</caption>
            <thead>
              <tr>
                {TABLE_HEADERS.map(({ label, key }) => (
                  <SortableHeaderCell
                    dataKey={key}
                    filters={filters}
                    header={label}
                    key={label}
                    toggleSort={toggleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id}>
                  <td className={tdClassName}>{inv.project_name}</td>
                  <td className={tdClassName}>{inv.token_class}</td>
                  <td className={tdClassName}>{inv.shares_owned}</td>
                  <td className={tdClassName}>{currencyFormatter.format(inv.market_value)}</td>
                  <td className={tdClassName}>{inv.roi_percent.toFixed(2)}%</td>
                  <td className={tdClassName}>
                    {new Date(inv.next_distribution_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
