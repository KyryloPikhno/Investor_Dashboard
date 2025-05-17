import { z } from "zod"

import { loginValidationSchema } from "@/validations/login-validation-schema"

export type InputFieldProps = {
  name: string
}

export type LoginFormType = z.infer<typeof loginValidationSchema>

type InvestorSummary = {
  total_invested_amount: number
  portfolio_value: number
  distributions_received: number
  outstanding_commitments: number
}

type Investment = {
  id: string
  project_name: string
  token_class: string
  shares_owned: number
  market_value: number
  roi_percent: number
  next_distribution_date: string
}

export type InvestorData = {
  summary: InvestorSummary | null
  investments: Investment[]
}
