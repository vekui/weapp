import { cn } from "../lib/cn"
import { InputBase, type InputBaseProps } from "../primitives"

export type InputProps = InputBaseProps & {
  invalid?: boolean
}

export function Input({ className, disabled, invalid, ...props }: InputProps) {
  return (
    <InputBase
      className={cn(
        "min-h-[88rpx] rounded-md border border-input bg-background px-3 text-base text-foreground",
        invalid && "border-destructive",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      disabled={disabled}
      {...props}
    />
  )
}
