import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type MessageVariant = "info" | "success" | "warning" | "error"

const messageClasses: Record<MessageVariant, string> = {
  info: "border-border bg-card text-card-foreground",
  success: "border-primary bg-secondary text-secondary-foreground",
  warning: "border-accent bg-accent text-accent-foreground",
  error: "border-destructive bg-background text-destructive"
}

export type MessageProps = BoxProps & {
  variant?: MessageVariant
  title?: string
  description?: string
}

export function Message({ className, variant = "info", title, description, children, ...props }: MessageProps) {
  return (
    <Box className={cn("rounded-md border px-3 py-2", messageClasses[variant], className)} data-state={variant} {...props}>
      {children ?? (
        <Box className="flex flex-col gap-1">
          {title ? <Text className="text-sm font-medium text-foreground">{title}</Text> : null}
          {description ? <Text className="text-xs text-muted-foreground">{description}</Text> : null}
        </Box>
      )}
    </Box>
  )
}
