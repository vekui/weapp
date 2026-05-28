import * as React from "react"
import { Textarea as TaroTextarea } from "@tarojs/components"
import { cn } from "../lib/cn"
import { controlBase, focusRing } from "../lib/variants"

export interface TextareaProps extends React.ComponentProps<typeof TaroTextarea> {
  invalid?: boolean
}

export function Textarea({ className, disabled, invalid = false, ...props }: TextareaProps) {
  return (
    <TaroTextarea
      className={cn(controlBase, focusRing, "min-h-[176rpx]", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      disabled={disabled}
      {...props}
    />
  )
}
