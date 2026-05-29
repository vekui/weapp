import * as React from "react"
import { Form as TaroForm } from "@tarojs/components"

import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type FormProps = React.ComponentProps<typeof TaroForm> & {
  invalid?: boolean
}

function FormRoot({ className, invalid, ...props }: FormProps) {
  return (
    <TaroForm
      className={cn("flex flex-col gap-3", className)}
      data-invalid={invalid ? "" : undefined}
      data-state={invalid ? "invalid" : "default"}
      {...props}
    />
  )
}

export type FormItemProps = BoxProps & {
  invalid?: boolean
}

function FormItem({ className, invalid, ...props }: FormItemProps) {
  return (
    <Box
      className={cn("flex flex-col gap-2", className)}
      data-invalid={invalid ? "" : undefined}
      data-state={invalid ? "invalid" : "default"}
      {...props}
    />
  )
}

export type FormActionsProps = BoxProps

function FormActions({ className, ...props }: FormActionsProps) {
  return <Box className={cn("flex flex-row gap-2", className)} {...props} />
}

export const Form = Object.assign(FormRoot, {
  Actions: FormActions,
  Item: FormItem
})
