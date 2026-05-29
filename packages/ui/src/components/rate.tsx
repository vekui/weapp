import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps } from "../primitives"
import { Icon } from "./icon"

export type RateItemState = "selected" | "unselected"

export function getRateItemState(index: number, value: number): RateItemState {
  return index <= value ? "selected" : "unselected"
}

export type RateProps = BoxProps & {
  value?: number
  defaultValue?: number
  count?: number
  onValueChange?: (value: number) => void
}

export function Rate({
  className,
  value,
  defaultValue = 0,
  count = 5,
  onValueChange,
  ...props
}: RateProps) {
  const [currentValue, setValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })

  return (
    <Box className={cn("flex flex-row items-center gap-1", className)} data-value={currentValue} {...props}>
      {Array.from({ length: count }).map((_, index) => {
        const itemValue = index + 1
        const state = getRateItemState(itemValue, currentValue)
        return (
          <Pressable
            className="flex min-h-[72rpx] min-w-[72rpx] items-center justify-center"
            data-state={state}
            key={itemValue}
            onClick={() => setValue(itemValue)}
          >
            <Icon
              filled={state === "selected"}
              name="star"
              size="sm"
              tone={state === "selected" ? "primary" : "muted"}
            />
          </Pressable>
        )
      })}
    </Box>
  )
}
