import * as React from "react"
import { Picker as TaroPicker } from "@tarojs/components"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type PickerOption = {
  label: string
  value: string
}

export type PickerProps = Omit<React.ComponentProps<typeof TaroPicker>, "mode" | "onChange" | "range" | "value"> & {
  onChange?: (event: { detail: { value: number | string } }) => void
  options?: PickerOption[]
  placeholder?: string
  value?: string
}

export function getPickerLabel(options: PickerOption[], value?: string, placeholder = "Select") {
  return options.find((option) => option.value === value)?.label ?? placeholder
}

export function Picker({
  children,
  className,
  options = [],
  placeholder,
  value,
  ...props
}: PickerProps) {
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  return (
    <TaroPicker
      className={className}
      data-state={value ? "selected" : "placeholder"}
      mode="selector"
      range={options.map((option) => option.label)}
      value={selectedIndex}
      {...props}
    >
      {children ?? (
        <PickerTrigger>
          <Text className="text-sm text-foreground">{getPickerLabel(options, value, placeholder)}</Text>
        </PickerTrigger>
      )}
    </TaroPicker>
  )
}

export type PickerTriggerProps = BoxProps

export function PickerTrigger({ className, ...props }: PickerTriggerProps) {
  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-row items-center justify-between rounded-md border border-input bg-background px-3", className)}
      {...props}
    />
  )
}
