import { Skeleton } from "@/components/skeleton"
import { InvestorSummaryProps } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"

export default function InvestorSummary({ summary, loading }: InvestorSummaryProps) {
  const items = [
    { label: "Total Invested", value: summary?.total_invested_amount },
    { label: "Portfolio Value", value: summary?.portfolio_value },
    { label: "Distributions Received", value: summary?.distributions_received },
    { label: "Outstanding Commitments", value: summary?.outstanding_commitments },
  ]

  return (
    <div className="mt-8 mb-4">
      <div className="text-2xl font-semibold">Summary</div>
      <div className="border-t-black border w-full mb-4" />

      <div className="space-y-2">
        {items.map(({ label, value }) => (
          <div className="flex gap-2 items-center h-6" key={label}>
            • {label}:
            <span className="font-medium w-24 h-hull h-6">
              {loading ? <Skeleton /> : currencyFormatter.format(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
