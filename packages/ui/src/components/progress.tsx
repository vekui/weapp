import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type ProgressProps = BoxProps & {
  value?: number
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, value))
}

export function Progress({ className, value = 0, ...props }: ProgressProps) {
  const currentValue = clampProgress(value)

  return (
    <Box
      className={cn("h-[16rpx] overflow-hidden rounded-full bg-muted", className)}
      data-value={currentValue}
      {...props}
    >
      <Box className="h-full rounded-full bg-primary" style={{ width: `${currentValue}%` }} />
    </Box>
  )
}
