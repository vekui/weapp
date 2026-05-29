import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type TableRootProps = BoxProps

function TableRoot({ className, ...props }: TableRootProps) {
  return (
    <Box
      className={cn("overflow-hidden rounded-md border border-border bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

export type TableRowProps = BoxProps & {
  selected?: boolean
}

function TableRow({ className, selected, ...props }: TableRowProps) {
  return (
    <Box
      className={cn("flex min-h-[72rpx] flex-row border-b border-border last:border-b-0", selected && "bg-accent", className)}
      data-state={selected ? "selected" : "default"}
      {...props}
    />
  )
}

export type TableHeaderProps = BoxProps

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <Box className={cn("bg-muted", className)} {...props} />
}

export type TableCellProps = TextProps

function TableCell({ className, ...props }: TableCellProps) {
  return <Text className={cn("flex-1 px-3 py-2 text-sm text-foreground", className)} {...props} />
}

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Row: TableRow,
  Cell: TableCell
}
