import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"

export type SidebarSide = "left" | "right"

export function getSidebarSide(side?: SidebarSide): SidebarSide {
  return side ?? "left"
}

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [SidebarProvider, useSidebarContext] = createStrictContext<SidebarContextValue>("Sidebar")

export type SidebarRootProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function SidebarRoot({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: SidebarRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <SidebarProvider value={{ open: currentOpen, setOpen }}>
      <Box className={className} data-state={currentOpen ? "open" : "closed"} {...props} />
    </SidebarProvider>
  )
}

export type SidebarTriggerProps = PressableProps

function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const context = useSidebarContext()

  return (
    <Pressable
      className={cn("inline-flex min-h-[88rpx] flex-row items-center justify-center rounded-md px-3", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(true)
      }}
      {...props}
    />
  )
}

export type SidebarContentProps = BoxProps & {
  side?: SidebarSide
}

function SidebarContent({ className, children, side: sideProp, ...props }: SidebarContentProps) {
  const context = useSidebarContext()
  const side = getSidebarSide(sideProp)
  if (!context.open) return null

  return (
    <Layer.Root side={side}>
      <Layer.Backdrop onClick={() => context.setOpen(false)} />
      <Layer.Content
        className={cn("flex flex-col gap-3 bg-card p-4 text-card-foreground", className)}
        data-state="open"
        side={side}
        {...props}
      >
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type SidebarSectionProps = BoxProps

function SidebarHeader({ className, ...props }: SidebarSectionProps) {
  return <Box className={cn("border-b border-border pb-3", className)} data-slot="sidebar-header" {...props} />
}

function SidebarFooter({ className, ...props }: SidebarSectionProps) {
  return <Box className={cn("mt-auto border-t border-border pt-3", className)} data-slot="sidebar-footer" {...props} />
}

export type SidebarItemProps = BoxProps & {
  active?: boolean
  disabled?: boolean
}

function SidebarItem({ active, className, disabled, ...props }: SidebarItemProps) {
  return (
    <Box
      className={cn(
        "rounded-md px-3 py-2 text-foreground",
        active ? "bg-primary text-primary-foreground" : "bg-background",
        disabled ? "opacity-50" : "",
        className
      )}
      data-active={active ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      data-state={active ? "active" : "inactive"}
      {...props}
    />
  )
}

export type SidebarCloseProps = PressableProps

function SidebarClose({ className, onClick, ...props }: SidebarCloseProps) {
  const context = useSidebarContext()

  return (
    <Pressable
      className={cn("inline-flex min-h-[88rpx] flex-row items-center justify-center rounded-md px-3", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      {...props}
    />
  )
}

export type SidebarTitleProps = TextProps

function SidebarTitle({ className, ...props }: SidebarTitleProps) {
  return <Text className={cn("block text-base font-semibold text-foreground", className)} {...props} />
}

export type SidebarDescriptionProps = TextProps

function SidebarDescription({ className, ...props }: SidebarDescriptionProps) {
  return <Text className={cn("mt-1 block text-sm text-muted-foreground", className)} {...props} />
}

export const Sidebar = {
  Root: SidebarRoot,
  Trigger: SidebarTrigger,
  Content: SidebarContent,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Item: SidebarItem,
  Close: SidebarClose,
  Title: SidebarTitle,
  Description: SidebarDescription
}
