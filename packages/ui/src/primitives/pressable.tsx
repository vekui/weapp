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
      className={cn(disabled && "opacity-50", className)}
      data-disabled={disabled ? "" : undefined}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  )
}
