import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type DataListRootProps = BoxProps

function DataListRoot({ className, ...props }: DataListRootProps) {
  return (
    <Box
      className={cn("overflow-hidden rounded-md border border-border bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

export type DataListItemProps = BoxProps & {
  label?: string
  value?: string
  state?: "default" | "muted"
}

function DataListItem({ className, label, value, state = "default", children, ...props }: DataListItemProps) {
  return (
    <Box
      className={cn(
        "flex min-h-[72rpx] flex-row items-start justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0",
        state === "muted" && "bg-muted",
        className
      )}
      data-state={state}
      {...props}
    >
      {children ?? (
        <>
          <Text className="text-sm text-muted-foreground">{label}</Text>
          <Text className="text-sm font-medium text-foreground">{value}</Text>
        </>
      )}
    </Box>
  )
}

export type DataListLabelProps = TextProps

function DataListLabel({ className, ...props }: DataListLabelProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export type DataListValueProps = TextProps

function DataListValue({ className, ...props }: DataListValueProps) {
  return <Text className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

export const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue
}
