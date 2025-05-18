import { z } from "zod"

import { ColumnType } from "@/constants/common"
import { loginValidationSchema } from "@/validations/login-validation-schema"
import { Investment, InvestorSummary } from "@prisma/client"

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
