import * as React from "react"
import { View } from "@tarojs/components"

import { cn } from "../lib/cn"

export type PressableProps = React.ComponentProps<typeof View> & {
  disabled?: boolean
}

export function Pressable({
  className,
  disabled,
  onClick,
  ...props
}: PressableProps) {
  return (
    <View
      {...props}
      className={cn(disabled && "opacity-70", className)}
      aria-disabled={disabled ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      onClick={disabled ? undefined : onClick}
    />
  )
}
