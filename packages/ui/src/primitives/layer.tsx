import * as React from "react"
import { View } from "@tarojs/components"
import { cn } from "../lib/cn"

export type LayerProps = {
  children?: React.ReactNode
  className?: string
  open?: boolean
  placement?: "center" | "bottom"
}

export function Layer({ children, className, open = false, placement = "center" }: LayerProps) {
  if (!open) {
    return null
  }

  return (
    <View
      className={cn(
        "fixed inset-0 z-50 flex bg-foreground/40 p-4",
        placement === "center" ? "items-center justify-center" : "items-end justify-center",
        className
      )}
      data-state={open ? "open" : "closed"}
    >
      {children}
    </View>
  )
}
