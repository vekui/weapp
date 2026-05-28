import * as React from "react"
import { Button as TaroButton } from "@tarojs/components"
import type { VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"
import { buttonVariants } from "../lib/variants"

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof TaroButton>, "size">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function Button({
  className,
  disabled,
  loading = false,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <TaroButton
      className={cn(buttonVariants({ variant, size }), className)}
      data-disabled={disabled ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      disabled={disabled || loading}
      loading={loading}
      {...props}
    />
  )
}
