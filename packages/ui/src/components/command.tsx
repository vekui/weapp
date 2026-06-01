import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"
import { InputBase, type InputBaseProps } from "../primitives/input-base"

export type CommandItemState = "selected" | "default"

export function getCommandItemState(selected?: boolean): CommandItemState {
  return selected ? "selected" : "default"
}

export type CommandRootProps = BoxProps

function CommandRoot({ className, ...props }: CommandRootProps) {
  return (
    <Box
      className={cn("overflow-hidden rounded-md border border-border bg-background text-foreground", className)}
      {...props}
    />
  )
}

export type CommandInputProps = InputBaseProps

function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <InputBase
      className={cn("min-h-[88rpx] w-full border-b border-border bg-background px-3 text-base text-foreground", className)}
      {...props}
    />
  )
}

export type CommandListProps = BoxProps

function CommandList({ className, ...props }: CommandListProps) {
  return <Box className={cn("flex flex-col", className)} {...props} />
}

export type CommandItemProps = PressableProps & {
  onSelect?: (value: string) => void
  selected?: boolean
  value: string
}

function CommandItem({
  children,
  className,
  disabled,
  onClick,
  onSelect,
  selected,
  value,
  ...props
}: CommandItemProps) {
  const state = getCommandItemState(selected)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center px-3 text-foreground",
        state === "selected" && "bg-muted",
        disabled && "text-muted-foreground",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-state={state}
      data-value={value}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        if (disabled) return
        onSelect?.(value)
      }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm", disabled ? "text-muted-foreground" : "text-foreground")}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export type CommandEmptyProps = BoxProps

function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return <Box className={cn("px-3 py-4 text-sm text-muted-foreground", className)} {...props} />
}

export const Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Item: CommandItem,
  Empty: CommandEmpty
}
