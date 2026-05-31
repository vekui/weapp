import * as React from "react"
import { Picker as TaroPicker } from "@tarojs/components"

import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Text, type BoxProps } from "../primitives"

export function getDatePickerLabel(value?: string, placeholder = "Select date") {
  return value || placeholder
}

export type DatePickerProps = Omit<
  React.ComponentProps<typeof TaroPicker>,
  "end" | "mode" | "onChange" | "start" | "value"
> & {
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  max?: string
  min?: string
  onChange?: (event: { detail: { value: string } }) => void
  onValueChange?: (value: string) => void
  placeholder?: string
  value?: string
}

export function DatePicker({
  children,
  className,
  defaultValue = "",
  disabled,
  invalid,
  max,
  min,
  onChange,
  onValueChange,
  placeholder,
  value,
  ...props
}: DatePickerProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })
  const state = currentValue ? "selected" : "placeholder"

  return (
    <TaroPicker
      className={cn(disabled && "opacity-50", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-state={state}
      disabled={disabled}
      end={max}
      mode="date"
      onChange={(event) => {
        const nextValue = String(event.detail.value ?? "")
        onChange?.({ detail: { value: nextValue } })
        setValue(nextValue)
      }}
      start={min}
      value={currentValue}
      {...props}
    >
      {children ?? (
        <DatePickerTrigger invalid={invalid} state={state}>
          <Text className={cn("text-sm", currentValue ? "text-foreground" : "text-muted-foreground")}>
            {getDatePickerLabel(currentValue, placeholder)}
          </Text>
        </DatePickerTrigger>
      )}
    </TaroPicker>
  )
}

export type DatePickerTriggerProps = BoxProps & {
  invalid?: boolean
  state?: "selected" | "placeholder"
}

export function DatePickerTrigger({
  className,
  invalid,
  state = "placeholder",
  ...props
}: DatePickerTriggerProps) {
  return (
    <Box
      className={cn(
        "flex min-h-[88rpx] flex-row items-center justify-between rounded-md border border-input bg-background px-3",
        invalid && "border-destructive",
        className
      )}
      data-state={state}
      {...props}
    />
  )
}
