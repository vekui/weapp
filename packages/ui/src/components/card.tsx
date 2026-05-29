import * as React from "react"

import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export function Card({ className, ...props }: BoxProps) {
  return (
    <Box
      className={cn("rounded-lg border border-border bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: BoxProps) {
  return <Box className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />
}

export function CardTitle({ className, ...props }: TextProps) {
  return <Text className={cn("text-lg font-semibold text-foreground", className)} {...props} />
}

export function CardDescription({ className, ...props }: TextProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function CardContent({ className, ...props }: BoxProps) {
  return <Box className={cn("p-4 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }: BoxProps) {
  return <Box className={cn("flex flex-row items-center gap-3 p-4 pt-0", className)} {...props} />
}
