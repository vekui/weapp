import { cn } from "../lib/cn"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type ListItemState = "default" | "selected" | "disabled"

export function getListItemState({
  selected,
  disabled
}: {
  selected?: boolean
  disabled?: boolean
}): ListItemState {
  if (disabled) return "disabled"
  if (selected) return "selected"
  return "default"
}

export type ListProps = BoxProps

export function List({ className, ...props }: ListProps) {
  return (
    <Box
      className={cn(
        "overflow-hidden rounded-md border border-border bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

export type ListItemProps = PressableProps & {
  selected?: boolean
}

export function ListItem({ className, selected, disabled, ...props }: ListItemProps) {
  const state = getListItemState({ selected, disabled })

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center justify-between gap-3 border-b border-border px-3 py-2 text-foreground last:border-b-0",
        state === "selected" && "bg-secondary",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-state={state}
      disabled={disabled}
      {...props}
    />
  )
}
