import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"

export type RadioState = "checked" | "unchecked"

export function getRadioState(value: string, currentValue: string | undefined): RadioState {
  return value === currentValue ? "checked" : "unchecked"
}

type RadioGroupContextValue = {
  value?: string
  setValue: (value: string) => void
}

const [RadioGroupProvider, useRadioGroupContext] =
  createStrictContext<RadioGroupContextValue>("RadioGroup")

export type RadioGroupRootProps = BoxProps & {
  value?: string
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  onValueChange?: (value: string) => void
}

function RadioGroupRoot({
  value,
  defaultValue,
  disabled,
  invalid,
  onValueChange,
  className,
  ...props
}: RadioGroupRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange
  })

  return (
    <RadioGroupProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn("flex flex-col gap-2", className)}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        {...props}
      />
    </RadioGroupProvider>
  )
}

export type RadioGroupItemProps = PressableProps & {
  disabled?: boolean
  value: string
}

function RadioGroupItem({ className, disabled, value, onClick, ...props }: RadioGroupItemProps) {
  const context = useRadioGroupContext()
  const state = getRadioState(value, context.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center gap-2 rounded-md border border-border px-3",
        state === "checked" && "border-primary bg-secondary",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-state={state}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        context.setValue(value)
      }}
      {...props}
    />
  )
}

export type RadioGroupOption = {
  disabled?: boolean
  label: string
  value: string
}

export type RadioGroupProps = RadioGroupRootProps & {
  options?: RadioGroupOption[]
}

function RadioGroupCompat({ options, ...props }: RadioGroupProps) {
  if (!options) {
    return <RadioGroupRoot {...props} />
  }

  return (
    <RadioGroupRoot {...props}>
      {options.map((option) => {
        const optionDisabled = option.disabled || props.disabled

        return (
          <RadioGroupItem disabled={optionDisabled} key={option.value} value={option.value}>
            <Text className={cn("text-base", optionDisabled ? "text-muted-foreground" : "text-foreground")}>
              {option.label}
            </Text>
          </RadioGroupItem>
        )
      })}
    </RadioGroupRoot>
  )
}

export const RadioGroup = Object.assign(RadioGroupCompat, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem
})
