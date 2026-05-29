import { cn } from "../lib/cn"
import { Text, type TextProps } from "../primitives"

export type LabelProps = TextProps & {
  required?: boolean
  disabled?: boolean
}

export function Label({ className, required, disabled, ...props }: LabelProps) {
  return (
    <Text
      className={cn(
        "text-sm font-medium leading-[40rpx] text-foreground",
        disabled && "text-muted-foreground",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-required={required ? "" : undefined}
      {...props}
    />
  )
}
