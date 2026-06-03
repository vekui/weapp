import * as React from "react"

import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps } from "../primitives"
import { Layer } from "../primitives/layer"

export type ActionSheetState = "open" | "closed"

export function getActionSheetState(open: boolean): ActionSheetState {
  return open ? "open" : "closed"
}

export type ActionSheetAction = {
  label: React.ReactNode
  value: string
  destructive?: boolean
  disabled?: boolean
  onSelect?: (value: string) => void
}

export type ActionSheetProps = BoxProps & {
  open?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  actions: ActionSheetAction[]
  cancelText?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export function ActionSheet({
  className,
  open = false,
  title,
  description,
  actions,
  cancelText = "Cancel",
  onOpenChange,
  ...props
}: ActionSheetProps) {
  if (!open) return null

  return (
    <Layer.Root side="bottom">
      <Layer.Backdrop onClick={() => onOpenChange?.(false)} />
      <Layer.Content className={cn("p-3", className)} side="bottom" {...props}>
        {title || description ? (
          <Box className="flex flex-col gap-1 px-3 py-2">
            {title ? <Text className="text-base font-semibold text-foreground">{title}</Text> : null}
            {description ? (
              <Text className="text-sm text-muted-foreground">{description}</Text>
            ) : null}
          </Box>
        ) : null}

        <Box className="flex flex-col gap-2">
          {actions.map((action) => (
            <Pressable
              className={cn(
                "flex min-h-[88rpx] flex-row items-center justify-center rounded-md bg-secondary px-3",
                action.destructive && "bg-destructive"
              )}
              data-destructive={action.destructive ? "" : undefined}
              data-disabled={action.disabled ? "true" : undefined}
              disabled={action.disabled}
              key={action.value}
              onClick={() => {
                if (action.disabled) return
                action.onSelect?.(action.value)
                onOpenChange?.(false)
              }}
            >
              <Text
                className={cn(
                  "text-base text-secondary-foreground",
                  action.destructive && "text-destructive-foreground",
                  action.disabled && "text-muted-foreground"
                )}
              >
                {action.label}
              </Text>
            </Pressable>
          ))}
          <Pressable
            className="flex min-h-[88rpx] flex-row items-center justify-center rounded-md bg-background px-3"
            onClick={() => onOpenChange?.(false)}
          >
            <Text className="text-base text-foreground">{cancelText}</Text>
          </Pressable>
        </Box>
      </Layer.Content>
    </Layer.Root>
  )
}
