import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type ToggleGroupState = "on" | "off"

export function getToggleGroupState(
  value: string,
  currentValue: string | undefined
): ToggleGroupState {
  return value === currentValue ? "on" : "off"
}

type ToggleGroupContextValue = {
  value?: string
  setValue: (value: string) => void
}

const [ToggleGroupProvider, useToggleGroupContext] =
  createStrictContext<ToggleGroupContextValue>("ToggleGroup")

export type ToggleGroupRootProps = BoxProps & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function ToggleGroupRoot({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange
  })

  return (
    <ToggleGroupProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn(
          "inline-flex min-h-[88rpx] flex-row items-center overflow-hidden rounded-md border border-border",
          className
        )}
        {...props}
      />
    </ToggleGroupProvider>
  )
}

export type ToggleGroupItemProps = PressableProps & {
  value: string
}

function ToggleGroupItem({ className, value, onClick, ...props }: ToggleGroupItemProps) {
  const context = useToggleGroupContext()
  const state = getToggleGroupState(value, context.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] min-w-[88rpx] items-center justify-center px-3 text-sm text-foreground",
        state === "on" && "bg-primary text-primary-foreground",
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

export const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem
}
