"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import Button from "@/components/button"
import InvestorSummary from "@/components/investor-summary"
import { Skeleton } from "@/components/skeleton"
import SortableHeaderCell from "@/components/sortable-header-cell"
import {
  ButtonVariant,
  COLUMN_COUNT,
  ColumnType,
  FILTER_INITIAL_STATE,
  INVESTOR_ID,
  INVESTOR_ID_QUERY_PARAM,
  ROW_COUNT,
  SORT,
  TABLE_HEADERS,
  tdClassName,
} from "@/constants/common"
import { InvestorDataType, StatusStateType } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"
import { getSortDirectionLabel } from "@/utils/get-sort-direction-label"

export default function DashboardView() {
  const router = useRouter()

  const [status, setStatus] = useState<StatusStateType>({ error: null, loading: true })
  const [data, setData] = useState<InvestorDataType | null>(null)
  const [filters, setFilters] = useState(FILTER_INITIAL_STATE)
  const searchParams = useSearchParams()

  const investorId = searchParams.get(INVESTOR_ID_QUERY_PARAM) ?? INVESTOR_ID

  useEffect(() => {
    async function fetchInvestorData() {
      setStatus({ error: null, loading: true })

      try {
        const params = new URLSearchParams()
        if (filters.roiMin) params.append("roiMin", filters.roiMin.toString())
        if (filters.sortBy) params.append("sortBy", filters.sortBy)
        if (filters.sortDirection) params.append("sortDirection", filters.sortDirection)

        const response = await fetch(`/api/investments/${investorId}?${params.toString()}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Server error")
        }

        const data = await response.json()

        if (!data || !Array.isArray(data.investments)) {
          throw new Error("Invalid data format")
        }

        setData(data)
        setStatus({ error: null, loading: false })
      } catch (err: any) {
        setStatus({
          error: err.message || "Something went wrong. Please try again later.",
          loading: false,
        })
        setData(null)
      }
    }

    fetchInvestorData()
  }, [filters, investorId])

  if (status.error) return <h2 className="font-bold p-8 w-full h-screen">{status.error}</h2>

  if (!data?.investments.length && !status.loading)
    return (
      <div className="flex p-8 w-full h-screen gap-2">
        <h2 className="font-bold">No investor summary found.</h2>
        <button
          className="border-b h-5 cursor-pointer"
          onClick={() => router.push(`/?${INVESTOR_ID_QUERY_PARAM}=${INVESTOR_ID}`)}
          type="button"
        >{`Try to found investor with ${INVESTOR_ID} ID`}</button>
      </div>
    )

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
      <InvestorSummary loading={status.loading} summary={data?.summary ?? null} />

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
            {status.loading
              ? Array.from({ length: ROW_COUNT }, (_, i) => (
                  <tr key={i}>
                    {Array.from({ length: COLUMN_COUNT }, (_, j) => (
                      <td className={tdClassName} key={j}>
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))
              : data?.investments.map((inv) => (
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
      </div>
    </div>
  )
}
