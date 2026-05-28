import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export type RadioOption = {
  disabled?: boolean
  label: React.ReactNode
  value: string
}

export interface RadioGroupProps extends Omit<React.ComponentProps<typeof View>, "onChange"> {
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  onValueChange?: (value: string) => void
  options: RadioOption[]
  value?: string
}

export function RadioGroup({
  className,
  defaultValue,
  disabled = false,
  invalid = false,
  onValueChange,
  options,
  value,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedValue = value ?? internalValue

  function select(nextValue: string, optionDisabled?: boolean) {
    if (disabled || optionDisabled) {
      return
    }
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <View
      className={cn("gap-2", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      {...props}
    >
      {options.map((option) => {
        const checked = option.value === selectedValue
        return (
          <View
            className="flex-row items-center gap-2 py-2"
            data-disabled={option.disabled || disabled ? "true" : undefined}
            data-state={checked ? "checked" : "unchecked"}
            key={option.value}
            onClick={() => select(option.value, option.disabled)}
          >
            <View
              className={cn(
                "h-[40rpx] w-[40rpx] rounded-full border border-input p-[8rpx]",
                checked ? "border-primary" : "border-input",
                invalid ? "border-destructive" : ""
              )}
              data-state={checked ? "checked" : "unchecked"}
            >
              {checked ? <View className="h-full w-full rounded-full bg-primary" /> : null}
            </View>
            <Text className="text-base text-foreground">{option.label}</Text>
          </View>
        )
      })}
    </View>
  )
}
