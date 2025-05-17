"use client"

import InputField from "@/components/input-field"
import { INVESTOR_ID, INVESTOR_ID_QUERY_PARAM } from "@/constants/common"
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
    Cookies.set("token", `fake-${data.email}-token-123`)

    // After setting the token, navigate to the Dashboard page + investor ID in params.
    router.push(`/?${INVESTOR_ID_QUERY_PARAM}=${INVESTOR_ID}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <form
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl mb-6 text-center font-semibold">Login</h2>

          <InputField name="email" />
          <InputField name="password" />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
