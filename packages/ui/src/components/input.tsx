import * as React from "react"
import { Input as TaroInput } from "@tarojs/components"
import { cn } from "../lib/cn"
import { controlBase, focusRing } from "../lib/variants"

export interface InputProps extends React.ComponentProps<typeof TaroInput> {
  invalid?: boolean
}

export function Input({ className, disabled, invalid = false, ...props }: InputProps) {
  return (
    <TaroInput
      className={cn(controlBase, focusRing, className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      disabled={disabled}
      {...props}
    />
  )
}
