import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type NavigationMenuState = "open" | "closed"

export function getNavigationMenuState(value: string, activeValue: string): NavigationMenuState {
  return value === activeValue ? "open" : "closed"
}

type NavigationMenuContextValue = {
  value: string
  setValue: (value: string) => void
}

type NavigationMenuItemContextValue = {
  value: string
}

const [NavigationMenuProvider, useNavigationMenuContext] =
  createStrictContext<NavigationMenuContextValue>("NavigationMenu")
const [NavigationMenuItemProvider, useNavigationMenuItemContext] =
  createStrictContext<NavigationMenuItemContextValue>("NavigationMenuItem")

export type NavigationMenuRootProps = BoxProps & {
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}

function NavigationMenuRoot({
  className,
  defaultValue = "",
  onValueChange,
  value,
  ...props
}: NavigationMenuRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })

  return (
    <NavigationMenuProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn("flex flex-col gap-2", className)}
        data-value={currentValue}
        {...props}
      />
    </NavigationMenuProvider>
  )
}

function NavigationMenuList({ className, ...props }: BoxProps) {
  return <Box className={cn("flex flex-col gap-2", className)} {...props} />
}

export type NavigationMenuItemProps = BoxProps & {
  value: string
}

function NavigationMenuItem({ className, value, ...props }: NavigationMenuItemProps) {
  const context = useNavigationMenuContext()
  const state = getNavigationMenuState(value, context.value)

  return (
    <NavigationMenuItemProvider value={{ value }}>
      <Box className={cn("relative", className)} data-state={state} data-value={value} {...props} />
    </NavigationMenuItemProvider>
  )
}

export type NavigationMenuTriggerProps = PressableProps

function NavigationMenuTrigger({ className, disabled, onClick, ...props }: NavigationMenuTriggerProps) {
  const context = useNavigationMenuContext()
  const item = useNavigationMenuItemContext()
  const state = getNavigationMenuState(item.value, context.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center rounded-md px-3",
        state === "open" ? "bg-background text-foreground" : "text-muted-foreground",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-state={state}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        if (disabled) return
        context.setValue(state === "open" ? "" : item.value)
      }}
      {...props}
    />
  )
}

export type NavigationMenuContentProps = BoxProps

function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  const context = useNavigationMenuContext()
  const item = useNavigationMenuItemContext()
  const state = getNavigationMenuState(item.value, context.value)
  if (state !== "open") return null

  return (
    <Box
      className={cn(
        "rounded-md border border-border bg-background p-3 text-foreground",
        className
      )}
      data-state={state}
      {...props}
    />
  )
}

export const NavigationMenu = {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent
}
