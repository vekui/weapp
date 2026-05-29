import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type LoadingProps = BoxProps & {
  label?: string
}

export function Loading({ className, label = "Loading", ...props }: LoadingProps) {
  return (
    <Box
      className={cn("flex flex-row items-center justify-center gap-2 p-4", className)}
      data-loading=""
      {...props}
    >
      <Box className="size-[28rpx] animate-spin rounded-full border-2 border-muted border-t-primary" />
      <Text className="text-sm text-muted-foreground">{label}</Text>
    </Box>
  )
}
