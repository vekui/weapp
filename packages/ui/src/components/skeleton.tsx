import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export function Skeleton({ className, ...props }: BoxProps) {
  return <Box className={cn("rounded-md bg-muted opacity-70", className)} {...props} />
}
