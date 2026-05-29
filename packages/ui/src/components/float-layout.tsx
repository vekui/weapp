import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"

export type FloatLayoutProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function FloatLayout({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  children,
  ...props
}: FloatLayoutProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  if (!currentOpen) return null

  return (
    <Layer.Root side="bottom">
      <Layer.Backdrop onClick={() => setOpen(false)} />
      <Layer.Content className={cn("p-4", className)} data-state="open" side="bottom" {...props}>
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type FloatLayoutTitleProps = TextProps

export function FloatLayoutTitle({ className, ...props }: FloatLayoutTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type FloatLayoutCloseProps = PressableProps

export function FloatLayoutClose({ className, ...props }: FloatLayoutCloseProps) {
  return (
    <Pressable
      className={cn("mt-3 flex min-h-[88rpx] items-center justify-center rounded-md bg-secondary px-3", className)}
      {...props}
    />
  )
}
