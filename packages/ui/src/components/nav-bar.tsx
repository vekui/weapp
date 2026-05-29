import type * as React from "react"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type NavBarProps = BoxProps & {
  title?: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function NavBar({ className, title, left, right, children, ...props }: NavBarProps) {
  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-row items-center justify-between border-b border-border bg-card px-4 text-card-foreground", className)}
      {...props}
    >
      {children ?? (
        <>
          <Box className="flex min-w-[88rpx] flex-row items-center">{left}</Box>
          <Text className="flex-1 text-center text-base font-semibold text-foreground">{title}</Text>
          <Box className="flex min-w-[88rpx] flex-row items-center justify-end">{right}</Box>
        </>
      )}
    </Box>
  )
}

export type NavBarTitleProps = TextProps

export function NavBarTitle({ className, ...props }: NavBarTitleProps) {
  return <Text className={cn("text-base font-semibold text-foreground", className)} {...props} />
}
