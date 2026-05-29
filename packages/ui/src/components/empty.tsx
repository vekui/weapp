import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type EmptyProps = BoxProps & {
  title?: string
  description?: string
}

export function Empty({ className, title = "暂无内容", description, ...props }: EmptyProps) {
  return (
    <Box className={cn("flex flex-col items-center justify-center gap-2 p-8", className)} {...props}>
      <Text className="text-base font-medium text-foreground">{title}</Text>
      {description ? <Text className="text-sm text-muted-foreground">{description}</Text> : null}
    </Box>
  )
}
