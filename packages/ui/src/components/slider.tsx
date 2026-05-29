import { Slider as TaroSlider } from "@tarojs/components"
import * as React from "react"

import { cn } from "../lib/cn"
import { Box } from "../primitives"

export type SliderProps = React.ComponentProps<typeof TaroSlider> & {
  label?: string
  onValueChange?: (value: number) => void
}

export function Slider({
  className,
  label,
  onChange,
  onValueChange,
  value = 0,
  ...props
}: SliderProps) {
  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-col justify-center gap-2 text-foreground", className)}
      data-value={value}
    >
      {label ? <Box className="text-sm text-muted-foreground">{label}</Box> : null}
      <TaroSlider
        onChange={(event) => {
          onChange?.(event)
          onValueChange?.(event.detail.value)
        }}
        value={value}
        {...props}
      />
    </Box>
  )
}
