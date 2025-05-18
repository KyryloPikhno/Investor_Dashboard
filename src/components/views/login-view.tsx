"use client"

import Button from "@/components/button"
import InputField from "@/components/input-field"
import { INVESTOR_ID, INVESTOR_ID_QUERY_PARAM, TOKEN_KEY } from "@/constants/common"
import { LoginFormType } from "@/types/common"
import { loginValidationSchema } from "@/validations/login-validation-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"

export default function LoginView() {
  const router = useRouter()

  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginValidationSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data: LoginFormType) => {
    // As per the task requirements, this onSubmit is implemented without real backend authentication.
    // We simply log the form data and set a "fake" token explicitly
    // to simulate a successful user login.
    Cookies.set(TOKEN_KEY, `fake-${data.email}-token-123`)

    // After setting the token, navigate to the Dashboard page + investor ID in params.
    router.push(`/?${INVESTOR_ID_QUERY_PARAM}=${INVESTOR_ID}`)
  }

  return (
    <FormProvider {...methods}>
      <form className="rounded w-full max-w-sm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl mb-6 text-center font-semibold">Login</h2>

        <InputField name="email" />
        <InputField name="password" />

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </FormProvider>
  )
}
