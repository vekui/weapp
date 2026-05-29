import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"
import { Spinner } from "./spinner"

export type LoadMoreStatus = "idle" | "loading" | "done" | "error"

const loadMoreText: Record<LoadMoreStatus, string> = {
  idle: "Load more",
  loading: "Loading",
  done: "No more",
  error: "Try again"
}

export function getLoadMoreText(status: LoadMoreStatus) {
  return loadMoreText[status]
}

export type LoadMoreProps = BoxProps & {
  status?: LoadMoreStatus
}

export function LoadMore({ className, status = "idle", children, ...props }: LoadMoreProps) {
  return (
    <Box
      className={cn("flex min-h-[56rpx] flex-row items-center justify-center gap-2 text-muted-foreground", className)}
      data-state={status}
      {...props}
    >
      {status === "loading" ? <Spinner className="size-[32rpx]" /> : null}
      <Text className={cn("text-sm", status === "error" ? "text-destructive" : "text-muted-foreground")}>
        {children ?? getLoadMoreText(status)}
      </Text>
    </Box>
  )
}
