import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type SafeAreaEdge = "top" | "bottom" | "both"

export function getSafeAreaClass(edge: SafeAreaEdge) {
  if (edge === "top") return "pt-[env(safe-area-inset-top)]"
  if (edge === "bottom") return "pb-[env(safe-area-inset-bottom)]"
  return "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
}

export type SafeAreaProps = BoxProps & {
  edge?: SafeAreaEdge
}

export function SafeArea({ className, edge = "bottom", ...props }: SafeAreaProps) {
  return <Box className={cn(getSafeAreaClass(edge), className)} data-edge={edge} {...props} />
}
