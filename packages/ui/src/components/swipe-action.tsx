import * as React from "react"

import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps } from "../primitives"
import { Button } from "./button"

export type SwipeActionOption = {
  destructive?: boolean
  label: string
  value: string
}

export type SwipeActionProps = BoxProps & {
  defaultOpen?: boolean
  onAction?: (value: string) => void
  open?: boolean
  options?: SwipeActionOption[]
}

export function SwipeAction({
  children,
  className,
  defaultOpen = false,
  onAction,
  open,
  options = [],
  ...props
}: SwipeActionProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const currentOpen = open ?? internalOpen

  return (
    <Box
      className={cn("overflow-hidden rounded-md border border-border bg-card", className)}
      data-state={currentOpen ? "open" : "closed"}
      {...props}
    >
      <Pressable
        className="flex min-h-[88rpx] flex-row items-center justify-between px-3"
        onClick={() => setInternalOpen((value) => !value)}
      >
        <Box>{children}</Box>
        <Text className="text-xs text-muted-foreground">{currentOpen ? "Close" : "Open"}</Text>
      </Pressable>
      {currentOpen ? (
        <Box className="flex flex-row justify-end gap-2 border-t border-border p-2">
          {options.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={option.destructive ? "destructive" : "secondary"}
              onClick={() => onAction?.(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}
