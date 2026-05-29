import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type SpinnerProps = BoxProps

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Box
      className={cn(
        "size-[40rpx] animate-spin rounded-full border-[4rpx] border-muted border-t-primary",
        className
      )}
      data-loading=""
      {...props}
    />
  )
}
