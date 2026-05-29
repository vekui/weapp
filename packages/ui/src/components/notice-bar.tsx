import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type NoticeBarVariant = "info" | "warning"

const noticeBarClasses: Record<NoticeBarVariant, string> = {
  info: "bg-secondary text-secondary-foreground",
  warning: "bg-accent text-accent-foreground"
}

export type NoticeBarProps = BoxProps & {
  variant?: NoticeBarVariant
  text?: string
}

export function NoticeBar({ className, variant = "info", text, children, ...props }: NoticeBarProps) {
  return (
    <Box className={cn("flex min-h-[72rpx] flex-row items-center px-3", noticeBarClasses[variant], className)} data-state={variant} {...props}>
      <Text className="text-sm">{children ?? text}</Text>
    </Box>
  )
}
