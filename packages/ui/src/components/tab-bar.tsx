import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"
import { Icon, type LucideIconName } from "./icon"

export type TabBarItemState = "active" | "inactive"

export function getTabBarItemState(value: string, selectedValue: string | undefined): TabBarItemState {
  return value === selectedValue ? "active" : "inactive"
}

export type TabBarProps = BoxProps & {
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}

type TabBarContextValue = {
  setValue: (value: string) => void
  value?: string
}

const [TabBarProvider, useTabBarContext] = createStrictContext<TabBarContextValue>("TabBar")

export function TabBar({ className, defaultValue, onValueChange, value, ...props }: TabBarProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange
  })

  return (
    <TabBarProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn(
          "flex min-h-[96rpx] flex-row items-center border-t border-border bg-card pb-[env(safe-area-inset-bottom)]",
          className
        )}
        data-value={currentValue}
        {...props}
      />
    </TabBarProvider>
  )
}

export type TabBarItemProps = PressableProps & {
  icon?: LucideIconName
  label?: string
  value: string
}

export function TabBarItem({
  className,
  icon,
  label,
  onClick,
  value,
  ...props
}: TabBarItemProps) {
  const context = useTabBarContext()
  const state = getTabBarItemState(value, context.value)
  const active = state === "active"

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-1 flex-col items-center justify-center gap-1 text-muted-foreground",
        active && "text-primary",
        className
      )}
      data-state={state}
      onClick={(event) => {
        onClick?.(event)
        context.setValue(value)
      }}
      {...props}
    >
      {icon ? <Icon name={icon} size="sm" tone={active ? "primary" : "muted"} /> : null}
      <Text className={cn("text-xs", active ? "text-primary" : "text-muted-foreground")}>
        {label ?? value}
      </Text>
    </Pressable>
  )
}
