"use client"

import InputField from "@/components/input-field"
import { INVESTOR_ID, TOKEN_KEY } from "@/constants/common"
import { LoginFormType } from "@/types/common"
import { loginValidationSchema } from "@/validations/login-validation-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { useLocalStorage } from "react-use"

export default function LoginPage() {
  const [, setToken] = useLocalStorage(TOKEN_KEY, "")
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
    setToken(`fake-${data.email}-token-123`)

    // After setting the token, navigate to the Dashboard page.
    router.push(`/?investor-id=${INVESTOR_ID}`)
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
