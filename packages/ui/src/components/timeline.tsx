import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type TimelineItemState = "default" | "success" | "warning" | "error"

export function getTimelineItemState(status: TimelineItemState = "default"): TimelineItemState {
  return status
}

export type TimelineRootProps = BoxProps

function TimelineRoot({ className, ...props }: TimelineRootProps) {
  return <Box className={cn("flex flex-col", className)} {...props} />
}

export type TimelineItemProps = BoxProps & {
  status?: TimelineItemState
  title?: string
  description?: string
  last?: boolean
}

function TimelineItem({
  className,
  status = "default",
  title,
  description,
  last,
  children,
  ...props
}: TimelineItemProps) {
  const state = getTimelineItemState(status)

  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-row gap-3 text-foreground", className)}
      data-last={last ? "" : undefined}
      data-state={state}
      {...props}
    >
      <Box className="flex w-[40rpx] flex-col items-center" data-slot="timeline-rail">
        <Box
          className={cn(
            "h-[24rpx] w-[24rpx] rounded-full border border-border bg-muted",
            state === "success" && "border-primary bg-primary",
            state === "warning" && "border-accent bg-accent",
            state === "error" && "border-destructive bg-destructive"
          )}
          data-slot="timeline-dot"
        />
        <Box
          className={cn("w-px flex-1 bg-border", last ? "hidden" : "block")}
          data-slot="timeline-line"
        />
      </Box>
      <Box className="flex flex-1 flex-col gap-1 pb-3">
        {title ? <Text className="text-sm font-medium text-foreground">{title}</Text> : null}
        {description ? (
          <Text className="text-xs leading-[36rpx] text-muted-foreground">{description}</Text>
        ) : null}
        {children}
      </Box>
    </Box>
  )
}

export const Timeline = {
  Root: TimelineRoot,
  Item: TimelineItem
}
