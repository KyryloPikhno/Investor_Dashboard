import { InvestorSummaryProps } from "@/types/common"
import { currencyFormatter } from "@/utils/currency-formatter"

export default function InvestorSummary({ summary }: InvestorSummaryProps) {
  return (
    <div className="mt-8 mb-4">
      <div className="text-2xl font-semibold">Summary</div>
      <div className="border-t-black border w-full mb-4" />
      <ul className="list-disc list-inside">
        <li>
          Total Invested:{" "}
          <span className="font-medium">
            {currencyFormatter.format(summary.total_invested_amount)}
          </span>
        </li>
        <li>
          Portfolio Value:{" "}
          <span className="font-medium">{currencyFormatter.format(summary.portfolio_value)}</span>
        </li>
        <li>
          Distributions Received:{" "}
          <span className="font-medium">
            {currencyFormatter.format(summary.distributions_received)}
          </span>
        </li>
        <li>
          Outstanding Commitments:{" "}
          <span className="font-medium">
            {currencyFormatter.format(summary.outstanding_commitments)}
          </span>
        </li>
      </ul>
    </div>
  )
}
