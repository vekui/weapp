import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"
import { Button } from "./button"

export type PaginationState = "first" | "middle" | "last" | "single"

export function getPaginationState(page: number, pageCount: number): PaginationState {
  if (pageCount <= 1) return "single"
  if (page <= 1) return "first"
  if (page >= pageCount) return "last"
  return "middle"
}

export type PaginationProps = BoxProps & {
  page?: number
  pageCount?: number
  onPageChange?: (page: number) => void
}

export function Pagination({ className, page = 1, pageCount = 1, onPageChange, ...props }: PaginationProps) {
  const state = getPaginationState(page, pageCount)

  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-row items-center justify-between gap-2", className)}
      data-state={state}
      {...props}
    >
      <Button
        className="min-w-[88rpx]"
        disabled={state === "first" || state === "single"}
        onClick={() => onPageChange?.(page - 1)}
        size="sm"
        variant="outline"
      >
        Prev
      </Button>
      <Text className="text-sm text-muted-foreground">{page} / {pageCount}</Text>
      <Button
        className="min-w-[88rpx]"
        disabled={state === "last" || state === "single"}
        onClick={() => onPageChange?.(page + 1)}
        size="sm"
        variant="outline"
      >
        Next
      </Button>
    </Box>
  )
}
