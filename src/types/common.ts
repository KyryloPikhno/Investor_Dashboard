import { z } from "zod"

import { loginValidationSchema } from "@/validations/login-validation-schema"

export type InputFieldProps = {
  name: string
}

export type LoginFormType = z.infer<typeof loginValidationSchema>
