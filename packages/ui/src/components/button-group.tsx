import * as React from "react"

import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type ButtonGroupProps = BoxProps

type ButtonGroupChildProps = {
  className?: string
  "data-slot"?: string
}

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  const items = React.Children.toArray(children)

  return (
    <Box
      className={cn(
        "inline-flex min-h-[88rpx] self-start flex-row items-stretch overflow-hidden rounded-md border border-border bg-background",
        className
      )}
      {...props}
    >
      {items.map((child, index) => {
        if (!React.isValidElement<ButtonGroupChildProps>(child)) return child

        return React.cloneElement(child, {
          className: cn(
            "min-h-[88rpx] rounded-none border-0",
            index < items.length - 1 && "border-r border-border",
            child.props.className
          ),
          "data-slot": child.props["data-slot"] ?? "button-group-item"
        })
      })}
    </Box>
  )
}
