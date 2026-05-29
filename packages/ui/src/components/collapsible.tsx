import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type CollapsibleState = "open" | "closed"

export function getCollapsibleState(open: boolean): CollapsibleState {
  return open ? "open" : "closed"
}

type CollapsibleContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [CollapsibleProvider, useCollapsibleContext] =
  createStrictContext<CollapsibleContextValue>("Collapsible")

export type CollapsibleRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function CollapsibleRoot({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: CollapsibleRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })
  const state = getCollapsibleState(currentOpen)

  return (
    <CollapsibleProvider value={{ open: currentOpen, setOpen }}>
      <Box className={cn("flex flex-col gap-2 text-foreground", className)} data-state={state} {...props} />
    </CollapsibleProvider>
  )
}

export type CollapsibleTriggerProps = PressableProps

function CollapsibleTrigger({ className, onClick, ...props }: CollapsibleTriggerProps) {
  const context = useCollapsibleContext()
  const state = getCollapsibleState(context.open)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center justify-between rounded-md text-foreground",
        className
      )}
      data-state={state}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type CollapsibleContentProps = BoxProps

function CollapsibleContent({ className, ...props }: CollapsibleContentProps) {
  const context = useCollapsibleContext()
  const state = getCollapsibleState(context.open)

  if (!context.open) return null

  return (
    <Box
      className={cn("text-sm leading-[40rpx] text-muted-foreground", className)}
      data-state={state}
      {...props}
    />
  )
}

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
}
