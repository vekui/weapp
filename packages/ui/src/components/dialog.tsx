import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"
import { Layer } from "../primitives/layer"
import { Button } from "./button"

export interface DialogProps extends Omit<React.ComponentProps<typeof View>, "title"> {
  description?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title: React.ReactNode
}

export function Dialog({
  children,
  className,
  description,
  onOpenChange,
  open = false,
  title,
  ...props
}: DialogProps) {
  return (
    <Layer open={open} placement="center">
      <View
        className={cn("w-full max-w-[640rpx] rounded-md bg-card p-5 text-card-foreground", className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
        {description ? <Text className="mt-2 text-sm text-muted-foreground">{description}</Text> : null}
        <View className="mt-4">{children}</View>
        <View className="mt-5 flex-row justify-end">
          <Button size="sm" variant="secondary" onClick={() => onOpenChange?.(false)}>
            Close
          </Button>
        </View>
      </View>
    </Layer>
  )
}
