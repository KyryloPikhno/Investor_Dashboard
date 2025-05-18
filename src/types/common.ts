import { Investment, InvestorSummary } from "@prisma/client"
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"
import { z } from "zod"

import { ButtonVariant, ColumnType } from "@/constants/common"
import { loginValidationSchema } from "@/validations/login-validation-schema"

export type InputFieldProps = {
  name: string
}

export type LoginFormType = z.infer<typeof loginValidationSchema>

export type InvestorDataType = {
  investments: Investment[]
  summary: InvestorSummary | null
}

type FilterType = {
  sortBy: string
  roiMin: string
  sortDirection: string
}

export type SortableHeaderCellProps = {
  header: string
  filters: FilterType
  dataKey: string | undefined
  toggleSort: (column: ColumnType) => void
}

export type StatusStateType = {
  error: string | null
  loading: boolean
}

export type InvestorSummaryProps = {
  summary: {
    portfolio_value: number
    total_invested_amount: number
    distributions_received: number
    outstanding_commitments: number
  }
}

export type ButtonProps = {
  loading?: boolean
  children: ReactNode
  variant?: ButtonVariant
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
