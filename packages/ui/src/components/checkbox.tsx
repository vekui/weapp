import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export interface CheckboxProps extends Omit<React.ComponentProps<typeof View>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  invalid?: boolean
  label?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({
  checked,
  className,
  defaultChecked = false,
  disabled = false,
  invalid = false,
  label,
  onCheckedChange,
  ...props
}: CheckboxProps) {
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
      className={cn("flex-row items-center gap-2 py-2", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-state={isChecked ? "checked" : "unchecked"}
      onClick={toggle}
      {...props}
    >
      <View
        className={cn(
          "h-[40rpx] w-[40rpx] rounded-md border border-input",
          isChecked ? "bg-primary" : "bg-background",
          invalid ? "border-destructive" : ""
        )}
        data-state={isChecked ? "checked" : "unchecked"}
      >
        {isChecked ? <Text className="text-primary-foreground">on</Text> : null}
      </View>
      {label ? <Text className="text-base text-foreground">{label}</Text> : null}
    </View>
  )
}
