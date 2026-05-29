import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type FlexProps = BoxProps & {
  align?: "start" | "center" | "end" | "stretch"
  direction?: "row" | "column"
  justify?: "start" | "center" | "end" | "between" | "around"
  wrap?: boolean
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
}

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around"
}

export function Flex({
  align = "stretch",
  className,
  direction = "row",
  justify = "start",
  wrap,
  ...props
}: FlexProps) {
  return (
    <Box
      className={cn(
        "flex gap-2",
        direction === "row" ? "flex-row" : "flex-col",
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
      data-direction={direction}
      data-state="default"
      {...props}
    />
  )
}

export type FlexItemProps = BoxProps & {
  grow?: boolean
}

export function FlexItem({ className, grow, ...props }: FlexItemProps) {
  return <Box className={cn("min-h-[88rpx] rounded-md bg-secondary p-3", grow && "flex-1", className)} {...props} />
}
