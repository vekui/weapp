import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type TooltipState = "open" | "closed"

export function getTooltipState(open: boolean): TooltipState {
  return open ? "open" : "closed"
}

type TooltipContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [TooltipProvider, useTooltipContext] = createStrictContext<TooltipContextValue>("Tooltip")

export type TooltipRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function TooltipRoot({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: TooltipRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <TooltipProvider value={{ open: currentOpen, setOpen }}>
      <Box className={cn("relative", className)} data-state={getTooltipState(currentOpen)} {...props} />
    </TooltipProvider>
  )
}

export type TooltipTriggerProps = PressableProps

function TooltipTrigger({ className, onClick, ...props }: TooltipTriggerProps) {
  const context = useTooltipContext()

  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center", className)}
      data-state={getTooltipState(context.open)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type TooltipContentProps = BoxProps

function TooltipContent({ className, ...props }: TooltipContentProps) {
  const context = useTooltipContext()
  if (!context.open) return null

  return (
    <Box
      className={cn(
        "mt-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground",
        className
      )}
      data-state={getTooltipState(context.open)}
      {...props}
    />
  )
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent
}
