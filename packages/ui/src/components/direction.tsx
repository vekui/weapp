import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type DirectionValue = "ltr" | "rtl"

export function getDirectionState(dir: DirectionValue = "ltr"): DirectionValue {
  return dir
}

export type DirectionRootProps = BoxProps & {
  dir?: DirectionValue
}

function DirectionRoot({ className, dir = "ltr", ...props }: DirectionRootProps) {
  return (
    <Box
      className={cn("flex", dir === "rtl" ? "flex-row-reverse" : "flex-row", className)}
      data-dir={getDirectionState(dir)}
      {...props}
    />
  )
}

export const Direction = {
  Root: DirectionRoot,
  Provider: DirectionRoot
}
