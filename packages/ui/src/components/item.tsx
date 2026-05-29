import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"

export type ItemState = "default" | "selected" | "disabled"

export function getItemState({
  selected,
  disabled
}: {
  selected?: boolean
  disabled?: boolean
}): ItemState {
  if (disabled) return "disabled"
  if (selected) return "selected"
  return "default"
}

export type ItemProps = PressableProps & {
  selected?: boolean
}

export function Item({ className, selected, disabled, ...props }: ItemProps) {
  const state = getItemState({ selected, disabled })

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-foreground",
        state === "selected" && "border-primary bg-secondary",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-state={state}
      disabled={disabled}
      {...props}
    />
  )
}

export type ItemGroupProps = BoxProps

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return <Box className={cn("flex flex-col gap-2", className)} {...props} />
}

export type ItemContentProps = BoxProps

export function ItemContent({ className, ...props }: ItemContentProps) {
  return <Box className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
}

export type ItemTitleProps = TextProps

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return <Text className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

export type ItemDescriptionProps = TextProps

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <Text className={cn("text-xs leading-[36rpx] text-muted-foreground", className)} {...props} />
  )
}

export type ItemMediaProps = BoxProps

export function ItemMedia({ className, ...props }: ItemMediaProps) {
  return (
    <Box
      className={cn(
        "flex h-[72rpx] w-[72rpx] items-center justify-center rounded-md bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type ItemActionsProps = BoxProps

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <Box className={cn("flex flex-row items-center gap-2", className)} {...props} />
}
