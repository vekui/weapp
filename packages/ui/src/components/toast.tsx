import * as React from "react"
import { Text, View } from "@tarojs/components"
import { cn } from "../lib/cn"

export type ToastTone = "default" | "success" | "destructive"

export interface ToastProps extends React.ComponentProps<typeof View> {
  description?: React.ReactNode
  open?: boolean
  title: React.ReactNode
  tone?: ToastTone
}

export function Toast({
  className,
  description,
  open = true,
  title,
  tone = "default",
  ...props
}: ToastProps) {
  if (!open) {
    return null
  }

  return (
    <View
      className={cn(
        "rounded-md border border-border bg-card p-4 text-card-foreground",
        tone === "success" ? "border-primary" : "",
        tone === "destructive" ? "border-destructive text-destructive" : "",
        className
      )}
      data-state="open"
      data-tone={tone}
      {...props}
    >
      <Text className="font-medium text-foreground">{title}</Text>
      {description ? <Text className="mt-1 text-sm text-muted-foreground">{description}</Text> : null}
    </View>
  )
}

export function ToastViewport({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn("fixed left-4 right-4 top-8 z-50 gap-2", className)} {...props} />
}
