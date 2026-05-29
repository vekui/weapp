import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type PopoverState = "open" | "closed"

export function getPopoverState(open: boolean): PopoverState {
  return open ? "open" : "closed"
}

type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [PopoverProvider, usePopoverContext] = createStrictContext<PopoverContextValue>("Popover")

export type PopoverRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function PopoverRoot({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: PopoverRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <PopoverProvider value={{ open: currentOpen, setOpen }}>
      <Box className={cn("relative", className)} data-state={getPopoverState(currentOpen)} {...props} />
    </PopoverProvider>
  )
}

export type PopoverTriggerProps = PressableProps

function PopoverTrigger({ className, onClick, ...props }: PopoverTriggerProps) {
  const context = usePopoverContext()
  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center", className)}
      data-state={getPopoverState(context.open)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type PopoverContentProps = BoxProps

function PopoverContent({ className, ...props }: PopoverContentProps) {
  const context = usePopoverContext()
  if (!context.open) return null

  return (
    <Box
      className={cn(
        "mt-2 rounded-md border border-border bg-background p-3 text-foreground",
        className
      )}
      data-state={getPopoverState(context.open)}
      {...props}
    />
  )
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
}
