import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export interface FieldProps extends React.ComponentProps<typeof View> {
  invalid?: boolean
}

export function Field({ className, invalid = false, ...props }: FieldProps) {
  return (
    <View
      className={cn("gap-2", className)}
      data-invalid={invalid ? "true" : undefined}
      {...props}
    />
  )
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

export function FieldDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-xs text-muted-foreground", className)} {...props} />
}

export function FieldError({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-xs text-destructive", className)} {...props} />
}
