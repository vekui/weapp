import { Image as TaroImage } from "@tarojs/components"
import * as React from "react"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type AvatarState = "image" | "fallback"

export function getAvatarState({ src }: { src?: string }): AvatarState {
  return src ? "image" : "fallback"
}

export type AvatarProps = BoxProps & {
  src?: string
}

export function Avatar({ className, src, ...props }: AvatarProps) {
  return (
    <Box
      className={cn(
        "relative flex h-[80rpx] w-[80rpx] items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground",
        className
      )}
      data-state={getAvatarState({ src })}
      {...props}
    />
  )
}

export type AvatarImageProps = React.ComponentProps<typeof TaroImage>

export function AvatarImage({ className, mode = "aspectFill", ...props }: AvatarImageProps) {
  return <TaroImage className={cn("h-full w-full rounded-full bg-muted", className)} mode={mode} {...props} />
}

export type AvatarFallbackProps = TextProps

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <Text
      className={cn("rounded-full bg-muted text-sm font-medium text-muted-foreground", className)}
      data-state="fallback"
      {...props}
    />
  )
}
