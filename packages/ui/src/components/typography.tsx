import { cn } from "../lib/cn"
import { Text, type TextProps } from "../primitives"

function H1({ className, ...props }: TextProps) {
  return <Text className={cn("text-2xl font-semibold leading-[64rpx] text-foreground", className)} {...props} />
}

function H2({ className, ...props }: TextProps) {
  return <Text className={cn("text-xl font-semibold leading-[56rpx] text-foreground", className)} {...props} />
}

function H3({ className, ...props }: TextProps) {
  return <Text className={cn("text-lg font-medium leading-[48rpx] text-foreground", className)} {...props} />
}

function P({ className, ...props }: TextProps) {
  return <Text className={cn("text-base leading-[48rpx] text-foreground", className)} {...props} />
}

function Muted({ className, ...props }: TextProps) {
  return <Text className={cn("text-sm leading-[40rpx] text-muted-foreground", className)} {...props} />
}

export const Typography = {
  H1,
  H2,
  H3,
  P,
  Muted
}
