import * as React from "react"

import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"

export type DropdownMenuState = "open" | "closed"

export function getDropdownMenuState(open: boolean): DropdownMenuState {
  return open ? "open" : "closed"
}

type DropdownMenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [DropdownMenuProvider, useDropdownMenuContext] =
  createStrictContext<DropdownMenuContextValue>("DropdownMenu")

export type DropdownMenuRootProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function DropdownMenuRoot({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: DropdownMenuRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <DropdownMenuProvider value={{ open: currentOpen, setOpen }}>
      <Box
        className={cn("relative", className)}
        data-state={getDropdownMenuState(currentOpen)}
        {...props}
      />
    </DropdownMenuProvider>
  )
}

export type DropdownMenuTriggerProps = PressableProps

function DropdownMenuTrigger({ className, onClick, ...props }: DropdownMenuTriggerProps) {
  const context = useDropdownMenuContext()

  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center", className)}
      data-state={getDropdownMenuState(context.open)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type DropdownMenuContentProps = BoxProps

function DropdownMenuContent({ className, ...props }: DropdownMenuContentProps) {
  const context = useDropdownMenuContext()
  if (!context.open) return null

  return (
    <Box
      className={cn(
        "mt-2 overflow-hidden rounded-md border border-border bg-background text-foreground",
        className
      )}
      data-state={getDropdownMenuState(context.open)}
      {...props}
    />
  )
}

export type DropdownMenuItemProps = PressableProps & {
  destructive?: boolean
  onSelect?: (value: string) => void
  value: string
}

function DropdownMenuItem({
  children,
  className,
  destructive,
  disabled,
  onClick,
  onSelect,
  value,
  ...props
}: DropdownMenuItemProps) {
  const context = useDropdownMenuContext()

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center px-3",
        destructive ? "text-destructive" : "text-foreground",
        disabled && "text-muted-foreground",
        className
      )}
      data-destructive={destructive ? "" : undefined}
      data-disabled={disabled ? "true" : undefined}
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

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
}
