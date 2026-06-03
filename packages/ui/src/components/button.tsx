import * as React from "react"
import { Button as TaroButton, View as TaroView } from "@tarojs/components"
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
  formType,
  onClick,
  openType,
  shape = "default",
  children,
  ...props
}: ButtonProps) {
  const unavailable = Boolean(disabled || loading)
  const disabledOnPlainSurface = disabled && ["outline", "ghost", "link"].includes(String(variant ?? "default"))

  return (
    <TaroButton
      className={cn(
        buttonVariants({ variant, size }),
        full && "w-full",
        shape === "rounded" && "rounded-full",
        shape === "circle" && "rounded-full px-0",
        loading && "opacity-90",
        disabled && "opacity-70",
        disabledOnPlainSurface && "text-muted-foreground",
        className
      )}
      aria-disabled={unavailable ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      formType={unavailable ? undefined : formType}
      hoverClass="none"
      onClick={(event) => {
        if (unavailable) return

        onClick?.(event)
      }}
      openType={unavailable ? undefined : openType}
      {...props}
    >
      {loading ? (
        <TaroView
          className="size-[32rpx] shrink-0 animate-spin rounded-full border-[4rpx] border-current border-t-transparent"
          data-slot="button-spinner"
        />
      ) : null}
      {children}
    </TaroButton>
  )
}

export { buttonVariants }
