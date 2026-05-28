import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "../lib/cn"

export interface SwitchProps extends Omit<React.ComponentProps<typeof View>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  checked,
  className,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isChecked = checked ?? internalChecked

  function toggle() {
    if (disabled) {
      return
    }
    const nextChecked = !isChecked
    setInternalChecked(nextChecked)
    onCheckedChange?.(nextChecked)
  }

  return (
    <View
      className={cn(
        "h-[56rpx] w-[104rpx] rounded-full p-[4rpx]",
        isChecked ? "bg-primary" : "bg-muted",
        disabled ? "opacity-50" : "",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-state={isChecked ? "checked" : "unchecked"}
      onClick={toggle}
      {...props}
    >
      <View
        className={cn(
          "h-[48rpx] w-[48rpx] rounded-full bg-background transition-[margin]",
          isChecked ? "ml-[48rpx]" : "ml-0"
        )}
        data-state={isChecked ? "checked" : "unchecked"}
      />
    </View>
  )
}
