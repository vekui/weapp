import * as React from "react"

import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"

export type ContextMenuState = "open" | "closed"

export function getContextMenuState(open: boolean): ContextMenuState {
  return open ? "open" : "closed"
}

type ContextMenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [ContextMenuProvider, useContextMenuContext] =
  createStrictContext<ContextMenuContextValue>("ContextMenu")

export type ContextMenuRootProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function ContextMenuRoot({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: ContextMenuRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <ContextMenuProvider value={{ open: currentOpen, setOpen }}>
      <Box
        className={cn("relative", className)}
        data-state={getContextMenuState(currentOpen)}
        {...props}
      />
    </ContextMenuProvider>
  )
}

export type ContextMenuTriggerProps = PressableProps

function ContextMenuTrigger({ className, onClick, ...props }: ContextMenuTriggerProps) {
  const context = useContextMenuContext()

  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center", className)}
      data-state={getContextMenuState(context.open)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type ContextMenuContentProps = BoxProps

function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
  const context = useContextMenuContext()
  if (!context.open) return null

  return (
    <Box
      className={cn(
        "mt-2 overflow-hidden rounded-md border border-border bg-background text-foreground",
        className
      )}
      data-state={getContextMenuState(context.open)}
      {...props}
    />
  )
}

export type ContextMenuItemProps = PressableProps & {
  destructive?: boolean
  onSelect?: (value: string) => void
  value: string
}

function ContextMenuItem({
  children,
  className,
  destructive,
  disabled,
  onClick,
  onSelect,
  value,
  ...props
}: ContextMenuItemProps) {
  const context = useContextMenuContext()

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center px-3",
        destructive ? "text-destructive" : "text-foreground",
        disabled && "text-muted-foreground",
        className
      )}
      data-destructive={destructive ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-value={value}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        if (disabled) return
        onSelect?.(value)
        context.setOpen(false)
      }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "text-sm",
            disabled ? "text-muted-foreground" : destructive ? "text-destructive" : "text-foreground"
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem
}
