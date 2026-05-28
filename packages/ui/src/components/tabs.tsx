import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export type TabItem = {
  content: React.ReactNode
  disabled?: boolean
  label: React.ReactNode
  value: string
}

export interface TabsProps extends Omit<React.ComponentProps<typeof View>, "onChange"> {
  defaultValue?: string
  items: TabItem[]
  onValueChange?: (value: string) => void
  value?: string
}

export function Tabs({ className, defaultValue, items, onValueChange, value, ...props }: TabsProps) {
  const firstValue = items[0]?.value
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? firstValue)
  const selectedValue = value ?? internalValue
  const selectedItem = items.find((item) => item.value === selectedValue)

  function select(item: TabItem) {
    if (item.disabled) {
      return
    }
    setInternalValue(item.value)
    onValueChange?.(item.value)
  }

  return (
    <View className={cn("gap-3", className)} {...props}>
      <View className="flex-row rounded-md bg-muted p-1" data-slot="tabs-list">
        {items.map((item) => {
          const active = item.value === selectedValue
          return (
            <View
              className={cn(
                "min-h-[72rpx] flex-1 items-center justify-center rounded-md px-3",
                active ? "bg-background text-foreground" : "text-muted-foreground",
                item.disabled ? "opacity-50" : ""
              )}
              data-disabled={item.disabled ? "true" : undefined}
              data-state={active ? "active" : "inactive"}
              key={item.value}
              onClick={() => select(item)}
            >
              <Text>{item.label}</Text>
            </View>
          )
        })}
      </View>
      <View className="rounded-md border border-border bg-card p-4" data-state="active">
        {selectedItem?.content}
      </View>
    </View>
  )
}
