import { z } from "zod"

import { loginValidationSchema } from "@/validations/login-validation-schema"
import { Investment, InvestorSummary } from "@prisma/client"

export type InputFieldProps = {
  name: string
}

export type LoginFormType = z.infer<typeof loginValidationSchema>

export type InvestorDataType = {
  summary: InvestorSummary | null
  investments: Investment[]
}
