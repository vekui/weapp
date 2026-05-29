import * as React from "react"

import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"
import { getTabsState } from "./tabs-state"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const [TabsProvider, useTabsContext] = createStrictContext<TabsContextValue>("Tabs")

export type TabsRootProps = BoxProps & {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}

function TabsRoot({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })

  return (
    <TabsProvider value={{ value: currentValue, setValue }}>
      <Box className={cn("flex flex-col gap-3", className)} {...props} />
    </TabsProvider>
  )
}

function TabsList({ className, ...props }: BoxProps) {
  return (
    <Box
      className={cn(
        "flex min-h-[80rpx] flex-row items-center gap-1 overflow-hidden rounded-[var(--radius)] bg-muted p-[6rpx]",
        className
      )}
      {...props}
    />
  )
}

type TabsTriggerProps = PressableProps & {
  value: string
}

function TabsTrigger({ className, value, onClick, ...props }: TabsTriggerProps) {
  const context = useTabsContext()
  const state = getTabsState(value, context.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[68rpx] flex-1 items-center justify-center rounded-[calc(var(--radius)-6rpx)] px-3 text-center text-sm leading-[40rpx]",
        state === "active" ? "bg-background text-foreground" : "text-muted-foreground",
        className
      )}
      data-state={state}
      onClick={(event) => {
        onClick?.(event)
        context.setValue(value)
      }}
      {...props}
    />
  )
}

type TabsContentProps = BoxProps & {
  value: string
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const context = useTabsContext()
  const state = getTabsState(value, context.value)
  if (state !== "active") return null
  return (
    <Box
      className={cn("text-sm leading-[44rpx] text-foreground", className)}
      data-state={state}
      {...props}
    />
  )
}

export type TabsItem = {
  content: React.ReactNode
  disabled?: boolean
  label: React.ReactNode
  value: string
}

export type TabsProps = Omit<TabsRootProps, "defaultValue"> & {
  defaultValue?: string
  items?: TabsItem[]
}

function TabsCompat({ defaultValue, items, ...props }: TabsProps) {
  if (!items) {
    return <TabsRoot defaultValue={defaultValue ?? ""} {...props} />
  }

  const initialValue = defaultValue ?? props.value ?? items[0]?.value ?? ""

  return (
    <TabsRoot defaultValue={initialValue} {...props}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger disabled={item.disabled} key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          className="rounded-md border border-border bg-card p-4"
          key={item.value}
          value={item.value}
        >
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}

export const Tabs = Object.assign(TabsCompat, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
})

export { getTabsState }
