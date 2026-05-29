import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer, type LayerSide } from "../primitives/layer"

export function getSheetSide(side?: LayerSide): LayerSide {
  return side ?? "bottom"
}

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [SheetProvider, useSheetContext] = createStrictContext<SheetContextValue>("Sheet")

export type SheetRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function SheetRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SheetRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <SheetProvider value={{ open: currentOpen, setOpen }}>
      <Box className={className} data-state={currentOpen ? "open" : "closed"} {...props} />
    </SheetProvider>
  )
}

export type SheetContentProps = BoxProps & {
  side?: LayerSide
}

function SheetContent({ className, children, side: sideProp, ...props }: SheetContentProps) {
  const context = useSheetContext()
  const side = getSheetSide(sideProp)
  if (!context.open) return null

  return (
    <Layer.Root side={side}>
      <Layer.Backdrop onClick={() => context.setOpen(false)} />
      <Layer.Content className={cn("p-4", className)} side={side} {...props}>
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type SheetTitleProps = TextProps

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type SheetDescriptionProps = TextProps

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return <Text className={cn("mt-1 block text-sm text-muted-foreground", className)} {...props} />
}

export type SheetCloseProps = PressableProps

function SheetClose({ className, onClick, ...props }: SheetCloseProps) {
  const context = useSheetContext()
  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center justify-center", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      {...props}
    />
  )
}

export const Sheet = {
  Root: SheetRoot,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose
}
