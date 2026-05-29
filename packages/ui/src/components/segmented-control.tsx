import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type SegmentedControlState = "active" | "inactive"

export function getSegmentedControlState(value: string, currentValue: string | undefined): SegmentedControlState {
  return value === currentValue ? "active" : "inactive"
}

export type SegmentedControlRootProps = BoxProps & {
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
}

type SegmentedControlContextValue = {
  setValue: (value: string) => void
  value?: string
}

const [SegmentedControlProvider, useSegmentedControlContext] =
  createStrictContext<SegmentedControlContextValue>("SegmentedControl")

function SegmentedControlRoot({
  className,
  defaultValue,
  onValueChange,
  value,
  ...props
}: SegmentedControlRootProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange
  })

  return (
    <SegmentedControlProvider value={{ value: currentValue, setValue }}>
      <Box
        className={cn(
          "flex min-h-[80rpx] self-start flex-row overflow-hidden rounded-[var(--radius)] border border-border bg-muted p-[6rpx]",
          className
        )}
        data-value={currentValue}
        {...props}
      />
    </SegmentedControlProvider>
  )
}

export type SegmentedControlItemProps = PressableProps & {
  value: string
}

function SegmentedControlItem({
  className,
  onClick,
  value,
  ...props
}: SegmentedControlItemProps) {
  const context = useSegmentedControlContext()
  const state = getSegmentedControlState(value, context.value)
  return (
    <Pressable
      className={cn(
        "flex min-h-[68rpx] min-w-[112rpx] items-center justify-center rounded-[calc(var(--radius)-6rpx)] px-3 text-center text-sm text-muted-foreground",
        state === "active" && "bg-background text-foreground",
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

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Item: SegmentedControlItem
}
