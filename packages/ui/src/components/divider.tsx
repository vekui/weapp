import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type DividerProps = BoxProps & {
  orientation?: "horizontal" | "vertical"
}

export function Divider({
  className,
  children,
  orientation = "horizontal",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return <Box className={cn("h-full w-px bg-border", className)} data-orientation="vertical" {...props} />
  }

  return (
    <Box
      className={cn("flex min-h-[40rpx] flex-row items-center gap-2 border-border text-muted-foreground", className)}
      data-orientation="horizontal"
      {...props}
    >
      <Box className="h-px flex-1 bg-border" />
      {children ? <Text className="text-xs text-muted-foreground">{children}</Text> : null}
      <Box className="h-px flex-1 bg-border" />
    </Box>
  )
}
