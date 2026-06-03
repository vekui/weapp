import { cn } from "../lib/cn"
import { Box, InputBase, Pressable, type BoxProps, type InputBaseProps } from "../primitives"
import { Icon } from "./icon"

export type ClampInputNumberOptions = {
  min?: number
  max?: number
}

export function clampInputNumber(value: number, { min, max }: ClampInputNumberOptions = {}) {
  if (min !== undefined && value < min) return min
  if (max !== undefined && value > max) return max
  return value
}

export type InputNumberProps = BoxProps & {
  value?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
}

export function InputNumber({
  className,
  value = 0,
  min,
  max,
  step = 1,
  onValueChange,
  ...props
}: InputNumberProps) {
  const currentValue = clampInputNumber(value, { min, max })
  const atMin = min !== undefined && currentValue <= min
  const atMax = max !== undefined && currentValue >= max
  const changeBy = (delta: number) => onValueChange?.(clampInputNumber(currentValue + delta, { min, max }))
  const handleInput: NonNullable<InputBaseProps["onInput"]> = (event) => {
    const nextValue = Number(event.detail.value)
    if (!Number.isNaN(nextValue)) onValueChange?.(clampInputNumber(nextValue, { min, max }))
  }

  return (
    <Box
      className={cn("inline-flex min-h-[80rpx] self-start flex-row items-center overflow-hidden rounded-md border border-input bg-background", className)}
      data-value={currentValue}
      {...props}
    >
      <Pressable
        className="flex min-h-[80rpx] min-w-[80rpx] items-center justify-center bg-secondary"
        disabled={atMin}
        onClick={() => changeBy(-step)}
      >
        <Icon name="minus" size="sm" />
      </Pressable>
      <InputBase
        className="min-h-[80rpx] w-[96rpx] text-center text-base text-foreground"
        onInput={handleInput}
        type="number"
        value={String(currentValue)}
      />
      <Pressable
        className="flex min-h-[80rpx] min-w-[80rpx] items-center justify-center bg-secondary"
        disabled={atMax}
        onClick={() => changeBy(step)}
      >
        <Icon name="plus" size="sm" />
      </Pressable>
    </Box>
  )
}
