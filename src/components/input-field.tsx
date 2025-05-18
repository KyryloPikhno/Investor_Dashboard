"use client"

import _ from "lodash"
import { useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"

import { InputFieldProps } from "@/types/common"

export default function InputField({ name }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const label = _.capitalize(name)
  const error = errors?.[name]?.message as string

  return (
    <div className="mb-4 relative">
      <label className="rounded-full block mb-1 text-sm font-medium absolute -top-2.5 left-8 bg-white px-2">
        {label}
      </label>

      <input
        type={name}
        {...register(name)}
        className={twMerge(
          "w-full border rounded-full p-4 shadow-md",
          error ? "border-red-500" : "border-gray-300",
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
