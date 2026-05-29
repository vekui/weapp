import * as React from "react"
import { Button as TaroButton } from "@tarojs/components"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { buttonVariants } from "./button-variants"

export type ButtonShape = "default" | "rounded" | "circle"

export type ButtonProps = Omit<React.ComponentProps<typeof TaroButton>, "size"> &
  VariantProps<typeof buttonVariants> & {
    full?: boolean
    loading?: boolean
    shape?: ButtonShape
  }

export function Button({
  className,
  variant,
  size,
  full,
  loading,
  disabled,
  shape = "default",
  children,
  ...props
}: ButtonProps) {
  return (
    <TaroButton
      className={cn(
        buttonVariants({ variant, size }),
        full && "w-full",
        shape === "rounded" && "rounded-full",
        shape === "circle" && "rounded-full px-0",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      disabled={disabled || loading}
      hoverClass="none"
      loading={loading}
      {...props}
    >
      {children}
    </TaroButton>
  )
}

export { buttonVariants }
