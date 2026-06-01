import * as React from "react"

import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps } from "../primitives"

export type ComboboxOption = {
  label: string
  value: string
  disabled?: boolean
}

export type ComboboxState = "selected" | "placeholder"

export function getComboboxState(value?: string): ComboboxState {
  return value ? "selected" : "placeholder"
}

function getComboboxLabel(options: ComboboxOption[], value?: string, placeholder = "Select") {
  return options.find((option) => option.value === value)?.label ?? placeholder
}

export type ComboboxProps = Omit<BoxProps, "onChange"> & {
  defaultOpen?: boolean
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value: string) => void
  open?: boolean
  options?: ComboboxOption[]
  placeholder?: string
  value?: string
}

export function Combobox({
  className,
  defaultOpen = false,
  defaultValue = "",
  disabled,
  invalid,
  onOpenChange,
  onValueChange,
  open,
  options = [],
  placeholder,
  value,
  ...props
}: ComboboxProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })
  const state = getComboboxState(currentValue)

  return (
    <Box className={cn("relative", className)} data-state={state} {...props}>
      <Pressable
        className={cn(
          "flex min-h-[88rpx] flex-row items-center justify-between rounded-md border border-input bg-background px-3",
          invalid && "border-destructive",
          disabled && "opacity-50"
        )}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-role="combobox-trigger"
        data-state={state}
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          setOpen(!currentOpen)
        }}
      >
        <Text className={cn("text-sm", currentValue ? "text-foreground" : "text-muted-foreground")}>
          {getComboboxLabel(options, currentValue, placeholder)}
        </Text>
      </Pressable>

      {currentOpen ? (
        <Box className="mt-2 overflow-hidden rounded-md border border-border bg-background text-foreground" data-state="open">
          {options.map((option) => (
            <Pressable
              className={cn(
                "flex min-h-[88rpx] flex-row items-center px-3",
                option.disabled && "text-muted-foreground"
              )}
              data-disabled={option.disabled ? "" : undefined}
              data-state={option.value === currentValue ? "selected" : "default"}
              data-value={option.value}
              disabled={option.disabled}
              key={option.value}
              onClick={() => {
                if (option.disabled) return
                setValue(option.value)
                setOpen(false)
              }}
            >
              <Text className={cn("text-sm", option.disabled ? "text-muted-foreground" : "text-foreground")}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}
