import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type BreadcrumbProps = BoxProps

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <Box
      className={cn("flex min-h-[56rpx] flex-row flex-wrap items-center gap-1", className)}
      {...props}
    />
  )
}

export type BreadcrumbItemProps = TextProps & {
  current?: boolean
}

export function BreadcrumbItem({ className, current, ...props }: BreadcrumbItemProps) {
  return (
    <Text
      className={cn(
        "text-sm text-foreground",
        current && "font-medium",
        className
      )}
      data-state={current ? "current" : "link"}
      {...props}
    />
  )
}

export type BreadcrumbSeparatorProps = TextProps

export function BreadcrumbSeparator({ className, ...props }: BreadcrumbSeparatorProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
}
