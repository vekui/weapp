import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"

export type MenubarState = "open" | "closed"

export function getMenubarState(value: string, activeValue: string): MenubarState {
  return value === activeValue ? "open" : "closed"
}

type MenubarContextValue = {
  value: string
  setValue: (value: string) => void
}

type MenubarMenuContextValue = {
  value: string
}

const [MenubarProvider, useMenubarContext] = createStrictContext<MenubarContextValue>("Menubar")
const [MenubarMenuProvider, useMenubarMenuContext] =
  createStrictContext<MenubarMenuContextValue>("MenubarMenu")

export type MenubarRootProps = BoxProps & {
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}

function MenubarRoot({
  className,
  defaultValue = "",
  onValueChange,
  value,
  ...props
}: MenubarRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })

  return (
    <MenubarProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn("flex flex-col gap-2", className)}
        data-value={currentValue}
        {...props}
      />
    </MenubarProvider>
  )
}

export type MenubarMenuProps = BoxProps & {
  value: string
}

function MenubarMenu({ className, value, ...props }: MenubarMenuProps) {
  const context = useMenubarContext()
  const state = getMenubarState(value, context.value)

  return (
    <MenubarMenuProvider value={{ value }}>
      <Box className={cn("relative", className)} data-state={state} data-value={value} {...props} />
    </MenubarMenuProvider>
  )
}

export type MenubarTriggerProps = PressableProps

function MenubarTrigger({ className, onClick, ...props }: MenubarTriggerProps) {
  const context = useMenubarContext()
  const menu = useMenubarMenuContext()
  const state = getMenubarState(menu.value, context.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center rounded-md px-3",
        state === "open" ? "bg-background text-foreground" : "text-muted-foreground",
        className
      )}
      data-state={state}
      onClick={(event) => {
        onClick?.(event)
        context.setValue(state === "open" ? "" : menu.value)
      }}
      {...props}
    />
  )
}

export type MenubarContentProps = BoxProps

function MenubarContent({ className, ...props }: MenubarContentProps) {
  const context = useMenubarContext()
  const menu = useMenubarMenuContext()
  const state = getMenubarState(menu.value, context.value)
  if (state !== "open") return null

  return (
    <Box
      className={cn(
        "mt-2 overflow-hidden rounded-md border border-border bg-background text-foreground",
        className
      )}
      data-state={state}
      {...props}
    />
  )
}

export type MenubarItemProps = PressableProps & {
  value: string
}

function MenubarItem({ children, className, disabled, value, ...props }: MenubarItemProps) {
  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center px-3",
        disabled ? "text-muted-foreground" : "text-foreground",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-value={value}
      disabled={disabled}
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

export const Menubar = {
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: MenubarContent,
  Item: MenubarItem
}
