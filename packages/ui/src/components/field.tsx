import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type FieldRootProps = BoxProps & {
  invalid?: boolean
  disabled?: boolean
}

export type FieldDescriptionProps = TextProps
export type FieldErrorProps = TextProps

export function FieldRoot({ className, invalid, disabled, ...props }: FieldRootProps) {
  return (
    <Box
      className={cn("flex flex-col gap-2", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      {...props}
    />
  )
}

export function FieldLabel({ className, ...props }: TextProps) {
  return <Text className={cn("block text-sm font-medium text-foreground", className)} {...props} />
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text
      className={cn("block text-xs leading-[36rpx] text-muted-foreground", className)}
      {...props}
    />
  )
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return <Text className={cn("block text-xs leading-[36rpx] text-destructive", className)} {...props} />
}

export const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError
})
