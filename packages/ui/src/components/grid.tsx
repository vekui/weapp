import { cn } from "../lib/cn"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type GridColumns = 2 | 3 | 4

const gridColumnClasses: Record<GridColumns, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}

export function getGridColumnClass(columns: GridColumns): string {
  return gridColumnClasses[columns]
}

export type GridProps = BoxProps & {
  columns?: GridColumns
}

export function Grid({ className, columns = 3, ...props }: GridProps) {
  return <Box className={cn("grid gap-2", getGridColumnClass(columns), className)} {...props} />
}

export type GridItemProps = PressableProps & {
  selected?: boolean
}

export function GridItem({ className, selected, disabled, ...props }: GridItemProps) {
  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-col items-center justify-center gap-2 rounded-md border border-border bg-card p-3 text-center text-foreground",
        selected && "border-primary bg-secondary",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-state={selected ? "selected" : "default"}
      disabled={disabled}
      {...props}
    />
  )
}
