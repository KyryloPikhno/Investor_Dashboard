"use client"

import { InputFieldProps } from "@/types/common"
import _ from "lodash"
import { useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export default function InputField({ name }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const label = _.capitalize(name)
  const error = errors?.[name]?.message as string

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <input
        type={name}
        {...register(name)}
        className={twMerge(
          "w-full border rounded px-3 py-2",
          error ? "border-red-500" : "border-gray-300",
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
