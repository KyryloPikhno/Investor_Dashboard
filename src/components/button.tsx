import { ButtonVariant } from "@/constants/common"
import { ButtonProps } from "@/types/common"
import clsx from "clsx"

const baseStyles =
  "rounded-full p-4 transition hover:opacity-70 disabled:opacity-50 text-white text-center w-full"

export default function Button({
  children,
  disabled,
  className,
  loading = false,
  variant = ButtonVariant.Solid,
  ...props
}: ButtonProps) {
  const variantStyles = {
    [ButtonVariant.Solid]: "bg-black",
    [ButtonVariant.Outline]: "bg-black border border-white",
  }

  return (
    <button
      disabled={disabled || loading}
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}
