import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export type CardProps = React.ComponentProps<typeof View>

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn("rounded-md border border-border bg-card p-4 text-card-foreground", className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return <View className={cn("mb-3 gap-1", className)} {...props} />
}

export function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />
}

export function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function CardContent({ className, ...props }: CardProps) {
  return <View className={cn("gap-3", className)} {...props} />
}

export function CardFooter({ className, ...props }: CardProps) {
  return <View className={cn("mt-4 flex-row items-center gap-2", className)} {...props} />
}
