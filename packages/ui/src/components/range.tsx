import * as React from "react"
import { Slider as TaroSlider } from "@tarojs/components"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type RangeValue = [number, number]

export type RangeProps = BoxProps & {
  max?: number
  min?: number
  onValueChange?: (value: RangeValue) => void
  value?: RangeValue
}

export function normalizeRange(value: RangeValue, min: number, max: number): RangeValue {
  const first = Math.min(Math.max(value[0], min), max)
  const second = Math.min(Math.max(value[1], min), max)
  return first <= second ? [first, second] : [second, first]
}

export function Range({
  className,
  max = 100,
  min = 0,
  onValueChange,
  value = [25, 75],
  ...props
}: RangeProps) {
  const currentValue = normalizeRange(value, min, max)

  return (
    <Box
      className={cn("flex min-h-[144rpx] flex-col justify-center gap-2 text-foreground", className)}
      data-state="default"
      data-value={`${currentValue[0]}-${currentValue[1]}`}
      {...props}
    >
      <Box className="flex flex-row items-center justify-between">
        <Text className="text-sm text-muted-foreground">{currentValue[0]}</Text>
        <Text className="text-sm text-muted-foreground">{currentValue[1]}</Text>
      </Box>
      <TaroSlider
        max={max}
        min={min}
        onChange={(event) => onValueChange?.(normalizeRange([Number(event.detail.value), currentValue[1]], min, max))}
        value={currentValue[0]}
      />
      <TaroSlider
        max={max}
        min={min}
        onChange={(event) => onValueChange?.(normalizeRange([currentValue[0], Number(event.detail.value)], min, max))}
        value={currentValue[1]}
      />
    </Box>
  )
}
