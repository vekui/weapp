import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type AspectRatioProps = BoxProps & {
  ratio?: number
}

export function getAspectRatioPadding(width: number, height: number) {
  return `${(height / width) * 100}%`
}

function getAspectRatioLabel(ratio: number) {
  if (Math.abs(ratio - 16 / 9) < 0.0001) return "16:9"
  if (Math.abs(ratio - 4 / 3) < 0.0001) return "4:3"
  if (Math.abs(ratio - 1) < 0.0001) return "1:1"
  return `${Number(ratio.toFixed(4))}:1`
}

function getAspectRatioPaddingFromRatio(ratio: number) {
  return `${100 / ratio}%`
}

export function AspectRatio({
  className,
  ratio = 16 / 9,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <Box
      className={cn("relative w-full overflow-hidden rounded-md bg-muted", className)}
      data-ratio={getAspectRatioLabel(ratio)}
      style={{ paddingBottom: getAspectRatioPaddingFromRatio(ratio) }}
      {...props}
    >
      <Box className="absolute inset-0">{children}</Box>
    </Box>
  )
}
