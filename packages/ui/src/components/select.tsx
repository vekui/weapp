import * as React from "react"
import { Picker as TaroPicker } from "@tarojs/components"

import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Text, type BoxProps } from "../primitives"

export type SelectOption = {
  label: string
  value: string
}

export function getSelectLabel(options: SelectOption[], value?: string, placeholder = "Select") {
  return options.find((option) => option.value === value)?.label ?? placeholder
}

export type SelectProps = Omit<React.ComponentProps<typeof TaroPicker>, "mode" | "onChange" | "range" | "value"> & {
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  onChange?: (event: { detail: { value: number | string } }) => void
  onValueChange?: (value: string) => void
  options?: SelectOption[]
  placeholder?: string
  value?: string
}

export function Select({
  children,
  className,
  defaultValue = "",
  disabled,
  invalid,
  onChange,
  onValueChange,
  options = [],
  placeholder,
  value,
  ...props
}: SelectProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === currentValue))
  const state = currentValue ? "selected" : "placeholder"

  return (
    <TaroPicker
      className={cn(disabled && "opacity-50", className)}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-state={state}
      disabled={disabled}
      mode="selector"
      onChange={(event) => {
        const nextIndex = Number(event.detail.value)
        const nextValue = options[nextIndex]?.value ?? ""
        onChange?.({ detail: { value: event.detail.value } })
        setValue(nextValue)
      }}
      range={options.map((option) => option.label)}
      value={selectedIndex}
      {...props}
    >
      {children ?? (
        <SelectTrigger invalid={invalid} state={state}>
          <Text className={cn("text-sm", currentValue ? "text-foreground" : "text-muted-foreground")}>
            {getSelectLabel(options, currentValue, placeholder)}
          </Text>
        </SelectTrigger>
      )}
    </TaroPicker>
  )
}

export type SelectTriggerProps = BoxProps & {
  invalid?: boolean
  state?: "selected" | "placeholder"
}

export function SelectTrigger({ className, invalid, state = "placeholder", ...props }: SelectTriggerProps) {
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
