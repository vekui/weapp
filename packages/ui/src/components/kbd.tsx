import { cn } from "../lib/cn"
import { Text, type TextProps } from "../primitives"

export type KbdProps = TextProps & {
  disabled?: boolean
}

export function Kbd({ className, disabled, ...props }: KbdProps) {
  return (
    <Text
      className={cn(
        "inline-flex min-h-[40rpx] items-center rounded-md border border-border bg-muted px-1.5 font-mono text-xs font-medium leading-[32rpx] text-muted-foreground",
        disabled && "opacity-70",
        className
      )}
      aria-disabled={disabled ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      {...props}
    />
  )
}
