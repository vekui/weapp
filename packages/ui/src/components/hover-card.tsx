import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"

export type HoverCardState = "open" | "closed"

export function getHoverCardState(open: boolean): HoverCardState {
  return open ? "open" : "closed"
}

type HoverCardContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [HoverCardProvider, useHoverCardContext] = createStrictContext<HoverCardContextValue>("HoverCard")

export type HoverCardRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function HoverCardRoot({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: HoverCardRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <HoverCardProvider value={{ open: currentOpen, setOpen }}>
      <Box className={cn("relative", className)} data-state={getHoverCardState(currentOpen)} {...props} />
    </HoverCardProvider>
  )
}

export type HoverCardTriggerProps = PressableProps

function HoverCardTrigger({ className, onClick, ...props }: HoverCardTriggerProps) {
  const context = useHoverCardContext()

  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center", className)}
      data-state={getHoverCardState(context.open)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(!context.open)
      }}
      {...props}
    />
  )
}

export type HoverCardContentProps = BoxProps

function HoverCardContent({ className, ...props }: HoverCardContentProps) {
  const context = useHoverCardContext()
  if (!context.open) return null

  return (
    <Box
      className={cn(
        "mt-2 rounded-md border border-border bg-background p-4 text-foreground",
        className
      )}
      data-state={getHoverCardState(context.open)}
      {...props}
    />
  )
}

export type HoverCardTitleProps = TextProps

function HoverCardTitle({ className, ...props }: HoverCardTitleProps) {
  return <Text className={cn("block text-base font-semibold text-foreground", className)} {...props} />
}

export type HoverCardDescriptionProps = TextProps

function HoverCardDescription({ className, ...props }: HoverCardDescriptionProps) {
  return <Text className={cn("mt-1 block text-sm text-muted-foreground", className)} {...props} />
}

export const HoverCard = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
  Title: HoverCardTitle,
  Description: HoverCardDescription
}
