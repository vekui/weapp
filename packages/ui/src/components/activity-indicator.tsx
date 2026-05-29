import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"
import { Spinner } from "./spinner"

export type ActivityIndicatorProps = BoxProps & {
  text?: string
}

export function ActivityIndicator({ className, text, ...props }: ActivityIndicatorProps) {
  return (
    <Box
      className={cn("inline-flex min-h-[48rpx] self-start flex-row items-center gap-2 text-muted-foreground", className)}
      data-state="loading"
      {...props}
    >
      <Spinner className="size-[32rpx]" />
      {text ? <Text className="text-sm text-muted-foreground">{text}</Text> : null}
    </Box>
  )
}
