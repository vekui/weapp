import * as React from "react"
import { PickerView as TaroPickerView, PickerViewColumn } from "@tarojs/components"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type PickerViewProps = React.ComponentProps<typeof TaroPickerView>

function PickerViewRoot({ className, ...props }: PickerViewProps) {
  return (
    <TaroPickerView
      className={cn("h-[360rpx] rounded-md border border-border bg-card", className)}
      data-state="default"
      {...props}
    />
  )
}

export type PickerViewColumnProps = React.ComponentProps<typeof PickerViewColumn>

function PickerViewColumnRoot({ className, ...props }: PickerViewColumnProps) {
  return <PickerViewColumn className={cn("text-foreground", className)} {...props} />
}

export type PickerViewOptionProps = BoxProps

function PickerViewOption({ className, children, ...props }: PickerViewOptionProps) {
  return (
    <Box className={cn("flex h-[88rpx] items-center justify-center", className)} data-state="option" {...props}>
      <Text className="text-sm text-foreground">{children}</Text>
    </Box>
  )
}

export const PickerView = {
  Root: PickerViewRoot,
  Column: PickerViewColumnRoot,
  Option: PickerViewOption
}
