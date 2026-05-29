import { Image as TaroImage } from "@tarojs/components"
import * as React from "react"

import { cn } from "../lib/cn"
import { Box } from "../primitives"
import { Icon } from "./icon"

export type ImageProps = React.ComponentProps<typeof TaroImage> & {
  fallbackClassName?: string
  rounded?: boolean
}

export function Image({
  className,
  fallbackClassName,
  mode = "aspectFill",
  rounded = true,
  ...props
}: ImageProps) {
  if (!props.src) {
    return (
      <Box
        className={cn(
          "flex min-h-[120rpx] w-full items-center justify-center rounded-md border border-border bg-muted text-muted-foreground",
          fallbackClassName,
          className
        )}
        data-state="empty"
      >
        <Icon name="image" tone="muted" />
      </Box>
    )
  }

  return (
    <TaroImage
      className={cn(
        "block w-full bg-muted text-muted-foreground",
        rounded && "rounded-md",
        className
      )}
      data-state={props.src ? "loaded" : "empty"}
      mode={mode}
      {...props}
    />
  )
}
